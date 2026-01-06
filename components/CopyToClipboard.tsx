'use client'

import React, { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { useToast } from './Toast'
import Tooltip from './Tooltip'

interface CopyToClipboardProps {
  text: string
  className?: string
  children?: React.ReactNode
}

export default function CopyToClipboard({ text, className = '', children }: CopyToClipboardProps) {
  const [copied, setCopied] = useState(false)
  const toast = useToast()

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      toast.showToast('Copied to clipboard!', 'success', 2000)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <Tooltip content={copied ? 'Copied!' : 'Copy to clipboard'}>
      <button
        onClick={handleCopy}
        className={`inline-flex items-center gap-2 transition-all hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-hacker-green/50 focus:ring-offset-2 focus:ring-offset-terminal-bg ${className}`}
        aria-label={`Copy ${text} to clipboard`}
      >
        {children}
        {copied ? (
          <Check className="text-hacker-green" size={16} />
        ) : (
          <Copy className="text-gray-400 hover:text-hacker-green transition-colors" size={16} />
        )}
      </button>
    </Tooltip>
  )
}
