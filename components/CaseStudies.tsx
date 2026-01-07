'use client'

import { useState } from 'react'
import { Shield, Calendar, MapPin, ExternalLink, ChevronRight, Search, Filter, X } from 'lucide-react'
import { caseStudies, CaseStudy } from '@/data/caseStudies'
import ScrollAnimation from './ScrollAnimation'
import CaseStudyDetail from './CaseStudyDetail'

export default function CaseStudies() {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Get unique categories
  const categories = Array.from(new Set(caseStudies.map(cs => cs.category)))

  // Filter case studies
  const filteredCaseStudies = caseStudies.filter(cs => {
    const matchesSearch = searchQuery === '' || 
      cs.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cs.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cs.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCategory = selectedCategory === null || cs.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory(null)
  }

  const hasActiveFilters = searchQuery !== '' || selectedCategory !== null

  if (selectedCaseStudy) {
    return (
      <CaseStudyDetail 
        caseStudy={selectedCaseStudy} 
        onBack={() => setSelectedCaseStudy(null)} 
      />
    )
  }

  return (
    <section id="case-studies" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="section-heading text-4xl sm:text-5xl lg:text-6xl font-mono mb-6">
            <span className="text-hacker-green">{'>'}</span>{' '}
            <span className="text-white">Technical Case Studies</span>
          </h2>
          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-hacker-green/60 to-transparent mx-auto"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Real-world security incidents, threat analysis, and forensic investigations
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="mb-12 space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search case studies by title, summary, or tags..."
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

          {/* Category Filter */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Filter className="text-hacker-green" size={18} />
              <span className="text-sm text-gray-400 font-mono uppercase tracking-wider">Filter by Category:</span>
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
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-3 py-1.5 text-xs font-mono rounded transition-all whitespace-nowrap ${
                  selectedCategory === null
                    ? 'bg-hacker-green/20 border-2 border-hacker-green text-hacker-green'
                    : 'bg-hacker-cyan/10 border border-hacker-cyan/40 text-hacker-cyan hover:bg-hacker-cyan/20 hover:border-hacker-cyan/60'
                }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 text-xs font-mono rounded transition-all whitespace-nowrap ${
                    selectedCategory === category
                      ? 'bg-hacker-green/20 border-2 border-hacker-green text-hacker-green'
                      : 'bg-hacker-cyan/10 border border-hacker-cyan/40 text-hacker-cyan hover:bg-hacker-cyan/20 hover:border-hacker-cyan/60'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          {hasActiveFilters && (
            <div className="text-sm text-gray-400 font-mono">
              Showing {filteredCaseStudies.length} of {caseStudies.length} case studies
            </div>
          )}
        </div>

        {/* Case Studies Grid */}
        {filteredCaseStudies.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6 md:gap-10">
            {filteredCaseStudies.map((caseStudy, idx) => (
              <ScrollAnimation key={caseStudy.id} delay={idx * 100}>
                <button
                  onClick={() => setSelectedCaseStudy(caseStudy)}
                  className="terminal-window rounded-lg p-4 sm:p-6 md:p-8 card-hover group relative h-full flex flex-col overflow-hidden text-left w-full"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 sm:mb-6 gap-3 sm:gap-4 flex-shrink-0">
                    <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                      <div className="p-3 bg-hacker-purple/10 rounded-lg group-hover:bg-hacker-purple/20 transition-colors flex-shrink-0">
                        <Shield className="text-hacker-purple" size={24} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl sm:text-2xl font-bold text-white font-mono group-hover:text-hacker-green transition-colors break-words mb-2">
                          {caseStudy.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-400">
                          <span className="flex items-center gap-1.5">
                            <Calendar size={12} />
                            {caseStudy.date}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin size={12} />
                            {caseStudy.location}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-hacker-purple/10 border border-hacker-purple/30 text-hacker-purple text-xs font-mono rounded flex-shrink-0 self-start">
                      {caseStudy.category}
                    </span>
                  </div>

                  <div className="space-y-4 mb-6 sm:mb-8 flex-1">
                    <p className="text-gray-200 leading-relaxed text-sm sm:text-base break-words">
                      {caseStudy.summary}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="pt-4 sm:pt-6 border-t border-hacker-green/30 flex-shrink-0">
                    <div className="flex flex-wrap gap-2 sm:gap-3 mb-4">
                      {caseStudy.tags.slice(0, 4).map((tag, tagIdx) => (
                        <span
                          key={tagIdx}
                          className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-hacker-cyan/10 border border-hacker-cyan/40 text-hacker-cyan text-xs font-mono rounded hover:bg-hacker-cyan/20 hover:border-hacker-cyan/60 transition-all break-words"
                        >
                          {tag}
                        </span>
                      ))}
                      {caseStudy.tags.length > 4 && (
                        <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-hacker-cyan/10 border border-hacker-cyan/40 text-hacker-cyan text-xs font-mono rounded">
                          +{caseStudy.tags.length - 4} more
                        </span>
                      )}
                    </div>
                    <div className="flex items-center text-hacker-green font-mono text-sm group-hover:gap-2 transition-all">
                      <span>Read Full Case Study</span>
                      <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </button>
              </ScrollAnimation>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-400 font-mono text-lg mb-2">No case studies found</p>
            <p className="text-gray-500 font-mono text-sm">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </section>
  )
}
