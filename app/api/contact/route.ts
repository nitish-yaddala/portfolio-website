import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// Lazy initialization of Resend - only create when needed and API key is available
function getResend() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error('RESEND_API_KEY environment variable is not set')
  }
  return new Resend(apiKey)
}

// Initialize Redis for rate limiting (using Upstash)
// If UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are not set,
// rate limiting will fall back to a simple in-memory solution
const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null

// Rate limiter: Allow 3 requests per 15 minutes per IP
const ratelimit = redis
  ? new Ratelimit({
      redis: redis,
      limiter: Ratelimit.slidingWindow(3, '15 m'),
      analytics: true,
    })
  : null

// Simple in-memory fallback for rate limiting (when Upstash is not configured)
const memoryStore = new Map<string, { count: number; resetTime: number }>()

function getSimpleRateLimit(identifier: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const windowMs = 15 * 60 * 1000 // 15 minutes
  const maxRequests = 3

  const record = memoryStore.get(identifier)
  
  if (!record || now > record.resetTime) {
    // New window
    memoryStore.set(identifier, { count: 1, resetTime: now + windowMs })
    // Clean up old entries periodically
    if (memoryStore.size > 1000) {
      const keysToDelete: string[] = []
      memoryStore.forEach((value, key) => {
        if (now > value.resetTime) {
          keysToDelete.push(key)
        }
      })
      keysToDelete.forEach(key => memoryStore.delete(key))
    }
    return { allowed: true, remaining: maxRequests - 1 }
  }

  if (record.count >= maxRequests) {
    return { allowed: false, remaining: 0 }
  }

  record.count++
  return { allowed: true, remaining: maxRequests - record.count }
}

function getClientIP(request: NextRequest): string {
  // Try to get real IP from various headers (Vercel, Cloudflare, etc.)
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim()
  }
  
  const realIP = request.headers.get('x-real-ip')
  if (realIP) {
    return realIP
  }
  
  // Fallback
  return request.ip || 'unknown'
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const identifier = getClientIP(request)
    
    if (ratelimit) {
      // Use Upstash rate limiting
      const { success, remaining, reset } = await ratelimit.limit(identifier)
      
      if (!success) {
        const retryAfter = Math.ceil((reset - Date.now()) / 1000)
        return NextResponse.json(
          { 
            error: 'Too many requests. Please try again later.',
            retryAfter 
          },
          { 
            status: 429,
            headers: {
              'Retry-After': retryAfter.toString(),
              'X-RateLimit-Limit': '3',
              'X-RateLimit-Remaining': remaining.toString(),
              'X-RateLimit-Reset': new Date(reset).toISOString(),
            }
          }
        )
      }
    } else {
      // Use simple in-memory rate limiting
      const { allowed, remaining } = getSimpleRateLimit(identifier)
      if (!allowed) {
        return NextResponse.json(
          { error: 'Too many requests. Please try again later.' },
          { status: 429 }
        )
      }
    }

    const body = await request.json()
    const { name, email, subject, message } = body

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'Email service is not configured' },
        { status: 503 }
      )
    }

    // Get recipient email from environment variable or use default
    const recipientEmail = process.env.CONTACT_EMAIL || process.env.RESEND_FROM_EMAIL || 'your-email@example.com'

    // Initialize Resend and send email
    const resend = getResend()
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>',
      to: [recipientEmail],
      replyTo: email,
      subject: subject || `Contact Form: ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #0a0e27; color: #4ade80; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
              .content { background: #f9f9f9; padding: 20px; border-radius: 8px; }
              .field { margin-bottom: 15px; }
              .label { font-weight: bold; color: #4ade80; }
              .value { margin-top: 5px; }
              .message-box { background: white; padding: 15px; border-left: 3px solid #4ade80; margin-top: 10px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>New Contact Form Submission</h2>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">Name:</div>
                  <div class="value">${name}</div>
                </div>
                <div class="field">
                  <div class="label">Email:</div>
                  <div class="value"><a href="mailto:${email}">${email}</a></div>
                </div>
                ${subject ? `
                <div class="field">
                  <div class="label">Subject:</div>
                  <div class="value">${subject}</div>
                </div>
                ` : ''}
                <div class="field">
                  <div class="label">Message:</div>
                  <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
${subject ? `Subject: ${subject}\n` : ''}
Message:
${message}
      `.trim(),
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
