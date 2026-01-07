'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import { resumeData } from '@/data/resume'
import { ThemeToggle } from './ThemeProvider'

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'case-studies', label: 'Case Studies' },
  { id: 'workflow', label: 'Workflow' },
  { id: 'research', label: 'Research' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'security-advisories', label: 'Advisories' },
  { id: 'education', label: 'Education' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false)
  const [avatarError, setAvatarError] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      const sections = navItems.map(item => document.getElementById(item.id))
      const scrollPosition = window.scrollY + 100

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isMobileMenuOpen])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-terminal-bg/80 backdrop-blur-xl border-b border-hacker-green/30 shadow-lg shadow-hacker-green/10'
          : 'bg-transparent'
      }`}
      style={{
        willChange: 'background-color, backdrop-filter, border-color, box-shadow',
        transform: 'translateZ(0)' // GPU acceleration
      }}
    >
      <div className="w-full max-w-[99vw] mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        <div className="flex items-center justify-between h-18 gap-2 lg:gap-4">
          <button
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-2 font-mono text-lg sm:text-xl font-bold text-hacker-green transition-all hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-hacker-green/50 focus:ring-offset-2 focus:ring-offset-terminal-bg rounded px-2 whitespace-nowrap flex-shrink-0"
            aria-label="Go to home"
          >
            {/* Avatar */}
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-hacker-green/40 hover:border-hacker-green transition-all group flex-shrink-0">
              {!avatarError ? (
                <Image
                  src="/profile.jpg"
                  alt="Profile"
                  width={40}
                  height={40}
                  className="object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-300 scale-110"
                  style={{ objectPosition: 'center 40%' }}
                  priority
                  onError={() => setAvatarError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-hacker-green/20 to-hacker-cyan/20">
                  <span className="text-hacker-green font-mono text-sm font-bold">NY</span>
                </div>
              )}
              {/* Subtle glow on hover */}
              <div className="absolute inset-0 bg-hacker-green/0 group-hover:bg-hacker-green/10 transition-colors duration-300 pointer-events-none"></div>
            </div>
            <span className="whitespace-nowrap">{'>'} nitish_yaddala</span>
          </button>

          {/* Desktop navigation: Show items with overflow handling */}
          <div className="hidden lg:flex items-center flex-1 min-w-0 ml-4 max-w-none">
            <div className="flex items-center gap-2 xl:gap-3 2xl:gap-4 flex-1 justify-start" style={{ overflow: 'visible' }}>
              {navItems.slice(0, 7).map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`font-mono text-xs transition-all relative py-2 pb-3 focus:outline-none focus:ring-2 focus:ring-hacker-green/50 focus:ring-offset-2 focus:ring-offset-terminal-bg rounded px-1.5 whitespace-nowrap flex-shrink-0 ${
                    activeSection === item.id
                      ? 'text-hacker-green'
                      : 'text-gray-400 hover:text-hacker-green'
                  }`}
                  aria-label={`Navigate to ${item.label} section`}
                  aria-current={activeSection === item.id ? 'page' : undefined}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-hacker-green/70 to-transparent z-10"></span>
                  )}
                </button>
              ))}
            </div>
            {/* More dropdown for remaining items */}
            {navItems.length > 7 && (
              <div className="relative ml-2 flex-shrink-0">
                <button
                  onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                  onBlur={() => setTimeout(() => setIsMoreMenuOpen(false), 200)}
                  className="font-mono text-xs text-gray-400 hover:text-hacker-green transition-all py-2 px-1.5 rounded focus:outline-none focus:ring-2 focus:ring-hacker-green/50 focus:ring-offset-2 focus:ring-offset-terminal-bg whitespace-nowrap"
                  aria-label="Show more navigation items"
                  aria-expanded={isMoreMenuOpen}
                >
                  More...
                </button>
                {isMoreMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-terminal-bg/95 backdrop-blur-xl border border-hacker-green/30 rounded-lg shadow-lg z-50">
                    <div className="py-2">
                      {navItems.slice(7).map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            scrollToSection(item.id)
                            setIsMoreMenuOpen(false)
                          }}
                          className={`block w-full text-left px-4 py-2 font-mono text-xs transition-all focus:outline-none focus:ring-2 focus:ring-hacker-green/50 focus:ring-inset ${
                            activeSection === item.id
                              ? 'text-hacker-green bg-hacker-green/10 border-l-2 border-hacker-green'
                              : 'text-gray-400 hover:text-hacker-green hover:bg-hacker-green/5'
                          }`}
                          aria-label={`Navigate to ${item.label} section`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Medium screen: Show fewer items with dropdown */}
          <div className="hidden md:flex lg:hidden items-center space-x-3 flex-1 min-w-0 ml-4">
            <div className="flex items-center space-x-2" style={{ overflow: 'visible' }}>
              {navItems.slice(0, 4).map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`font-mono text-xs transition-all relative py-2 pb-3 focus:outline-none focus:ring-2 focus:ring-hacker-green/50 focus:ring-offset-2 focus:ring-offset-terminal-bg rounded px-1.5 whitespace-nowrap flex-shrink-0 ${
                    activeSection === item.id
                      ? 'text-hacker-green'
                      : 'text-gray-400 hover:text-hacker-green'
                  }`}
                  aria-label={`Navigate to ${item.label} section`}
                  aria-current={activeSection === item.id ? 'page' : undefined}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-hacker-green/70 to-transparent z-10"></span>
                  )}
                </button>
              ))}
            </div>
            <div className="relative flex-shrink-0 ml-2">
              <button
                onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                onBlur={() => setTimeout(() => setIsMoreMenuOpen(false), 200)}
                className="font-mono text-xs text-gray-400 hover:text-hacker-green transition-all py-2 px-1.5 rounded focus:outline-none focus:ring-2 focus:ring-hacker-green/50 focus:ring-offset-2 focus:ring-offset-terminal-bg whitespace-nowrap"
                aria-label="Show more navigation items"
                aria-expanded={isMoreMenuOpen}
              >
                More...
              </button>
              {isMoreMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-terminal-bg/95 backdrop-blur-xl border border-hacker-green/30 rounded-lg shadow-lg z-50">
                  <div className="py-2">
                    {navItems.slice(4).map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          scrollToSection(item.id)
                          setIsMoreMenuOpen(false)
                        }}
                        className={`block w-full text-left px-4 py-2 font-mono text-xs transition-all focus:outline-none focus:ring-2 focus:ring-hacker-green/50 focus:ring-inset ${
                          activeSection === item.id
                            ? 'text-hacker-green bg-hacker-green/10 border-l-2 border-hacker-green'
                            : 'text-gray-400 hover:text-hacker-green hover:bg-hacker-green/5'
                        }`}
                        aria-label={`Navigate to ${item.label} section`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2 flex-shrink-0">
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-hacker-green transition-colors focus:outline-none focus:ring-2 focus:ring-hacker-green/50 focus:ring-offset-2 focus:ring-offset-terminal-bg rounded"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div 
          className="md:hidden border-t border-hacker-green/30 bg-terminal-bg/95 backdrop-blur-xl"
          role="menu"
          aria-label="Navigation menu"
        >
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`block w-full text-left px-4 py-3 font-mono text-sm rounded transition-all focus:outline-none focus:ring-2 focus:ring-hacker-green/50 focus:ring-inset ${
                  activeSection === item.id
                    ? 'text-hacker-green bg-hacker-green/10 border-l-2 border-hacker-green'
                    : 'text-gray-400 hover:text-hacker-green hover:bg-hacker-green/5'
                }`}
                role="menuitem"
                aria-label={`Navigate to ${item.label} section`}
                aria-current={activeSection === item.id ? 'page' : undefined}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
