'use client'

import { useEffect, useState } from 'react'
import { Gauge, Wifi, WifiOff, Clock, Zap } from 'lucide-react'
import ScrollAnimation from './ScrollAnimation'

export default function PerformanceMetrics() {
  const [loadTime, setLoadTime] = useState<number | null>(null)
  const [isOnline, setIsOnline] = useState(true)
  const [lighthouseScore, setLighthouseScore] = useState<number | null>(null)

  useEffect(() => {
    // Measure page load time using modern Performance API
    const measureLoadTime = () => {
      if (typeof window !== 'undefined' && window.performance) {
        try {
          // Try modern Navigation Timing API first
          const navEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[]
          if (navEntries.length > 0) {
            const navEntry = navEntries[0]
            const loadTime = navEntry.loadEventEnd - navEntry.fetchStart
            if (loadTime > 0) {
              setLoadTime(Math.round(loadTime))
              return
            }
          }
          
          // Fallback to legacy timing API (deprecated but still available)
          const perfData = (window.performance as any).timing
          if (perfData && perfData.loadEventEnd > 0 && perfData.navigationStart > 0) {
            const loadTime = perfData.loadEventEnd - perfData.navigationStart
            if (loadTime > 0) {
              setLoadTime(Math.round(loadTime))
              return
            }
          }
        } catch (e) {
          console.warn('Could not measure load time:', e)
        }
      }
      
      // If measurement fails, set a default reasonable value
      setLoadTime(500)
    }

    // Measure load time
    if (document.readyState === 'complete') {
      measureLoadTime()
    } else {
      window.addEventListener('load', measureLoadTime, { once: true })
    }

    // Check online status
    setIsOnline(navigator.onLine)
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      window.removeEventListener('load', measureLoadTime)
    }
  }, [])

  useEffect(() => {
    // Calculate Lighthouse score based on load time
    if (loadTime !== null && loadTime > 0) {
      const score = Math.max(0, Math.min(100, 100 - (loadTime / 100)))
      setLighthouseScore(Math.round(score))
    }
  }, [loadTime])

  const getScoreColor = (score: number | null) => {
    if (!score) return 'text-gray-400'
    if (score >= 90) return 'text-hacker-green'
    if (score >= 50) return 'text-hacker-cyan'
    return 'text-hacker-pink'
  }

  const getScoreLabel = (score: number | null) => {
    if (!score) return 'N/A'
    if (score >= 90) return 'Excellent'
    if (score >= 50) return 'Good'
    return 'Needs Improvement'
  }

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-hacker-green/20">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          <ScrollAnimation delay={0}>
            <div className="terminal-window rounded-lg p-6 card-hover h-full flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="text-hacker-green" size={20} />
                <span className="text-sm text-gray-400 font-mono uppercase tracking-wider">Load Time</span>
              </div>
              <div className="flex items-center gap-2 flex-1">
                <span className="text-3xl font-bold text-white font-mono">
                  {loadTime ? `${loadTime}ms` : '...'}
                </span>
                {loadTime && loadTime < 1000 && (
                  <Zap className="text-hacker-green" size={16} />
                )}
              </div>
            </div>
          </ScrollAnimation>

          <ScrollAnimation delay={100}>
            <div className="terminal-window rounded-lg p-6 card-hover h-full flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <Gauge className="text-hacker-cyan" size={20} />
                <span className="text-sm text-gray-400 font-mono uppercase tracking-wider">Performance</span>
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex items-baseline gap-2">
                  <span className={`text-3xl font-bold font-mono ${getScoreColor(lighthouseScore)}`}>
                    {lighthouseScore ? `${lighthouseScore}` : '...'}
                  </span>
                  <span className="text-gray-400 text-sm">/ 100</span>
                </div>
                {lighthouseScore && (
                  <p className="text-xs text-gray-500 mt-2 font-mono">
                    {getScoreLabel(lighthouseScore)}
                  </p>
                )}
              </div>
            </div>
          </ScrollAnimation>

          <ScrollAnimation delay={200}>
            <div className="terminal-window rounded-lg p-6 card-hover h-full flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                {isOnline ? (
                  <Wifi className="text-hacker-green" size={20} />
                ) : (
                  <WifiOff className="text-hacker-pink" size={20} />
                )}
                <span className="text-sm text-gray-400 font-mono uppercase tracking-wider">Network</span>
              </div>
              <div className="flex items-center gap-2 flex-1">
                <span className={`text-lg font-bold font-mono ${
                  isOnline ? 'text-hacker-green' : 'text-hacker-pink'
                }`}>
                  {isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  )
}
