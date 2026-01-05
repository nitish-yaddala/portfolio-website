import { FileText, Lock } from 'lucide-react'
import { resumeData } from '@/data/resume'
import ScrollAnimation from './ScrollAnimation'

const placeholderPosts = [
  'OWASP Top 10: Modern Attack Vectors and Mitigation Strategies',
  'API Security Testing: Beyond the Basics',
  'Cloud Security Assessment Methodology',
  'Binary Exploitation: From Theory to Practice',
  'Threat Modeling for Modern Applications'
]

export default function Research() {
  return (
    <section id="research" className="py-24 px-4 sm:px-6 lg:px-8 bg-terminal-border/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
            <h2 className="section-heading text-4xl sm:text-5xl lg:text-6xl font-mono mb-6">
              <span className="text-hacker-green">{'>'}</span>{' '}
              <span className="text-white">Research</span>
            </h2>
          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-hacker-green/60 to-transparent mx-auto"></div>
        </div>

        {resumeData.achievements.publications.length > 0 && (
          <ScrollAnimation delay={0}>
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-white font-mono mb-6 flex items-center gap-3">
                <FileText className="text-hacker-green" size={24} />
                Published Research
              </h3>
              <div className="terminal-window rounded-lg p-6">
                {resumeData.achievements.publications.map((pub, idx) => (
                  <p key={idx} className="text-gray-200 leading-relaxed mb-4 last:mb-0">
                    {pub}
                  </p>
                ))}
              </div>
            </div>
          </ScrollAnimation>
        )}

        <ScrollAnimation delay={0.1}>
          <div>
            <h3 className="text-2xl font-bold text-white font-mono mb-6 flex items-center gap-3">
              <Lock className="text-hacker-green" size={24} />
              Technical Writeups
            </h3>
            <div className="space-y-4">
              {placeholderPosts.map((post, idx) => (
                <ScrollAnimation key={idx} delay={idx * 80}>
                  <div className="terminal-window rounded-lg p-6 card-hover group">
                    <div className="flex items-center justify-between gap-4">
                      <h4 className="text-lg font-mono text-gray-300 group-hover:text-hacker-green transition-colors flex-1 min-w-0">
                        {post}
                      </h4>
                      <span className="px-3 py-1 bg-hacker-green/10 border border-hacker-green/30 text-hacker-green text-xs font-mono rounded whitespace-nowrap flex-shrink-0">
                        Coming Soon
                      </span>
                    </div>
                  </div>
                </ScrollAnimation>
              ))}
            </div>

            <div className="mt-8 terminal-window rounded-lg p-6 border border-hacker-cyan/30">
              <p className="text-gray-400 text-sm font-mono">
                <span className="text-hacker-cyan">Note:</span> Technical writeups available on request. 
                Contact me for detailed security research, vulnerability analysis, or methodology documentation.
              </p>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
