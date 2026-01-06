'use client'

import { Shield, AlertTriangle, ExternalLink, Calendar } from 'lucide-react'
import { resumeData } from '@/data/resume'
import ScrollAnimation from './ScrollAnimation'

export default function SecurityAdvisories() {
  const advisories = resumeData.achievements.vulnerabilities.filter(
    (vuln): vuln is { title: string; description: string; impact: string[] } => 
      typeof vuln === 'object' && 'title' in vuln
  )

  if (advisories.length === 0) return null

  return (
    <section id="security-advisories" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="section-heading text-4xl sm:text-5xl lg:text-6xl font-mono mb-6">
            <span className="text-hacker-green">{'>'}</span>{' '}
            <span className="text-white">Security Advisories</span>
          </h2>
          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-hacker-green/60 to-transparent mx-auto"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Responsible disclosures and security research findings
          </p>
        </div>

        <div className="space-y-8">
          {advisories.map((advisory, idx) => (
            <ScrollAnimation key={idx} delay={idx * 150}>
              <div className="terminal-window rounded-lg p-4 sm:p-6 md:p-8 card-hover group overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="p-3 bg-hacker-pink/10 rounded-lg group-hover:bg-hacker-pink/20 transition-colors flex-shrink-0 self-start">
                    <Shield className="text-hacker-pink" size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-3 sm:mb-2">
                      <h3 className="text-lg sm:text-xl font-bold text-white font-mono group-hover:text-hacker-green transition-colors break-words flex-1 min-w-0">
                        {advisory.title}
                      </h3>
                      <span className="px-2.5 sm:px-3 py-1 bg-hacker-pink/10 border border-hacker-pink/30 text-hacker-pink text-xs font-mono rounded flex-shrink-0 flex items-center gap-1.5 self-start">
                        <AlertTriangle size={12} className="flex-shrink-0" />
                        <span className="whitespace-nowrap">Responsible Disclosure</span>
                      </span>
                    </div>
                    <p className="text-gray-300 leading-relaxed mb-4 text-sm sm:text-base break-words">
                      {advisory.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-hacker-green/30">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle className="text-hacker-pink" size={18} />
                    <span className="text-sm text-gray-400 font-mono uppercase tracking-wider">Impact:</span>
                  </div>
                  <ul className="space-y-2">
                    {advisory.impact.map((impact, impactIdx) => (
                      <li key={impactIdx} className="flex items-start gap-3 text-gray-200 leading-relaxed">
                        <span className="text-hacker-pink mt-1.5 font-bold flex-shrink-0" aria-hidden="true">▸</span>
                        <span>{impact}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}
