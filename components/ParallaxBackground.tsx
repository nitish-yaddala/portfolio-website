'use client'

import { useEffect, useRef } from 'react'

export default function ParallaxBackground() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const handleScroll = () => {
      if (!ref.current) return
      const scrolled = window.scrollY
      // Subtle parallax effect - very light to avoid performance issues
      ref.current.style.transform = `translate3d(0, ${scrolled * 0.1}px, 0)`
    }

    // Throttle scroll events
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      ref={ref}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(74, 222, 128, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(103, 232, 249, 0.05) 0%, transparent 50%)',
        willChange: 'transform',
        transform: 'translateZ(0)',
        opacity: 0.4
      }}
      aria-hidden="true"
    />
  )
}
