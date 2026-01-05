'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

const sections = [
  { id: 'home', key: 'H', num: '1', label: 'Home' },
  { id: 'about', key: 'A', num: '2', label: 'About' },
  { id: 'experience', key: 'E', num: '3', label: 'Experience' },
  { id: 'skills', key: 'S', num: '4', label: 'Skills' },
  { id: 'projects', key: 'P', num: '5', label: 'Projects' },
  { id: 'workflow', key: 'W', num: '6', label: 'Workflow' },
  { id: 'research', key: 'R', num: '7', label: 'Research' },
  { id: 'achievements', key: 'T', num: '8', label: 'Achievements' },
  { id: 'contact', key: 'C', num: '9', label: 'Contact' },
  { id: 'education', key: 'D', num: null, label: 'Education' },
  { id: 'certifications', key: 'F', num: null, label: 'Certifications' },
  { id: 'security-resources', key: 'G', num: null, label: 'Security Resources' },
  { id: 'recent-activity', key: 'I', num: null, label: 'Recent Activity' },
  { id: 'social-proof', key: 'J', num: null, label: 'Social Proof' },
  { id: 'security-advisories', key: 'K', num: null, label: 'Security Advisories' },
]

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function KeyboardShortcuts() {
  const [showHelp, setShowHelp] = useState(false)

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Only activate if not typing in an input/textarea
      if (
        (e.target as HTMLElement).tagName === 'INPUT' ||
        (e.target as HTMLElement).tagName === 'TEXTAREA' ||
        (e.target as HTMLElement).isContentEditable
      ) {
        return
      }

      // Check for modifier keys (Ctrl/Cmd)
      const isModifierPressed = e.ctrlKey || e.metaKey

      // Help modal toggle
      if (e.key === '?' && !isModifierPressed) {
        e.preventDefault()
        setShowHelp(prev => !prev)
        return
      }

      // Close help modal with Escape
      if (e.key === 'Escape' && showHelp) {
        setShowHelp(false)
        return
      }

      // Number key navigation (1-9)
      const numKey = parseInt(e.key)
      if (!isNaN(numKey) && numKey >= 1 && numKey <= 9 && !isModifierPressed) {
        e.preventDefault()
        const section = sections[numKey - 1]
        if (section) {
          scrollToSection(section.id)
        }
        return
      }

      // Letter key navigation
      switch (e.key.toLowerCase()) {
        case 'h':
          if (!isModifierPressed) {
            e.preventDefault()
            scrollToSection('home')
          }
          break
        case 'a':
          if (!isModifierPressed) {
            e.preventDefault()
            scrollToSection('about')
          }
          break
        case 'e':
          if (!isModifierPressed) {
            e.preventDefault()
            scrollToSection('experience')
          }
          break
        case 's':
          if (!isModifierPressed) {
            e.preventDefault()
            scrollToSection('skills')
          }
          break
        case 'p':
          if (!isModifierPressed) {
            e.preventDefault()
            scrollToSection('projects')
          }
          break
        case 'w':
          if (!isModifierPressed) {
            e.preventDefault()
            scrollToSection('workflow')
          }
          break
        case 'r':
          if (!isModifierPressed) {
            e.preventDefault()
            scrollToSection('research')
          }
          break
        case 't':
          if (!isModifierPressed) {
            e.preventDefault()
            scrollToSection('achievements')
          }
          break
        case 'c':
          if (!isModifierPressed) {
            e.preventDefault()
            scrollToSection('contact')
          }
          break
        case 'd':
          if (!isModifierPressed) {
            e.preventDefault()
            scrollToSection('education')
          }
          break
        case 'f':
          if (!isModifierPressed) {
            e.preventDefault()
            scrollToSection('certifications')
          }
          break
        case 'g':
          if (!isModifierPressed) {
            e.preventDefault()
            scrollToSection('security-resources')
          }
          break
        case 'i':
          if (!isModifierPressed) {
            e.preventDefault()
            scrollToSection('recent-activity')
          }
          break
        case 'j':
          if (!isModifierPressed) {
            e.preventDefault()
            scrollToSection('social-proof')
          }
          break
        case 'k':
          if (!isModifierPressed) {
            e.preventDefault()
            scrollToSection('security-advisories')
          }
          break
        case 'arrowup':
        case 'home':
          if (window.scrollY === 0) {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }
          break
        case 'arrowdown':
        case 'end':
          if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
            e.preventDefault()
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
          }
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [showHelp])

  return (
    <>
      {showHelp && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setShowHelp(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="help-modal-title"
        >
          <div
            className="terminal-window rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Terminal Header */}
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-hacker-green/30">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="ml-4 text-gray-400 text-xs font-mono">help --keyboard-shortcuts</span>
              <button
                onClick={() => setShowHelp(false)}
                className="ml-auto text-gray-400 hover:text-hacker-green transition-colors"
                aria-label="Close help"
              >
                <X size={20} />
              </button>
            </div>

            {/* Terminal Content */}
            <div className="font-mono text-sm space-y-6">
              <div>
                <div className="text-hacker-green mb-2">
                  <span className="text-gray-500">$</span> keyboard shortcuts
                </div>
                <div className="text-gray-300 pl-4">
                  Available keyboard shortcuts for navigation
                </div>
              </div>

              <div>
                <div className="text-hacker-green mb-3">Navigation:</div>
                <div className="space-y-2 pl-4">
                  {sections.map((section) => (
                    <div key={section.id} className="flex items-center gap-4 text-gray-300">
                      <div className="flex items-center gap-2 min-w-[120px]">
                        {section.num ? (
                          <>
                            <kbd className="px-2 py-1 bg-terminal-bg border border-hacker-green/40 rounded text-hacker-green text-xs">
                              {section.num}
                            </kbd>
                            <span className="text-gray-500">or</span>
                          </>
                        ) : null}
                        <kbd className="px-2 py-1 bg-terminal-bg border border-hacker-green/40 rounded text-hacker-green text-xs">
                          {section.key}
                        </kbd>
                      </div>
                      <span className="text-hacker-cyan">{section.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-hacker-green mb-3">General:</div>
                <div className="space-y-2 pl-4 text-gray-300">
                  <div className="flex items-center gap-4">
                    <kbd className="px-2 py-1 bg-terminal-bg border border-hacker-green/40 rounded text-hacker-green text-xs">
                      ?
                    </kbd>
                    <span>Show/hide this help</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <kbd className="px-2 py-1 bg-terminal-bg border border-hacker-green/40 rounded text-hacker-green text-xs">
                      Esc
                    </kbd>
                    <span>Close help modal</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <kbd className="px-2 py-1 bg-terminal-bg border border-hacker-green/40 rounded text-hacker-green text-xs">
                      ↑
                    </kbd>
                    <span>Scroll to top</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <kbd className="px-2 py-1 bg-terminal-bg border border-hacker-green/40 rounded text-hacker-green text-xs">
                      ↓
                    </kbd>
                    <span>Scroll to bottom</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-hacker-green/30">
                <div className="text-gray-500 text-xs">
                  Press <kbd className="px-1.5 py-0.5 bg-terminal-bg border border-hacker-green/40 rounded text-hacker-green">Esc</kbd> or click outside to close
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
