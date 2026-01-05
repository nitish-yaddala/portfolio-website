'use client'

import { useState, useEffect } from 'react'
import { Menu, X, ChevronUp } from 'lucide-react'

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'workflow', label: 'Workflow' },
  { id: 'research', label: 'Research' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'security-advisories', label: 'Security Advisories' },
  { id: 'education', label: 'Education' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'security-resources', label: 'Security Resources' },
  { id: 'recent-activity', label: 'Recent Activity' },
  { id: 'social-proof', label: 'Social Proof' },
  { id: 'contact', label: 'Contact' },
]

export default function SectionJumpMenu() {
  const [isVisible, setIsVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300)
      
      // Update active section
      const scrollPosition = window.scrollY + 200
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id)
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (isOpen && !target.closest('.section-jump-menu')) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [isOpen])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setIsOpen(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setIsOpen(false)
  }

  if (!isVisible) return null

  return (
    <div className="section-jump-menu fixed bottom-6 left-6 z-50 flex flex-col items-start gap-3">
      {/* Section List */}
      {isOpen && (
        <div className="terminal-window rounded-lg p-4 mb-2 min-w-[200px] max-h-[400px] overflow-y-auto">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-hacker-green/30">
            <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">Jump to</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-hacker-green transition-colors"
              aria-label="Close menu"
            >
              <X size={16} />
            </button>
          </div>
          <div className="space-y-1">
            <button
              onClick={scrollToTop}
              className="w-full text-left px-3 py-2 text-sm font-mono text-gray-400 hover:text-hacker-green hover:bg-hacker-green/10 rounded transition-all flex items-center gap-2"
            >
              <ChevronUp size={14} />
              <span>Top</span>
            </button>
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`w-full text-left px-3 py-2 text-sm font-mono rounded transition-all flex items-center gap-2 ${
                  activeSection === section.id
                    ? 'text-hacker-green bg-hacker-green/10 border-l-2 border-hacker-green'
                    : 'text-gray-400 hover:text-hacker-green hover:bg-hacker-green/5'
                }`}
              >
                <span className="text-xs opacity-60">#</span>
                <span>{section.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 bg-hacker-green/20 border border-hacker-green/50 text-hacker-green rounded-full hover:bg-hacker-green/30 hover:border-hacker-green transition-all shadow-lg shadow-hacker-green/20 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-hacker-green/50 focus:ring-offset-2 focus:ring-offset-terminal-bg"
        aria-label={isOpen ? 'Close section menu' : 'Open section menu'}
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
    </div>
  )
}
