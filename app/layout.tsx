import type { Metadata } from 'next'
import React from 'react'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import StructuredData from '@/components/StructuredData'
import KeyboardShortcuts from '@/components/KeyboardShortcuts'
import Analytics from '@/components/Analytics'
import { ToastProvider } from '@/components/Toast'
import PageLoadingBar from '@/components/PageLoadingBar'
import ErrorBoundaryWrapper from '@/components/ErrorBoundaryWrapper'
import CursorTrail from '@/components/CursorTrail'
import ParallaxBackground from '@/components/ParallaxBackground'
import ReadingProgress from '@/components/ReadingProgress'
import ThemeProvider from '@/components/ThemeProvider'
import { siteConfig } from '@/config/site'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: ['Security Engineer', 'Penetration Testing', 'Application Security', 'Cloud Security', 'Vulnerability Assessment', 'Cybersecurity'],
  authors: [{ name: 'Muni Nitish Kumar Yaddala' }],
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    type: 'website',
    locale: 'en_US',
    siteName: siteConfig.name,
    url: siteConfig.url,
    images: [{ 
      url: siteConfig.ogImage, 
      width: 1200, 
      height: 630, 
      alt: 'Nitish Yaddala - Security Engineer' 
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  alternates: {
    canonical: siteConfig.url,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <PageLoadingBar />
        <ToastProvider>
          <ThemeProvider>
          <StructuredData />
          <KeyboardShortcuts />
          <Analytics />
          <CursorTrail />
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <ErrorBoundaryWrapper>
          <div className="min-h-screen bg-terminal-bg text-gray-100 relative overflow-x-hidden">
            {/* Background layers - all behind content */}
            <ParallaxBackground />
            <div 
              className="fixed inset-0 pointer-events-none z-0"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(74,222,128,0.08) 1px, transparent 1px)',
                backgroundSize: '50px 50px',
                opacity: 0.3
              }}
            ></div>
            <div className="scanline fixed inset-0 pointer-events-none z-0">
              <div className="h-full w-full bg-gradient-to-b from-transparent via-hacker-green/20 to-transparent"></div>
            </div>
            {/* Reading Progress Indicator */}
            <ReadingProgress />
            {/* Navigation - above background, below content */}
            <Navigation />
            {/* Main content - highest z-index */}
            <main id="main-content" className="relative z-10" tabIndex={-1} style={{ position: 'relative', zIndex: 10, minHeight: '100vh' }}>
              {children}
            </main>
          </div>
                </ErrorBoundaryWrapper>
              </ThemeProvider>
            </ToastProvider>
          </body>
    </html>
  )
}
