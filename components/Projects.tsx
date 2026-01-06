'use client'

import { useState, useMemo } from 'react'
import { Calendar, Code, Search, X, Filter } from 'lucide-react'
import { resumeData } from '@/data/resume'
import ScrollAnimation from './ScrollAnimation'
import CodeSnippet from './CodeSnippet'

export default function Projects() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTech, setSelectedTech] = useState<Set<string>>(new Set())

  // Get all unique technologies
  const allTech = useMemo(() => {
    const techSet = new Set<string>()
    resumeData.projects.forEach(project => {
      project.tech.forEach(tech => techSet.add(tech))
    })
    return Array.from(techSet).sort()
  }, [])

  // Filter projects
  const filteredProjects = useMemo(() => {
    return resumeData.projects.filter(project => {
      // Search filter
      const matchesSearch = searchQuery === '' || 
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.some(desc => desc.toLowerCase().includes(searchQuery.toLowerCase())) ||
        project.tech.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()))

      // Tech filter
      const matchesTech = selectedTech.size === 0 || 
        project.tech.some(tech => selectedTech.has(tech))

      return matchesSearch && matchesTech
    })
  }, [searchQuery, selectedTech])

  const toggleTech = (tech: string) => {
    setSelectedTech(prev => {
      const newSet = new Set(prev)
      if (newSet.has(tech)) {
        newSet.delete(tech)
      } else {
        newSet.add(tech)
      }
      return newSet
    })
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedTech(new Set())
  }

  const hasActiveFilters = searchQuery !== '' || selectedTech.size > 0

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
            <h2 className="section-heading text-4xl sm:text-5xl lg:text-6xl font-mono mb-6">
              <span className="text-hacker-green">{'>'}</span>{' '}
              <span className="text-white">Projects</span>
            </h2>
          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-hacker-green/60 to-transparent mx-auto"></div>
        </div>

        {/* Search and Filter Controls */}
        <div className="mb-12 space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search projects by name, description, or technology..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-3 bg-terminal-bg border border-hacker-green/30 rounded-lg text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-hacker-green/50 focus:border-hacker-green transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-hacker-green transition-colors"
                aria-label="Clear search"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Technology Filter */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Filter className="text-hacker-green" size={18} />
              <span className="text-sm text-gray-400 font-mono uppercase tracking-wider">Filter by Technology:</span>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="ml-auto text-xs text-hacker-cyan hover:text-hacker-green font-mono flex items-center gap-1.5 transition-colors"
                >
                  <X size={14} />
                  Clear all
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2.5">
              {allTech.map((tech) => {
                const isSelected = selectedTech.has(tech)
                return (
                  <button
                    key={tech}
                    onClick={() => toggleTech(tech)}
                    className={`px-3 py-1.5 text-xs font-mono rounded transition-all whitespace-nowrap ${
                      isSelected
                        ? 'bg-hacker-green/20 border-2 border-hacker-green text-hacker-green'
                        : 'bg-hacker-cyan/10 border border-hacker-cyan/40 text-hacker-cyan hover:bg-hacker-cyan/20 hover:border-hacker-cyan/60'
                    }`}
                  >
                    {tech}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Results Count */}
          {hasActiveFilters && (
            <div className="text-sm text-gray-400 font-mono">
              Showing {filteredProjects.length} of {resumeData.projects.length} projects
            </div>
          )}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6 md:gap-10">
            {filteredProjects.map((project, idx) => (
              <ScrollAnimation key={idx} delay={idx * 100}>
                <div className="terminal-window rounded-lg p-4 sm:p-6 md:p-8 card-hover group relative h-full flex flex-col overflow-hidden">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 sm:mb-6 gap-3 sm:gap-4 flex-shrink-0">
                    <h3 className="text-xl sm:text-2xl font-bold text-white font-mono group-hover:text-hacker-green transition-colors flex-1 min-w-0 break-words">
                      {project.name}
                    </h3>
                    <div className="flex-shrink-0">
                      <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-hacker-purple/10 border border-hacker-purple/30 text-hacker-purple text-xs font-mono rounded inline-flex items-center gap-1.5 whitespace-nowrap">
                        <Calendar size={12} className="flex-shrink-0" />
                        <span className="truncate">{project.period}</span>
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6 sm:mb-8 flex-1">
                    {project.description.map((desc, descIdx) => (
                      <p key={descIdx} className="text-gray-200 leading-relaxed text-sm sm:text-base break-words">
                        {desc}
                      </p>
                    ))}
                  </div>

                  {/* Code Snippets - Show for Python projects */}
                  {project.tech.includes('Python') && (
                    <div className="mb-8 space-y-3">
                      <CodeSnippet
                        title="Example Implementation"
                        language="python"
                        code={`# Security assessment tooling example
import requests
from typing import List, Dict

def assess_endpoint(url: str, headers: Dict) -> Dict:
    """Assess security posture of endpoint"""
    try:
        response = requests.get(url, headers=headers, timeout=10)
        return {
            'status': response.status_code,
            'headers': dict(response.headers),
            'vulnerabilities': analyze_response(response)
        }
    except Exception as e:
        return {'error': str(e)}

def analyze_response(response) -> List[str]:
    """Identify potential security issues"""
    issues = []
    # Security analysis logic here
    return issues`}
                      />
                    </div>
                  )}

                  <div className="pt-4 sm:pt-6 border-t border-hacker-green/30 flex-shrink-0">
                    <div className="flex items-center gap-2 mb-3 sm:mb-4">
                      <Code size={18} className="text-hacker-green flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-400 font-mono uppercase tracking-wider">Tech Stack:</span>
                    </div>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {project.tech.map((tech, techIdx) => (
                        <span
                          key={techIdx}
                          className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-hacker-cyan/10 border border-hacker-cyan/40 text-hacker-cyan text-xs font-mono rounded hover:bg-hacker-cyan/20 hover:border-hacker-cyan/60 transition-all break-words"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-400 font-mono text-lg mb-2">No projects found</p>
            <p className="text-gray-500 font-mono text-sm">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </section>
  )
}
