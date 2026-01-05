'use client'

import { Share2, Linkedin, Twitter, Mail, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { resumeData } from '@/data/resume'

export default function ShareButtons() {
  const [copied, setCopied] = useState(false)

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareText = `${resumeData.personal.name} - ${resumeData.personal.title}`
  const shareDescription = resumeData.personal.summary[0]

  const handleShare = async (platform: string) => {
    const url = encodeURIComponent(shareUrl)
    const text = encodeURIComponent(shareText)
    const description = encodeURIComponent(shareDescription)

    switch (platform) {
      case 'linkedin':
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
          '_blank',
          'noopener,noreferrer'
        )
        break
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
          '_blank',
          'noopener,noreferrer'
        )
        break
      case 'email':
        window.location.href = `mailto:?subject=${text}&body=${description}%0A%0A${url}`
        break
      case 'copy':
        if (navigator.clipboard) {
          navigator.clipboard.writeText(shareUrl)
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        }
        break
    }
  }

  return (
    <div className="fixed bottom-28 right-6 z-40 hidden lg:block">
      <div className="bg-terminal-bg/90 backdrop-blur-xl border border-hacker-green/30 rounded-lg p-3 shadow-lg">
        <div className="flex flex-col gap-2">
          <button
            onClick={() => handleShare('linkedin')}
            className="p-2 text-gray-400 hover:text-hacker-cyan hover:bg-hacker-cyan/10 rounded transition-all focus:outline-none focus:ring-2 focus:ring-hacker-cyan/50"
            aria-label="Share on LinkedIn"
            title="Share on LinkedIn"
          >
            <Linkedin size={20} />
          </button>
          <button
            onClick={() => handleShare('twitter')}
            className="p-2 text-gray-400 hover:text-hacker-cyan hover:bg-hacker-cyan/10 rounded transition-all focus:outline-none focus:ring-2 focus:ring-hacker-cyan/50"
            aria-label="Share on Twitter"
            title="Share on Twitter"
          >
            <Twitter size={20} />
          </button>
          <button
            onClick={() => handleShare('email')}
            className="p-2 text-gray-400 hover:text-hacker-green hover:bg-hacker-green/10 rounded transition-all focus:outline-none focus:ring-2 focus:ring-hacker-green/50"
            aria-label="Share via Email"
            title="Share via Email"
          >
            <Mail size={20} />
          </button>
          <div className="border-t border-hacker-green/20 my-1"></div>
          <button
            onClick={() => handleShare('copy')}
            className="p-2 text-gray-400 hover:text-hacker-purple hover:bg-hacker-purple/10 rounded transition-all focus:outline-none focus:ring-2 focus:ring-hacker-purple/50"
            aria-label="Copy link"
            title="Copy link"
          >
            {copied ? <Check size={20} className="text-hacker-green" /> : <Copy size={20} />}
          </button>
        </div>
      </div>
    </div>
  )
}
