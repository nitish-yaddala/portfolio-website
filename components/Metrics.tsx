'use client'

import { useEffect, useState } from 'react'
import { Shield, AlertTriangle, Server, Bug, Target, Smartphone } from 'lucide-react'
import { resumeData } from '@/data/resume'
import ScrollAnimation from './ScrollAnimation'

const metrics = [
  {
    icon: Server,
    label: 'Services Assessed',
    value: resumeData.metrics.servicesAssessed,
    suffix: '',
    colorClass: 'text-hacker-green',
    subtitle: '37 AWS services, 6 Web services, 2 Mobile apps'
  },
  {
    icon: Bug,
    label: 'Vulnerabilities Found',
    value: resumeData.metrics.vulnerabilitiesFound,
    suffix: '+',
    colorClass: 'text-hacker-cyan'
  },
  {
    icon: AlertTriangle,
    label: 'High Severity',
    value: resumeData.metrics.highSeverity,
    suffix: '',
    colorClass: 'text-hacker-pink'
  },
  {
    icon: Target,
    label: 'Web Apps Tested',
    value: resumeData.metrics.webAppsTested,
    suffix: '',
    colorClass: 'text-hacker-purple'
  },
  {
    icon: Smartphone,
    label: 'Mobile Apps Tested',
    value: resumeData.metrics.mobileAppsTested,
    suffix: '',
    colorClass: 'text-hacker-cyan',
    subtitle: 'iOS & Android'
  },
  {
    icon: Shield,
    label: 'Critical Vulnerabilities',
    value: resumeData.metrics.criticalVulns,
    suffix: '',
    colorClass: 'text-hacker-green'
  }
]

export default function Metrics() {
  const [countedValues, setCountedValues] = useState(metrics.map(() => 0))
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
            metrics.forEach((metric, index) => {
              let current = 0
              const increment = metric.value / 60
              const duration = 2000 // 2 seconds
              const startTime = performance.now()
              
              const animate = (timestamp: number) => {
                const elapsed = timestamp - startTime
                const progress = Math.min(elapsed / duration, 1)
                // Ease out cubic for smooth deceleration
                const eased = 1 - Math.pow(1 - progress, 3)
                current = metric.value * eased
                
                if (progress < 1) {
                  setCountedValues((prev) => {
                    const newValues = [...prev]
                    newValues[index] = Math.floor(current)
                    return newValues
                  })
                  requestAnimationFrame(animate)
                } else {
                  setCountedValues((prev) => {
                    const newValues = [...prev]
                    newValues[index] = metric.value
                    return newValues
                  })
                }
              }
              
              requestAnimationFrame(animate)
            })
          }
        })
      },
      { threshold: 0.3 }
    )

    const section = document.getElementById('metrics')
    if (section) observer.observe(section)

    return () => {
      if (section) observer.unobserve(section)
    }
  }, [hasAnimated])

  return (
    <section id="metrics" className="py-24 px-4 sm:px-6 lg:px-8 bg-terminal-border/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
            <h2 className="section-heading text-4xl sm:text-5xl lg:text-6xl font-mono mb-6">
              <span className="text-hacker-green">{'>'}</span>{' '}
              <span className="text-white">Metrics</span>
            </h2>
          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-hacker-green/60 to-transparent mx-auto"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon
            const formattedValue = countedValues[idx].toLocaleString()
            return (
              <ScrollAnimation key={idx} delay={idx * 100}>
                <div className="terminal-window rounded-lg p-8 text-center card-hover group relative overflow-hidden shadow-depth-1 h-full flex flex-col justify-between min-h-[200px]">
                  <div className={`mb-4 flex justify-center ${metric.colorClass}`}>
                    <div className="p-3 rounded-lg bg-hacker-green/5 group-hover:bg-hacker-green/10 transition-all duration-300 group-hover:shadow-lg">
                      <Icon size={28} className="group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <div className={`text-3xl font-bold font-mono mb-2 ${metric.colorClass}`} aria-label={`${metric.label}: ${formattedValue}${metric.suffix}`}>
                      {formattedValue}{metric.suffix}
                    </div>
                    <div className="text-sm text-gray-400 font-mono mb-1 break-words hyphens-auto leading-tight px-1">{metric.label}</div>
                    {metric.subtitle && (
                      <div className="text-xs text-gray-500 font-mono mt-1 break-words px-1">{metric.subtitle}</div>
                    )}
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
