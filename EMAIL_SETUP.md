# Email Setup Instructions

The contact form now uses Resend to send emails. Follow these steps to set it up:

## Step 1: Sign up for Resend

1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account (free tier includes 3,000 emails/month)
3. Verify your email address

## Step 2: Get your API Key

1. After signing in, go to the [API Keys section](https://resend.com/api-keys)
2. Click "Create API Key"
3. Give it a name (e.g., "Portfolio Contact Form")
4. Copy the API key (you'll only see it once!)

## Step 3: Verify a Domain (Optional but Recommended)

For production use, you should verify your domain:
1. Go to [Domains](https://resend.com/domains) in Resend dashboard
2. Click "Add Domain"
3. Follow the DNS configuration instructions

**Note:** For testing, you can use the default `onboarding@resend.dev` sender email, but it will show "via resend.dev" in the recipient's email client.

## Step 4: Set Environment Variables

### For Local Development:

Create a `.env.local` file in the `portfolio-website` directory:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=your-email@yourdomain.com
CONTACT_EMAIL=your-email@yourdomain.com

# Optional: Rate limiting (recommended for production)
# Get these from https://console.upstash.com/
UPSTASH_REDIS_REST_URL=https://your-redis-url.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-redis-token
```

Replace:
- `re_xxxxxxxxxxxxxxxxxxxxx` with your actual Resend API key
- `your-email@yourdomain.com` with your email address (or use `onboarding@resend.dev` for testing)
- Upstash Redis credentials (optional but recommended for production rate limiting)

### For Vercel Deployment:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:
   - `RESEND_API_KEY` = Your Resend API key (required)
   - `RESEND_FROM_EMAIL` = The email address to send from (must be verified in Resend)
   - `CONTACT_EMAIL` = The email address where you want to receive contact form submissions
   - `UPSTASH_REDIS_REST_URL` = Your Upstash Redis URL (optional, for rate limiting)
   - `UPSTASH_REDIS_REST_TOKEN` = Your Upstash Redis token (optional, for rate limiting)

### Rate Limiting Setup (Optional but Recommended)

The contact form includes rate limiting to prevent spam (3 requests per 15 minutes per IP).

**Basic Setup (No Configuration Required):**
- Works out of the box with simple in-memory rate limiting
- Suitable for low-traffic sites

**Production Setup (Recommended):**
For better reliability and accuracy, set up Upstash Redis:
1. Go to https://console.upstash.com/
2. Sign up for a free account
3. Create a new Redis database
4. Copy the `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`
5. Add them to your Vercel environment variables
6. Redeploy your site

**Rate Limits:**
- 3 submissions per 15 minutes per IP address
- Prevents spam and abuse
- Returns HTTP 429 (Too Many Requests) when limit is exceeded

## Step 5: Test the Form

1. Start your development server: `npm run dev`
2. Navigate to the contact form
3. Fill out and submit the form
4. Check your email inbox for the message

## Troubleshooting

### Emails not sending?

1. **Redeploy After Adding Environment Variables**
   - Environment variables only apply to NEW deployments
   - Go to Vercel Dashboard → Deployments → Click "..." → "Redeploy"

2. **Check API Key**: Make sure `RESEND_API_KEY` is set correctly
3. **Check Email Addresses**: Ensure `RESEND_FROM_EMAIL` and `CONTACT_EMAIL` are valid
4. **Check Resend Dashboard**: Look at the [Logs](https://resend.com/emails) section in Resend to see if there are any errors
5. **Check Browser Console**: 
   - Open browser DevTools (F12) → Console tab
   - Submit the form and look for errors
6. **Check Vercel Function Logs**: 
   - Vercel Dashboard → Deployments → Latest deployment → Functions → `/api/contact` → View Function Logs
   - Look for Resend API errors or authentication issues

### Form shows "Message sent successfully" but no email received

1. **Check Spam Folder**: Emails from `onboarding@resend.dev` might go to spam
2. **Check Resend Logs**: Go to https://resend.com/emails to see delivery status
3. **Verify CONTACT_EMAIL**: Make sure it's set to your correct email address in Vercel environment variables
4. **Try a different email address**: Test with another email to see if it's a delivery issue

### Using a different email service?

If you prefer to use a different service (SendGrid, Mailgun, etc.), you'll need to:
1. Update the API route at `app/api/contact/route.ts`
2. Install the appropriate npm package
3. Update the environment variables
