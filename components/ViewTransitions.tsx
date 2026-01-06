'use client'

import { useEffect } from 'react'

export default function ViewTransitions() {
  useEffect(() => {
    // Check if View Transitions API is supported
    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      // Add CSS for view transitions
      const style = document.createElement('style')
      style.id = 'view-transitions-style'
      style.textContent = `
        @view-transition {
          navigation: auto;
        }
        ::view-transition-old(root),
        ::view-transition-new(root) {
          animation-duration: 0.3s;
          animation-timing-function: ease-in-out;
        }
      `
      if (!document.getElementById('view-transitions-style')) {
        document.head.appendChild(style)
      }

      return () => {
        const existingStyle = document.getElementById('view-transitions-style')
        if (existingStyle) {
          document.head.removeChild(existingStyle)
        }
      }
    }
  }, [])

  return null
}
