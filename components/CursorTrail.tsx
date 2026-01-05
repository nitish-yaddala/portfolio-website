'use client'

import { useEffect, useRef } from 'react'

export default function CursorTrail() {
  const trailRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<Array<{ x: number; y: number; opacity: number; size: number }>>([])

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!trailRef.current) return

      // Add particle at cursor position
      const particle = {
        x: e.clientX,
        y: e.clientY,
        opacity: 0.6,
        size: Math.random() * 4 + 2
      }
      
      particlesRef.current.push(particle)
      
      // Limit particle count for performance
      if (particlesRef.current.length > 20) {
        particlesRef.current.shift()
      }

      // Update trail
      updateTrail()
    }

    const updateTrail = () => {
      if (!trailRef.current) return

      // Fade out and remove old particles
      particlesRef.current = particlesRef.current
        .map(p => ({ ...p, opacity: p.opacity * 0.85 }))
        .filter(p => p.opacity > 0.05)

      // Render particles
      trailRef.current.innerHTML = particlesRef.current
        .map(p => `
          <div style="
            position: fixed;
            left: ${p.x}px;
            top: ${p.y}px;
            width: ${p.size}px;
            height: ${p.size}px;
            background: radial-gradient(circle, rgba(74, 222, 128, ${p.opacity}) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            transform: translate(-50%, -50%);
            z-index: 9999;
          "></div>
        `)
        .join('')
    }

    // Animate trail
    const animate = () => {
      updateTrail()
      requestAnimationFrame(animate)
    }
    
    animate()
    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return <div ref={trailRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 9999 }} aria-hidden="true" />
}
