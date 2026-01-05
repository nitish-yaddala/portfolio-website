import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-terminal-bg">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold font-mono text-hacker-green mb-4">404</h1>
          <div className="text-6xl font-mono text-white mb-6">
            <span className="text-hacker-green">{'>'}</span>{' '}
            <span>page_not_found</span>
          </div>
        </div>
        
        <p className="text-xl text-gray-300 mb-8 font-mono">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="btn-gradient px-8 py-3 bg-hacker-green/10 border-hacker-green/50 text-hacker-green font-mono text-sm hover:border-hacker-green hover:bg-hacker-green/20 focus:outline-none focus:ring-2 focus:ring-hacker-green/50 focus:ring-offset-2 focus:ring-offset-terminal-bg flex items-center justify-center gap-2 rounded transition-all"
          >
            <Home size={18} />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn-gradient px-8 py-3 bg-hacker-cyan/10 border-hacker-cyan/50 text-hacker-cyan font-mono text-sm hover:border-hacker-cyan hover:bg-hacker-cyan/20 focus:outline-none focus:ring-2 focus:ring-hacker-cyan/50 focus:ring-offset-2 focus:ring-offset-terminal-bg flex items-center justify-center gap-2 rounded transition-all"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  )
}
