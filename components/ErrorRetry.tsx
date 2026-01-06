'use client'

import { useState, ReactNode } from 'react'
import { AlertCircle, RefreshCw } from 'lucide-react'

interface ErrorRetryProps {
  error: Error | string
  onRetry?: () => void
  children?: ReactNode
}

export default function ErrorRetry({ error, onRetry, children }: ErrorRetryProps) {
  const [retrying, setRetrying] = useState(false)

  const handleRetry = async () => {
    if (onRetry) {
      setRetrying(true)
      try {
        await onRetry()
      } finally {
        setTimeout(() => setRetrying(false), 1000)
      }
    } else {
      // Default: reload the page
      window.location.reload()
    }
  }

  const errorMessage = typeof error === 'string' ? error : error.message

  return (
    <div className="terminal-window rounded-lg p-6 border border-hacker-pink/50 bg-hacker-pink/10">
      <div className="flex items-start gap-4">
        <AlertCircle className="text-hacker-pink flex-shrink-0 mt-0.5" size={24} />
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-hacker-pink font-mono mb-2">Error</h3>
          <p className="text-gray-300 text-sm font-mono mb-4 break-words">{errorMessage}</p>
          {onRetry && (
            <button
              onClick={handleRetry}
              disabled={retrying}
              className="btn-gradient px-4 py-2 bg-hacker-green/10 border-hacker-green/50 text-hacker-green font-mono text-sm hover:border-hacker-green hover:bg-hacker-green/20 focus:outline-none focus:ring-2 focus:ring-hacker-green/50 focus:ring-offset-2 focus:ring-offset-terminal-bg flex items-center gap-2 rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Retry"
            >
              <RefreshCw size={16} className={retrying ? 'animate-spin' : ''} />
              {retrying ? 'Retrying...' : 'Retry'}
            </button>
          )}
          {children}
        </div>
      </div>
    </div>
  )
}
