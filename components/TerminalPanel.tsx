'use client'

import { useState, useEffect } from 'react'
import { resumeData } from '@/data/resume'

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const commands = [
  { 
    cmd: 'whoami', 
    output: resumeData.personal.name,
    action: null
  },
  { 
    cmd: 'pwd', 
    output: '/home/nitish/portfolio',
    action: null
  },
  { 
    cmd: 'ls projects', 
    output: resumeData.projects.map(p => p.name).join('  '),
    action: () => scrollToSection('projects')
  },
  { 
    cmd: 'cat experience', 
    output: resumeData.experience.map(e => `${e.company} - ${e.role}`).join('\n'),
    action: () => scrollToSection('experience')
  },
  { 
    cmd: 'open skills', 
    output: 'Opening skills section...',
    action: () => scrollToSection('skills')
  },
  {
    cmd: 'cd about',
    output: 'Navigating to about section...',
    action: () => scrollToSection('about')
  },
  {
    cmd: 'cat contact',
    output: `Email: ${resumeData.personal.email}\nLinkedIn: ${resumeData.personal.linkedin}`,
    action: () => scrollToSection('contact')
  }
]

export default function TerminalPanel() {
  const [currentCommand, setCurrentCommand] = useState(0)
  const [displayedOutput, setDisplayedOutput] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    if (currentCommand < commands.length) {
      setIsTyping(true)
      const cmd = commands[currentCommand]
      let charIndex = 0
      const output = cmd.output

      const typingInterval = setInterval(() => {
        if (charIndex < output.length) {
          setDisplayedOutput(output.slice(0, charIndex + 1))
          charIndex++
        } else {
          setIsTyping(false)
          clearInterval(typingInterval)
          
          setTimeout(() => {
            setCurrentCommand(prev => prev + 1)
            setDisplayedOutput('')
          }, 2000)
        }
      }, 30)

      return () => clearInterval(typingInterval)
    }
  }, [currentCommand])

  const activeCmd = currentCommand < commands.length ? commands[currentCommand] : null

  return (
    <div className="terminal-window rounded-lg p-6 font-mono text-sm space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="ml-4 text-gray-400 text-xs">terminal</span>
      </div>
      
      <div className="space-y-2">
        {commands.slice(0, currentCommand).map((cmd, idx) => (
          <div key={idx} className="space-y-1">
            <button
              onClick={() => cmd.action?.()}
              className={`text-hacker-green transition-all text-left w-full ${
                cmd.action ? 'hover:text-hacker-cyan cursor-pointer hover:underline' : ''
              }`}
              disabled={!cmd.action}
              aria-label={cmd.action ? `Click to navigate: ${cmd.cmd}` : undefined}
            >
              <span className="text-gray-500">$</span> {cmd.cmd}
            </button>
            <div className="text-gray-300 whitespace-pre-wrap pl-4">
              {cmd.output}
            </div>
          </div>
        ))}
        
        {activeCmd && (
          <div className="space-y-1">
            <button
              onClick={() => activeCmd.action?.()}
              className={`text-hacker-green transition-all text-left w-full ${
                activeCmd.action ? 'hover:text-hacker-cyan cursor-pointer hover:underline' : ''
              }`}
              disabled={!activeCmd.action}
              aria-label={activeCmd.action ? `Click to navigate: ${activeCmd.cmd}` : undefined}
            >
              <span className="text-gray-500">$</span> {activeCmd.cmd}
            </button>
            <div className="text-gray-300 whitespace-pre-wrap pl-4">
              {displayedOutput}
              {isTyping && <span className="typing-cursor text-hacker-green">|</span>}
            </div>
          </div>
        )}
      </div>
      
      {currentCommand >= commands.length && (
        <div className="text-gray-500 text-xs space-y-2">
          <div>Type a command or scroll to explore...</div>
          <div className="text-hacker-green/60 text-xs mt-2">
            Tip: Click on commands to navigate to sections
          </div>
        </div>
      )}
    </div>
  )
}
