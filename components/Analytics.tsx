'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import { usePathname } from 'next/navigation'

// Analytics Configuration
// See SETUP.md for detailed instructions

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID
const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN

export default function Analytics() {
  const pathname = usePathname()

  useEffect(() => {
    // Google Analytics 4 - Page view tracking
    if (GA_MEASUREMENT_ID && typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', GA_MEASUREMENT_ID, {
        page_path: pathname,
      })
    }

    // Plausible Analytics - Page view tracking
    if (PLAUSIBLE_DOMAIN && typeof window !== 'undefined' && (window as any).plausible) {
      (window as any).plausible('pageview')
    }

    // Custom analytics endpoint (if you have your own)
    // if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
    //   fetch(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ path: pathname, timestamp: Date.now() }),
    //   }).catch(() => {}) // Silently fail if endpoint is unavailable
    // }
  }, [pathname])

  return (
    <>
      {/* Google Analytics 4 */}
      {GA_MEASUREMENT_ID && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </>
      )}

      {/* Plausible Analytics */}
      {PLAUSIBLE_DOMAIN && (
        <Script
          defer
          data-domain={PLAUSIBLE_DOMAIN}
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      )}
    </>
  )
}

// Helper function to track custom events
export function trackEvent(eventName: string, eventData?: Record<string, any>) {
  if (typeof window === 'undefined') return

  // Google Analytics
  if (GA_MEASUREMENT_ID && (window as any).gtag) {
    (window as any).gtag('event', eventName, eventData)
    return
  }

  // Plausible
  if (PLAUSIBLE_DOMAIN && (window as any).plausible) {
    (window as any).plausible(eventName, { props: eventData })
    return
  }

  // Fallback: console log (for development)
  if (process.env.NODE_ENV === 'development') {
    console.log('Event tracked:', eventName, eventData)
  }
}
