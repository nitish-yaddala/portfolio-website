'use client'

import { useEffect, useRef, useState } from 'react'

interface ScrollAnimationProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export default function ScrollAnimation({ children, delay = 0, className = '' }: ScrollAnimationProps) {
  // Start visible by default, then animate if needed
  const [isVisible, setIsVisible] = useState(true)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>()

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (prefersReducedMotion) {
      setIsVisible(true)
      return
    }

    // Skip animation if already visible
    if (hasAnimated) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
            // Use requestAnimationFrame for smoother animation start
            rafRef.current = requestAnimationFrame(() => {
              setTimeout(() => {
                setIsVisible(true)
              }, delay)
            })
            // Unobserve after animation to improve performance
            const currentRef = ref.current
            if (currentRef) {
              observer.unobserve(currentRef)
            }
          }
        })
      },
      { 
        threshold: 0.01, // Very low threshold to trigger easily
        rootMargin: '200px 0px 0px 0px' // Large top margin to trigger before element is visible
      }
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [delay, hasAnimated])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-100 translate-y-0' // Always visible - animation is optional enhancement
      } ${className}`}
      style={{
        willChange: 'auto',
        transform: 'translateZ(0)', // Force GPU acceleration
        backfaceVisibility: 'hidden'
      }}
    >
      {children}
    </div>
  )
}
