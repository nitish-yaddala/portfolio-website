'use client'

import { Award, Clock, Calendar, ExternalLink, Shield } from 'lucide-react'
import { resumeData } from '@/data/resume'
import ScrollAnimation from './ScrollAnimation'

// Issuer color schemes
const issuerColors: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  'TCM Security': {
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/40',
    text: 'text-orange-400',
    badge: 'bg-gradient-to-br from-orange-500/20 to-orange-600/20'
  },
  'Offsec': {
    bg: 'bg-red-500/10',
    border: 'border-red-500/40',
    text: 'text-red-400',
    badge: 'bg-gradient-to-br from-red-500/20 to-red-600/20'
  },
  'EC-Council': {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/40',
    text: 'text-blue-400',
    badge: 'bg-gradient-to-br from-blue-500/20 to-blue-600/20'
  },
  '(ISC)²': {
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/40',
    text: 'text-cyan-400',
    badge: 'bg-gradient-to-br from-cyan-500/20 to-cyan-600/20'
  }
}

const getIssuerColors = (issuer: string) => {
  return issuerColors[issuer] || {
    bg: 'bg-hacker-green/10',
    border: 'border-hacker-green/40',
    text: 'text-hacker-green',
    badge: 'bg-gradient-to-br from-hacker-green/20 to-hacker-cyan/20'
  }
}

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="section-heading text-4xl sm:text-5xl lg:text-6xl font-mono mb-6">
            <span className="text-hacker-green">{'>'}</span>{' '}
            <span className="text-white">Certifications</span>
          </h2>
          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-hacker-green/60 to-transparent mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {resumeData.certifications.map((cert, idx) => {
            const colors = getIssuerColors(cert.issuer)
            const isCompleted = !cert.status || cert.status !== 'In Progress'
            
            return (
              <ScrollAnimation key={idx} delay={idx * 100}>
                <div className="terminal-window rounded-lg p-4 sm:p-6 md:p-8 card-hover group h-full flex flex-col relative overflow-hidden">
                  {/* Badge Background */}
                  <div className={`absolute top-0 right-0 w-32 h-32 ${colors.badge} rounded-full blur-3xl opacity-30 -mr-16 -mt-16`}></div>
                  
                  <div className="flex items-start gap-3 sm:gap-4 md:gap-5 flex-1 relative z-10">
                    {/* Visual Badge */}
                    <div className={`p-3 sm:p-4 ${colors.bg} ${colors.border} border-2 rounded-lg group-hover:scale-110 transition-all flex-shrink-0 relative`}>
                      {isCompleted ? (
                        <Award className={colors.text} size={24} />
                      ) : (
                        <Clock className="text-hacker-cyan" size={24} />
                      )}
                      {isCompleted && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-hacker-green rounded-full border-2 border-terminal-bg flex items-center justify-center">
                          <Shield className="text-hacker-green" size={8} />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0 overflow-hidden">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-3">
                        <h3 className="text-lg sm:text-xl font-bold text-white font-mono group-hover:text-hacker-green transition-colors leading-tight break-words flex-1 min-w-0">
                          {cert.name}
                        </h3>
                        {cert.status && (
                          <span className="px-2.5 sm:px-3 py-1 bg-hacker-cyan/10 border border-hacker-cyan/30 text-hacker-cyan text-xs font-mono rounded flex-shrink-0 flex items-center gap-1.5 self-start">
                            <Clock size={12} className="flex-shrink-0" />
                            <span className="whitespace-nowrap">{cert.status}</span>
                          </span>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-medium ${colors.text} font-mono`}>
                            {cert.issuer}
                          </span>
                        </div>
                        
                        {cert.completionDate && (
                          <div className="flex items-center gap-2 text-gray-400 text-xs">
                            <Calendar size={14} />
                            <span className="font-mono">Completed: {cert.completionDate}</span>
                          </div>
                        )}
                        
                        {cert.verificationLink && (
                          <a
                            href={cert.verificationLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-hacker-cyan hover:text-hacker-green font-mono transition-colors group/link"
                          >
                            <span>Verify Credential</span>
                            <ExternalLink size={12} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                          </a>
                        )}
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
