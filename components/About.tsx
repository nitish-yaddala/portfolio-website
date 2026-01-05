import { Shield, Target, Code, CheckCircle, Bug, FileText } from 'lucide-react'
import ScrollAnimation from './ScrollAnimation'

const deliverables = [
  {
    icon: Bug,
    title: 'Vulnerability Discovery',
        description: 'Finding security vulnerabilities across web applications, APIs, cloud infrastructure, and mobile platforms through manual and automated testing.'
  },
  {
    icon: Target,
    title: 'Exploitability Validation',
        description: 'Testing to confirm vulnerability exploitability and assess real-world attack impact through proof-of-concept development.'
  },
  {
    icon: Code,
    title: 'Architecture Control Validation',
        description: 'Security architecture review and control validation across systems and services to identify design flaws and trust boundary violations.'
  },
  {
    icon: CheckCircle,
    title: 'Remediation Guidance',
        description: 'Prioritized remediation strategies tailored to organizational context, with clear implementation steps.'
  },
  {
    icon: FileText,
    title: 'Threat Model Enhancement',
    description: 'Review and enhancement of threat models to improve application security design and testing coverage.'
  }
]

export default function About() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
            <h2 className="section-heading text-4xl sm:text-5xl lg:text-6xl font-mono mb-6">
              <span className="text-hacker-green">{'>'}</span>{' '}
              <span className="text-white">About</span>
            </h2>
          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-hacker-green/60 to-transparent mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start mb-20">
          <ScrollAnimation delay={0}>
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-white font-mono mb-4">What I Do</h3>
                <p className="text-gray-200 leading-relaxed text-base">
                  I conduct security assessments across web applications, cloud infrastructure, 
                  and mobile platforms. I combine manual penetration 
                  testing with automated tooling to identify vulnerabilities, validate exploitability, and 
                  provide remediation guidance.
                </p>
                <p className="text-gray-200 leading-relaxed text-base">
                  I specialize in API security testing, threat modeling, and security architecture validation. 
                  By reviewing threat models and creating targeted security testing scenarios, I help organizations 
                  enhance their security posture and adhere to industry best practices.
                </p>
                <p className="text-gray-200 leading-relaxed text-base">
                  My work focuses on finding vulnerabilities, assessing risk, and working with teams to fix issues.
                </p>
              </div>
          </ScrollAnimation>

          <ScrollAnimation delay={100}>
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-white font-mono mb-4">How I Work</h3>
                <p className="text-gray-200 leading-relaxed text-base">
                  I use manual and automated techniques to assess risks, identify vulnerabilities, 
                  and bypass security mechanisms. I identify out-of-scope vulnerabilities when discovered, 
                  focusing on thorough security coverage.
                </p>
                <p className="text-gray-200 leading-relaxed text-base">
                  I work closely with development and security teams to understand system architecture, review 
                  threat models, and create testing scenarios that effectively uncover vulnerabilities. My goal 
                  is to provide clear, prioritized findings with practical remediation strategies.
                </p>
              </div>
          </ScrollAnimation>
        </div>

        <div>
          <h3 className="text-3xl font-bold text-white font-mono mb-12 text-center">What I Deliver</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {deliverables.map((item, idx) => {
              const Icon = item.icon
              return (
                <ScrollAnimation key={idx} delay={idx * 100}>
                  <div className="p-8 terminal-window rounded-lg card-hover group h-full flex flex-col">
                  <div className="flex items-start gap-5 flex-1">
                    <div className="p-4 bg-hacker-green/10 rounded-lg group-hover:bg-hacker-green/20 transition-all group-hover:scale-110 flex-shrink-0">
                      <Icon className="text-hacker-green" size={28} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xl font-bold text-white mb-3 font-mono group-hover:text-hacker-green transition-colors">{item.title}</h4>
                      <p className="text-gray-300 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
                </ScrollAnimation>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
