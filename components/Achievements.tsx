import { Trophy, Shield } from 'lucide-react'
import { resumeData } from '@/data/resume'
import ScrollAnimation from './ScrollAnimation'

export default function Achievements() {
  return (
    <section id="achievements" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
            <h2 className="section-heading text-4xl sm:text-5xl lg:text-6xl font-mono mb-6">
              <span className="text-hacker-green">{'>'}</span>{' '}
              <span className="text-white">Achievements</span>
            </h2>
          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-hacker-green/60 to-transparent mx-auto"></div>
        </div>

        {resumeData.achievements.vulnerabilities.length > 0 && (
          <ScrollAnimation delay={0}>
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-white font-mono mb-6 flex items-center gap-3">
                <Shield className="text-hacker-green" size={24} />
                Responsible Disclosure
              </h3>
              <div className="space-y-4">
                {resumeData.achievements.vulnerabilities.map((vuln, idx) => {
                  // Handle both string format (legacy) and object format (new)
                  if (typeof vuln === 'string') {
                    return (
                      <div key={idx} className="terminal-window rounded-lg p-6">
                        <p className="text-gray-200 leading-relaxed">
                          {vuln}
                        </p>
                      </div>
                    )
                  }
                  
                  // New structured format
                  return (
                    <div key={idx} className="terminal-window rounded-lg p-6 card-hover group">
                      <h4 className="text-lg font-bold text-white font-mono mb-3 group-hover:text-hacker-green transition-colors">
                        {vuln.title}
                      </h4>
                      <p className="text-gray-200 leading-relaxed mb-4">
                        {vuln.description}
                      </p>
                      {vuln.impact && vuln.impact.length > 0 && (
                        <div>
                          <div className="text-sm text-gray-400 font-mono mb-2 uppercase tracking-wider">
                            Impact:
                          </div>
                          <ul className="space-y-2">
                            {vuln.impact.map((impact, impactIdx) => (
                              <li key={impactIdx} className="text-gray-200 leading-relaxed flex items-start gap-3">
                                <span className="text-hacker-green mt-2 font-bold flex-shrink-0">▸</span>
                                <span>{impact}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </ScrollAnimation>
        )}

        {resumeData.achievements.competitions.length > 0 && (
          <ScrollAnimation delay={0.1}>
            <div>
              <h3 className="text-2xl font-bold text-white font-mono mb-6 flex items-center gap-3">
                <Trophy className="text-hacker-green" size={24} />
                Competitions & Achievements
              </h3>
              <div className="space-y-4">
                {resumeData.achievements.competitions.map((comp, idx) => {
                  // Parse title and description from the string
                  const colonIndex = comp.indexOf(':')
                  const title = colonIndex > 0 ? comp.substring(0, colonIndex).trim() : comp
                  const description = colonIndex > 0 ? comp.substring(colonIndex + 1).trim() : ''
                  
                  // Split description by periods to create bullet points
                  const bullets = description.split('.').filter(b => b.trim().length > 0)
                  
                  return (
                    <ScrollAnimation key={idx} delay={idx * 80}>
                      <div className="terminal-window rounded-lg p-6 card-hover group">
                        <h4 className="text-lg font-bold text-white font-mono mb-3 group-hover:text-hacker-green transition-colors">
                          {title}
                        </h4>
                        {bullets.length > 0 && (
                          <ul className="space-y-2">
                            {bullets.map((bullet, bulletIdx) => (
                              <li key={bulletIdx} className="text-gray-200 leading-relaxed flex items-start gap-3">
                                <span className="text-hacker-green mt-2 font-bold flex-shrink-0">▸</span>
                                <span>{bullet.trim()}.</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </ScrollAnimation>
                  )
                })}
              </div>
            </div>
          </ScrollAnimation>
        )}
      </div>
    </section>
  )
}
