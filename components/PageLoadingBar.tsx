'use client'

import { useEffect, useState } from 'react'

export default function PageLoadingBar() {
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Only show loading bar on initial page load
    if (typeof window !== 'undefined') {
      setLoading(true)
      setProgress(0)

      // Simulate loading progress
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval)
            return 90
          }
          // Increment progress with easing
          const increment = Math.random() * 15 + 5
          return Math.min(prev + increment, 90)
        })
      }, 100)

      // Complete the loading after a short delay
      const timeout = setTimeout(() => {
        setProgress(100)
        setTimeout(() => {
          setLoading(false)
          setProgress(0)
        }, 300)
      }, 500)

      return () => {
        clearInterval(interval)
        clearTimeout(timeout)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!loading) return null

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[9999] h-1 bg-transparent pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-to-r from-hacker-green via-hacker-cyan to-hacker-purple transition-all duration-300 ease-out shadow-lg shadow-hacker-green/50"
        style={{
          width: `${progress}%`,
          transition: progress === 100 ? 'width 0.3s ease-out' : 'width 0.1s linear',
        }}
      />
    </div>
  )
}
