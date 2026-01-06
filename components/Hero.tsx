'use client'

import { useEffect, useState } from 'react'
import { Download, Mail, Linkedin, Github, ChevronDown, FileText } from 'lucide-react'
import { resumeData } from '@/data/resume'
import TerminalPanel from './TerminalPanel'

export default function Hero() {
  const [typedText, setTypedText] = useState('')
  const fullText = resumeData.personal.title
  const [showCursor, setShowCursor] = useState(true)
  const [isResumeMenuOpen, setIsResumeMenuOpen] = useState(false)

  useEffect(() => {
    let index = 0
    let rafId: number
    let lastTime = 0
    const targetInterval = 50 // 50ms between characters
    
    const animate = (currentTime: number) => {
      if (currentTime - lastTime >= targetInterval) {
        if (index < fullText.length) {
          setTypedText(fullText.slice(0, index + 1))
          index++
          lastTime = currentTime
        } else {
          setShowCursor(false)
          return
        }
      }
      rafId = requestAnimationFrame(animate)
    }
    
    rafId = requestAnimationFrame(animate)
    
    return () => {
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [fullText])

  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-16 relative z-20 isolate">
      <div className="max-w-7xl mx-auto w-full relative z-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10 fade-in-up relative z-20">
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-mono font-normal">
                <span className="text-hacker-green">$</span>{' '}
                <span className="text-white font-normal">whoami</span>
              </h1>
              <h2 className="hero-heading text-4xl sm:text-5xl lg:text-6xl text-white font-bold">
                {resumeData.personal.name}
              </h2>
              <div className="text-xl sm:text-2xl text-gray-300 font-mono min-h-[2.5rem]">
                <span className="text-hacker-green">{'>'}</span>{' '}
                <span>{typedText}</span>
                {showCursor && <span className="typing-cursor text-hacker-green">|</span>}
              </div>
            </div>

            <div className="space-y-5">
              {resumeData.personal.summary.map((line, idx) => (
                <p key={idx} className="text-gray-200 leading-relaxed text-base">
                  {line}
                </p>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <div className="relative">
                <button
                  onClick={() => setIsResumeMenuOpen(!isResumeMenuOpen)}
                  onBlur={() => setTimeout(() => setIsResumeMenuOpen(false), 200)}
                  className="btn-gradient px-7 py-3.5 bg-hacker-green/10 border-hacker-green/50 text-hacker-green font-mono text-sm hover:border-hacker-green hover:bg-hacker-green/20 focus:outline-none focus:ring-2 focus:ring-hacker-green/50 focus:ring-offset-2 focus:ring-offset-terminal-bg flex items-center gap-2.5 rounded transition-all"
                  aria-label="Resume options"
                  aria-expanded={isResumeMenuOpen}
                >
                  <FileText size={18} />
                  Resume
                  <ChevronDown size={16} className={`transition-transform ${isResumeMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                {isResumeMenuOpen && (
                  <div className="absolute left-0 top-full mt-2 w-56 bg-terminal-bg/95 backdrop-blur-xl border border-hacker-green/30 rounded-lg shadow-lg z-50">
                    <div className="py-2">
                      <a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsResumeMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 font-mono text-sm text-gray-300 hover:text-hacker-green hover:bg-hacker-green/10 transition-all focus:outline-none focus:ring-2 focus:ring-hacker-green/50 focus:ring-inset"
                        aria-label="View resume in new tab"
                      >
                        <FileText size={16} className="text-hacker-green" />
                        View Resume
                      </a>
                      <a
                        href="/resume.pdf"
                        download="Muni_Nitish_Kumar_Yaddala_Resume.pdf"
                        onClick={() => setIsResumeMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 font-mono text-sm text-gray-300 hover:text-hacker-green hover:bg-hacker-green/10 transition-all focus:outline-none focus:ring-2 focus:ring-hacker-green/50 focus:ring-inset"
                        aria-label="Download resume"
                      >
                        <Download size={16} className="text-hacker-green" />
                        Download Resume
                      </a>
                    </div>
                  </div>
                )}
              </div>
              <a
                href={resumeData.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gradient px-7 py-3.5 bg-hacker-cyan/10 border-hacker-cyan/50 text-hacker-cyan font-mono text-sm hover:border-hacker-cyan hover:bg-hacker-cyan/20 focus:outline-none focus:ring-2 focus:ring-hacker-cyan/50 focus:ring-offset-2 focus:ring-offset-terminal-bg flex items-center gap-2.5 rounded transition-all"
                aria-label="Visit LinkedIn profile"
              >
                <Linkedin size={18} />
                LinkedIn
              </a>
              <a
                href={`mailto:${resumeData.personal.email}`}
                className="btn-gradient px-7 py-3.5 bg-hacker-purple/10 border-hacker-purple/50 text-hacker-purple font-mono text-sm hover:border-hacker-purple hover:bg-hacker-purple/20 focus:outline-none focus:ring-2 focus:ring-hacker-purple/50 focus:ring-offset-2 focus:ring-offset-terminal-bg flex items-center gap-2.5 rounded transition-all"
                aria-label="Send email"
              >
                <Mail size={18} />
                Email
              </a>
              <a
                href={resumeData.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gradient px-7 py-3.5 bg-hacker-pink/10 border-hacker-pink/50 text-hacker-pink font-mono text-sm hover:border-hacker-pink hover:bg-hacker-pink/20 focus:outline-none focus:ring-2 focus:ring-hacker-pink/50 focus:ring-offset-2 focus:ring-offset-terminal-bg flex items-center gap-2.5 rounded transition-all"
                aria-label="Visit GitHub profile"
              >
                <Github size={18} />
                GitHub
              </a>
            </div>
          </div>

          <div className="hidden lg:block fade-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
            <TerminalPanel />
          </div>
        </div>
      </div>

      <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 z-30 relative">
        <button
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          className="text-hacker-green/60 hover:text-hacker-green transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-hacker-green/50 focus:ring-offset-2 focus:ring-offset-terminal-bg rounded-full p-2 flex flex-col items-center gap-2 group bg-terminal-bg/80 backdrop-blur-sm rounded-lg px-3 py-2"
          aria-label="Scroll down to about section"
        >
          <span className="text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">Scroll</span>
          <ChevronDown size={24} className="animate-bounce" />
        </button>
      </div>
    </section>
  )
}
