import { Calendar, MapPin, Briefcase } from 'lucide-react'
import { resumeData } from '@/data/resume'
import ScrollAnimation from './ScrollAnimation'

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
            <h2 className="section-heading text-4xl sm:text-5xl lg:text-6xl font-mono mb-6">
              <span className="text-hacker-green">{'>'}</span>{' '}
              <span className="text-white">Experience</span>
            </h2>
          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-hacker-green/60 to-transparent mx-auto"></div>
        </div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-hacker-green/30 via-hacker-green/15 to-transparent hidden md:block"></div>
          
          <div className="space-y-12 md:space-y-16">
            {resumeData.experience.map((exp, idx) => (
              <ScrollAnimation key={idx} delay={idx * 150}>
                <div className="relative pl-0 md:pl-20">
                  <div className="absolute left-6 md:left-6 top-8 w-4 h-4 bg-hacker-green/70 rounded-full border-2 border-hacker-green/30 hidden md:block shadow-md shadow-hacker-green/10 z-10"></div>
                  
                  <div className="terminal-window rounded-lg p-6 md:p-8 lg:p-10 card-hover group">
                    {/* Header Section - Clean Alignment with Right Alignment */}
                    <div className="mb-8 pb-6 border-b border-hacker-green/20">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl md:text-2xl font-bold text-white font-mono mb-3 group-hover:text-hacker-green transition-colors leading-tight">
                            {exp.role}
                          </h3>
                          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                            <div className="flex items-center gap-2 text-gray-300">
                              <Briefcase size={16} className="text-hacker-green flex-shrink-0" />
                              <span className="text-hacker-green font-medium text-sm md:text-base">{exp.company}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-300">
                              <MapPin size={16} className="text-hacker-cyan flex-shrink-0" />
                              <span className="text-sm md:text-base">{exp.location}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center md:items-start md:justify-end flex-shrink-0">
                          <span className="px-3 py-1.5 bg-hacker-purple/10 border border-hacker-purple/30 text-hacker-purple text-xs font-mono rounded inline-flex items-center gap-1.5 whitespace-nowrap">
                            <Calendar size={14} className="flex-shrink-0" />
                            <span>{exp.period}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bullets Section - Clean Alignment */}
                    <div className="mb-8">
                      <ul className="space-y-3.5 md:space-y-4" role="list">
                        {exp.bullets.map((bullet, bulletIdx) => (
                          <li key={bulletIdx} className="text-gray-200 leading-relaxed flex items-start gap-3 md:gap-4 text-sm md:text-base">
                            <span className="text-hacker-green mt-1.5 md:mt-2 font-bold flex-shrink-0" aria-hidden="true">▸</span>
                            <span className="flex-1">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tools Section - Clean Alignment */}
                    <div className="pt-6 border-t border-hacker-green/30">
                      <div className="text-xs md:text-sm text-gray-400 mb-4 font-mono uppercase tracking-wider">Methods & Tools:</div>
                      <div className="flex flex-wrap gap-2.5 md:gap-3">
                        {exp.tools.map((tool, toolIdx) => (
                          <span
                            key={toolIdx}
                            className="px-3 md:px-4 py-1.5 bg-hacker-green/10 border border-hacker-green/40 text-hacker-green text-xs font-mono rounded hover:bg-hacker-green/20 hover:border-hacker-green/60 transition-all whitespace-nowrap"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
