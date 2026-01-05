import { GraduationCap, MapPin, Calendar, Award, BookOpen } from 'lucide-react'
import { resumeData } from '@/data/resume'
import ScrollAnimation from './ScrollAnimation'

export default function Education() {
  return (
    <section id="education" className="py-24 px-4 sm:px-6 lg:px-8 bg-terminal-border/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="section-heading text-4xl sm:text-5xl lg:text-6xl font-mono mb-6">
            <span className="text-hacker-green">{'>'}</span>{' '}
            <span className="text-white">Education</span>
          </h2>
          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-hacker-green/60 to-transparent mx-auto"></div>
        </div>

        <div className="space-y-12">
          {resumeData.education.map((edu, idx) => (
            <ScrollAnimation key={idx} delay={idx * 150}>
              <div className="terminal-window rounded-lg p-6 md:p-8 lg:p-10 card-hover group">
                {/* Header Section - Clean Alignment with Right Alignment */}
                <div className="mb-8 pb-6 border-b border-hacker-green/20">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-3 md:gap-4 mb-3">
                        <div className="p-3 bg-hacker-green/10 rounded-lg group-hover:bg-hacker-green/20 transition-colors flex-shrink-0">
                          <GraduationCap className="text-hacker-green" size={24} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl md:text-2xl font-bold text-white font-mono mb-2 group-hover:text-hacker-green transition-colors leading-tight">
                            {edu.degree}
                          </h3>
                          <div className="flex items-center gap-2 text-hacker-cyan">
                            <span className="font-medium text-sm md:text-base">{edu.institution}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                        <div className="flex items-center gap-2 text-gray-300">
                          <MapPin size={16} className="text-hacker-green flex-shrink-0" />
                          <span className="text-sm md:text-base">{edu.location}</span>
                        </div>
                        {edu.gpa && (
                          <div className="flex items-center gap-2 text-gray-300">
                            <Award size={16} className="text-hacker-pink flex-shrink-0" />
                            <span className="text-sm md:text-base">GPA: {edu.gpa}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center md:items-start md:justify-end flex-shrink-0">
                      <span className="px-3 py-1.5 bg-hacker-purple/10 border border-hacker-purple/30 text-hacker-purple text-xs font-mono rounded inline-flex items-center gap-1.5 whitespace-nowrap">
                        <Calendar size={14} className="flex-shrink-0" />
                        <span>{edu.period}</span>
                      </span>
                    </div>
                  </div>

                  {edu.note && (
                    <div className="mt-4 p-4 bg-hacker-green/5 border border-hacker-green/20 rounded-lg">
                      <p className="text-gray-200 text-sm leading-relaxed">{edu.note}</p>
                    </div>
                  )}
                </div>

                {/* Coursework Section - Clean Alignment */}
                {edu.coursework && edu.coursework.length > 0 && (
                  <div className="pt-6 border-t border-hacker-green/30">
                    <div className="flex items-center gap-2 mb-4">
                      <BookOpen size={16} className="text-hacker-green flex-shrink-0" />
                      <span className="text-xs md:text-sm text-gray-400 font-mono uppercase tracking-wider">Relevant Coursework:</span>
                    </div>
                    <div className="flex flex-wrap gap-2.5 md:gap-3">
                      {edu.coursework.map((course, courseIdx) => (
                        <span
                          key={courseIdx}
                          className="px-3 md:px-4 py-1.5 bg-hacker-cyan/10 border border-hacker-cyan/40 text-hacker-cyan text-xs font-mono rounded hover:bg-hacker-cyan/20 hover:border-hacker-cyan/60 transition-all whitespace-nowrap"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}
