'use client'

import React from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-terminal-bg">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <AlertTriangle className="text-hacker-pink mx-auto mb-4" size={64} />
              <h1 className="text-4xl font-bold font-mono text-white mb-4">Error</h1>
              <p className="text-gray-300 font-mono mb-2">
                Something went wrong.
              </p>
              {this.state.error && (
                <p className="text-sm text-gray-500 font-mono mb-6">
                  {this.state.error.message}
                </p>
              )}
            </div>
            <button
              onClick={this.handleReset}
              className="btn-gradient px-8 py-3 bg-hacker-green/10 border-hacker-green/50 text-hacker-green font-mono text-sm hover:border-hacker-green hover:bg-hacker-green/20 focus:outline-none focus:ring-2 focus:ring-hacker-green/50 focus:ring-offset-2 focus:ring-offset-terminal-bg flex items-center justify-center gap-2 mx-auto rounded transition-all"
            >
              <RefreshCw size={18} />
              Try Again
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
