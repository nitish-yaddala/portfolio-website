'use client'

import { useState } from 'react'
import { Mail, MapPin, Linkedin, Github, Send, CheckCircle, AlertCircle, Download, FileText, ChevronDown } from 'lucide-react'
import { resumeData } from '@/data/resume'
import ScrollAnimation from './ScrollAnimation'
import CopyToClipboard from './CopyToClipboard'
import { useToast } from './Toast'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isResumeMenuOpen, setIsResumeMenuOpen] = useState(false)
  const toast = useToast()

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})
    
    // Validation
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setStatus('error')
      setIsSubmitting(false)
      setTimeout(() => setStatus('idle'), 3000)
      return
    }
    
    // Send email via API
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        if (response.status === 429) {
          const retryAfter = response.headers.get('Retry-After')
          throw new Error(data.error || `Too many requests. Please try again in ${retryAfter ? `${retryAfter} seconds` : 'a few minutes'}.`)
        }
        throw new Error(data.error || 'Failed to send message')
      }

      setStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      toast.showToast('Message sent successfully! I\'ll get back to you soon.', 'success')
    } catch (error) {
      console.error('Form submission error:', error)
      setStatus('error')
      const errorMessage = error instanceof Error ? error.message : 'Failed to send message. Please try again or use the email link above.'
      setErrors({ submit: errorMessage })
      toast.showToast(errorMessage, 'error')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
            <h2 className="section-heading text-4xl sm:text-5xl lg:text-6xl font-mono mb-6">
              <span className="text-hacker-green">{'>'}</span>{' '}
              <span className="text-white">Contact</span>
            </h2>
          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-hacker-green/60 to-transparent mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <ScrollAnimation delay={0}>
            <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-white font-mono mb-4">Get In Touch</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                Interested in discussing security assessments, vulnerability research, or collaboration opportunities? 
                Feel free to reach out.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 terminal-window rounded-lg hover:glow-border transition-all group">
                <a
                  href={`mailto:${resumeData.personal.email}`}
                  className="flex items-center gap-3 flex-1 min-w-0"
                >
                  <Mail className="text-hacker-green group-hover:scale-110 transition-transform flex-shrink-0" size={20} />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm text-gray-400 font-mono">Email</div>
                    <div className="text-white truncate">{resumeData.personal.email}</div>
                  </div>
                </a>
                <CopyToClipboard text={resumeData.personal.email} className="ml-2 flex-shrink-0" />
              </div>

              <div className="flex items-center gap-3 p-4 terminal-window rounded-lg">
                <MapPin className="text-hacker-green" size={20} />
                <div>
                  <div className="text-sm text-gray-400 font-mono">Location</div>
                  <div className="text-white">{resumeData.personal.location}</div>
                </div>
              </div>
              <div className="relative">
                <button
                  onClick={() => setIsResumeMenuOpen(!isResumeMenuOpen)}
                  onBlur={() => setTimeout(() => setIsResumeMenuOpen(false), 200)}
                  className="w-full flex items-center gap-3 p-4 terminal-window rounded-lg hover:glow-border transition-all group text-left"
                  aria-label="Resume options"
                  aria-expanded={isResumeMenuOpen}
                >
                  <FileText className="text-hacker-green group-hover:scale-110 transition-transform flex-shrink-0" size={20} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-gray-400 font-mono">Resume</div>
                    <div className="text-white group-hover:text-hacker-green transition-colors">View or Download</div>
                  </div>
                  <ChevronDown size={16} className={`text-gray-400 transition-transform flex-shrink-0 ${isResumeMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                {isResumeMenuOpen && (
                  <div className="absolute left-0 right-0 top-full mt-2 bg-terminal-bg/95 backdrop-blur-xl border border-hacker-green/30 rounded-lg shadow-lg z-50">
                    <div className="py-2">
                      <a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsResumeMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 font-mono text-sm text-gray-300 hover:text-hacker-green hover:bg-hacker-green/10 transition-all focus:outline-none focus:ring-2 focus:ring-hacker-green/50 focus:ring-inset"
                        aria-label="View resume in new tab"
                      >
                        <FileText size={16} className="text-hacker-green" />
                        View Resume
                      </a>
                      <a
                        href="/resume.pdf"
                        download="Muni_Nitish_Kumar_Yaddala_Resume.pdf"
                        onClick={() => setIsResumeMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 font-mono text-sm text-gray-300 hover:text-hacker-green hover:bg-hacker-green/10 transition-all focus:outline-none focus:ring-2 focus:ring-hacker-green/50 focus:ring-inset"
                        aria-label="Download resume"
                      >
                        <Download size={16} className="text-hacker-green" />
                        Download Resume
                      </a>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex gap-4 pt-4">
                <a
                  href={resumeData.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 terminal-window rounded-lg hover:glow-border transition-all group"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="text-hacker-cyan group-hover:scale-110 transition-transform" size={24} />
                </a>
                <a
                  href={resumeData.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 terminal-window rounded-lg hover:glow-border transition-all group"
                  aria-label="GitHub"
                >
                  <Github className="text-hacker-purple group-hover:scale-110 transition-transform" size={24} />
                </a>
              </div>
            </div>
            </div>
          </ScrollAnimation>

          <ScrollAnimation delay={100}>
            <div className="terminal-window rounded-lg p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-mono text-gray-400 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  aria-invalid={errors.name ? 'true' : 'false'}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  className={`w-full px-4 py-2 bg-terminal-bg border rounded text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-hacker-green/50 transition-all ${
                    errors.name 
                      ? 'border-hacker-pink/50 focus:border-hacker-pink' 
                      : 'border-hacker-green/30 focus:border-hacker-green'
                  }`}
                />
                {errors.name && (
                  <p id="name-error" className="mt-1 text-xs text-hacker-pink font-mono" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-mono text-gray-400 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={`w-full px-4 py-2 bg-terminal-bg border rounded text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-hacker-green/50 transition-all ${
                    errors.email 
                      ? 'border-hacker-pink/50 focus:border-hacker-pink' 
                      : 'border-hacker-green/30 focus:border-hacker-green'
                  }`}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-xs text-hacker-pink font-mono" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-mono text-gray-400 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-terminal-bg border border-hacker-green/30 rounded text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-hacker-green/50 focus:border-hacker-green transition-all"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-mono text-gray-400 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  aria-invalid={errors.message ? 'true' : 'false'}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  className={`w-full px-4 py-2 bg-terminal-bg border rounded text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-hacker-green/50 transition-all resize-none ${
                    errors.message 
                      ? 'border-hacker-pink/50 focus:border-hacker-pink' 
                      : 'border-hacker-green/30 focus:border-hacker-green'
                  }`}
                />
                {errors.message && (
                  <p id="message-error" className="mt-1 text-xs text-hacker-pink font-mono" role="alert">
                    {errors.message}
                  </p>
                )}
              </div>

              {errors.submit && (
                <div className="flex items-center gap-2 text-hacker-pink text-sm font-mono p-3 bg-hacker-pink/10 border border-hacker-pink/30 rounded">
                  <AlertCircle size={16} />
                  <span>{errors.submit}</span>
                </div>
              )}

              {status === 'success' && (
                <div className="flex items-center gap-2 text-hacker-green text-sm font-mono p-3 bg-hacker-green/10 border border-hacker-green/30 rounded">
                  <CheckCircle size={16} />
                  <span>Message sent successfully! I&apos;ll get back to you soon.</span>
                </div>
              )}

              {status === 'error' && !errors.submit && (
                <div className="flex items-center gap-2 text-hacker-pink text-sm font-mono p-3 bg-hacker-pink/10 border border-hacker-pink/30 rounded">
                  <AlertCircle size={16} />
                  <span>Please fill in all required fields.</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-hacker-green/10 border border-hacker-green/50 text-hacker-green font-mono text-sm hover:bg-hacker-green/20 hover:glow-border focus:outline-none focus:ring-2 focus:ring-hacker-green/50 focus:ring-offset-2 focus:ring-offset-terminal-bg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                aria-label="Send message"
              >
                {isSubmitting ? (
                  <>
                    <div className="spinner w-4 h-4 border-2 border-hacker-green border-t-transparent rounded-full"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  )
}
