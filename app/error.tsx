'use client'

import { useEffect } from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-terminal-bg">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <AlertTriangle className="text-hacker-pink mx-auto mb-4" size={64} />
          <h1 className="text-4xl font-bold font-mono text-white mb-4">Error</h1>
          <div className="text-2xl font-mono text-gray-300 mb-2">
            <span className="text-hacker-green">{'>'}</span>{' '}
            <span>something_went_wrong</span>
          </div>
          <p className="text-gray-400 font-mono mb-6">
            {error.message || 'An unexpected error occurred'}
          </p>
          {error.digest && (
            <p className="text-sm text-gray-500 font-mono mb-6">
              Error ID: {error.digest}
            </p>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="btn-gradient px-8 py-3 bg-hacker-green/10 border-hacker-green/50 text-hacker-green font-mono text-sm hover:border-hacker-green hover:bg-hacker-green/20 focus:outline-none focus:ring-2 focus:ring-hacker-green/50 focus:ring-offset-2 focus:ring-offset-terminal-bg flex items-center justify-center gap-2 mx-auto rounded transition-all"
          >
            <RefreshCw size={18} />
            Try Again
          </button>
          <Link
            href="/"
            className="btn-gradient px-8 py-3 bg-hacker-cyan/10 border-hacker-cyan/50 text-hacker-cyan font-mono text-sm hover:border-hacker-cyan hover:bg-hacker-cyan/20 focus:outline-none focus:ring-2 focus:ring-hacker-cyan/50 focus:ring-offset-2 focus:ring-offset-terminal-bg flex items-center justify-center gap-2 rounded transition-all"
          >
            <Home size={18} />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}
