'use client'

import { useState } from 'react'
import { Code2, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react'
import CopyToClipboard from './CopyToClipboard'

interface CodeSnippetProps {
  title: string
  code: string
  language?: string
  className?: string
}

export default function CodeSnippet({ title, code, language = 'bash', className = '' }: CodeSnippetProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className={`terminal-window rounded-lg overflow-hidden ${className}`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between hover:bg-hacker-green/5 transition-colors focus:outline-none focus:ring-2 focus:ring-hacker-green/50 focus:ring-inset"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-3">
          <Code2 className="text-hacker-green" size={20} />
          <span className="text-white font-mono text-sm">{title}</span>
          {language && (
            <span className="px-2 py-0.5 bg-hacker-cyan/10 border border-hacker-cyan/30 text-hacker-cyan text-xs font-mono rounded">
              {language}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {isExpanded && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleCopy()
              }}
              className="p-1.5 text-gray-400 hover:text-hacker-green transition-colors"
              aria-label="Copy code"
              title="Copy code"
            >
              {copied ? <Check size={16} className="text-hacker-green" /> : <Copy size={16} />}
            </button>
          )}
          {isExpanded ? (
            <ChevronUp className="text-hacker-green" size={20} />
          ) : (
            <ChevronDown className="text-gray-400" size={20} />
          )}
        </div>
      </button>

      {isExpanded && (
        <div className="px-4 pb-4">
          <pre className="bg-terminal-bg rounded p-4 overflow-x-auto border border-hacker-green/20">
            <code className="text-sm font-mono text-gray-300 whitespace-pre">{code}</code>
          </pre>
        </div>
      )}
    </div>
  )
}
