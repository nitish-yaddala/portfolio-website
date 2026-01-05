import { ArrowRight, Search, Target, FileText, CheckCircle, Users } from 'lucide-react'
import ScrollAnimation from './ScrollAnimation'

const workflowSteps = [
  {
    icon: Search,
    title: 'Scope Definition',
    description: 'Define assessment scope including web applications, APIs, cloud services, embedded systems, and mobile platforms.'
  },
  {
    icon: Target,
    title: 'Threat Model Validation',
    description: 'Review and validate threat models to identify security testing scenarios and potential attack vectors.'
  },
  {
    icon: FileText,
    title: 'Test Plan Development',
    description: 'Create test plans combining manual and automated techniques for full coverage.'
  },
  {
    icon: Search,
    title: 'Security Testing',
    description: 'Execute testing across web/API/cloud infrastructure using tools like Burp Suite, Nmap, and custom scripts.'
  },
  {
    icon: CheckCircle,
    title: 'Exploitability Confirmation',
    description: 'Validate vulnerability exploitability and assess real-world impact through proof-of-concept development.'
  },
  {
    icon: FileText,
    title: 'Report Generation',
    description: 'Document findings with CVSS scoring, CWE classification, and detailed remediation guidance.'
  },
  {
    icon: Users,
    title: 'Remediation Collaboration',
    description: 'Work with development teams to provide tailored mitigation strategies and security best practices.'
  },
  {
    icon: CheckCircle,
    title: 'Validation & Closure',
    description: 'Verify remediation effectiveness through retesting and ensure security posture improvement.'
  }
]

export default function Workflow() {
  return (
    <section id="workflow" className="py-24 px-4 sm:px-6 lg:px-8 bg-terminal-border/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
            <h2 className="section-heading text-4xl sm:text-5xl lg:text-6xl font-mono mb-6">
              <span className="text-hacker-green">{'>'}</span>{' '}
              <span className="text-white">Workflow</span>
            </h2>
          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-hacker-green/60 to-transparent mx-auto"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Security assessment methodology from scope to closure
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-hacker-green/20 transform -translate-y-1/2"></div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSteps.map((step, idx) => {
              const Icon = step.icon
              const isLast = idx === workflowSteps.length - 1
              return (
                <ScrollAnimation key={idx} delay={idx * 80}>
                  <div className="relative h-full">
                    <div className="terminal-window rounded-lg p-6 card-hover group h-full flex flex-col">
                      <div className="flex flex-col items-center text-center flex-1">
                        <div className="p-4 bg-hacker-green/10 rounded-lg mb-4 group-hover:bg-hacker-green/20 transition-colors flex-shrink-0">
                          <Icon className="text-hacker-green" size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-white font-mono mb-2 flex-shrink-0">
                          {step.title}
                        </h3>
                        <p className="text-sm text-gray-400 leading-relaxed flex-1">
                          {step.description}
                        </p>
                      </div>
                    </div>
                    
                    {!isLast && (
                      <div className="hidden lg:flex absolute top-1/2 -right-3 items-center justify-center w-6 h-6 bg-terminal-bg border-2 border-hacker-green/40 rounded-full z-10">
                        <ArrowRight className="text-hacker-green/70" size={14} />
                      </div>
                    )}
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
