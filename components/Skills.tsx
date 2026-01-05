'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { resumeData } from '@/data/resume'
import ScrollAnimation from './ScrollAnimation'

export default function Skills() {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set() // All categories closed by default for cleaner initial view
  )

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(categoryName)) {
        newSet.delete(categoryName)
      } else {
        newSet.add(categoryName)
      }
      return newSet
    })
  }

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 bg-terminal-border/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
            <h2 className="section-heading text-4xl sm:text-5xl lg:text-6xl font-mono mb-6">
              <span className="text-hacker-green">{'>'}</span>{' '}
              <span className="text-white">Skills</span>
            </h2>
          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-hacker-green/60 to-transparent mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {resumeData.skills.map((category, idx) => {
            const isExpanded = expandedCategories.has(category.name)
            return (
              <ScrollAnimation key={idx} delay={idx * 80}>
                <div className="terminal-window rounded-lg overflow-hidden card-hover transition-all duration-300 relative z-10 h-full flex flex-col min-h-[120px]">
                  <button
                    onClick={() => toggleCategory(category.name)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        toggleCategory(category.name)
                      }
                    }}
                    className="w-full p-6 flex items-center justify-between text-left hover:bg-hacker-green/5 focus:outline-none focus:ring-2 focus:ring-hacker-green/50 focus:ring-offset-2 focus:ring-offset-terminal-bg transition-colors relative z-10 flex-shrink-0"
                    aria-expanded={isExpanded}
                    aria-controls={`skills-${idx}`}
                    id={`skills-button-${idx}`}
                  >
                    <div className="flex-1 min-w-0 pr-4">
                      <h3 className="text-xl font-bold text-white font-mono mb-1">
                        {category.name}
                      </h3>
                      {category.description && (
                        <p className="text-sm text-gray-400 line-clamp-2">{category.description}</p>
                      )}
                    </div>
                    <div className="flex-shrink-0">
                      {isExpanded ? (
                        <ChevronUp className="text-hacker-green" size={20} aria-hidden="true" />
                      ) : (
                        <ChevronDown className="text-gray-400" size={20} aria-hidden="true" />
                      )}
                    </div>
                  </button>

                  <div
                    id={`skills-${idx}`}
                    role="region"
                    aria-labelledby={`skills-button-${idx}`}
                    className={`overflow-hidden transition-all duration-500 ease-in-out relative z-10 ${
                      isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 pb-6 pt-4">
                      <div className="space-y-3">
                        {category.items.map((item, itemIdx) => {
                          // Simulate proficiency based on skill index (for demo)
                          const proficiency = Math.min(100, 70 + (itemIdx % 3) * 10)
                          return (
                            <div key={itemIdx} className="group/skill">
                              <div className="flex items-center justify-between mb-1.5">
                                <span className="text-sm text-gray-300 font-mono">{item}</span>
                                <span className="text-xs text-gray-500 font-mono opacity-0 group-hover/skill:opacity-100 transition-opacity">
                                  {proficiency}%
                                </span>
                              </div>
                              <div className="h-2 bg-terminal-bg rounded-full overflow-hidden border border-hacker-green/20">
                                <div
                                  className="h-full bg-gradient-to-r from-hacker-green via-hacker-cyan to-hacker-green transition-all duration-1000 ease-out group-hover/skill:from-hacker-green group-hover/skill:via-hacker-cyan group-hover/skill:to-hacker-purple"
                                  style={{ width: isExpanded ? `${proficiency}%` : '0%' }}
                                />
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            )
          })}
        </div>
      </div>
    </section>
  )
}
