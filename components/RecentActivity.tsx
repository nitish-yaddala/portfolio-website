'use client'

import { Award, Code, Trophy } from 'lucide-react'
import { resumeData } from '@/data/resume'
import ScrollAnimation from './ScrollAnimation'

export default function RecentActivity() {
  // Get most recent items
  const recentCertifications = resumeData.certifications
    .filter(cert => !cert.status || cert.status !== 'In Progress')
    .slice(0, 2)

  const recentProjects = resumeData.projects.slice(0, 3)

  const activities = [
    ...recentCertifications.map(cert => ({
      type: 'certification' as const,
      title: cert.name,
      icon: Award,
      color: 'hacker-green'
    })),
    ...recentProjects.map(project => ({
      type: 'project' as const,
      title: project.name,
      icon: Code,
      color: 'hacker-cyan'
    })),
    ...(resumeData.achievements.competitions.length > 0 ? [{
      type: 'achievement' as const,
      title: resumeData.achievements.competitions[0],
      icon: Trophy,
      color: 'hacker-purple'
    }] : [])
  ].slice(0, 6)

  return (
    <section id="recent-activity" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="section-heading text-4xl sm:text-5xl lg:text-6xl font-mono mb-6">
            <span className="text-hacker-green">{'>'}</span>{' '}
            <span className="text-white">Recent Activity</span>
          </h2>
          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-hacker-green/60 to-transparent mx-auto"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Latest certifications, projects, and achievements
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-hacker-green/30 via-hacker-green/15 to-transparent hidden md:block"></div>
          
          <div className="space-y-8">
            {activities.map((activity, idx) => {
              const Icon = activity.icon
              return (
                <ScrollAnimation key={idx} delay={idx * 100}>
                  <div className="relative pl-0 md:pl-20">
                    <div className="absolute left-6 md:left-6 top-8 w-4 h-4 bg-hacker-green/70 rounded-full border-2 border-hacker-green/30 hidden md:block shadow-md shadow-hacker-green/10 z-10"></div>
                    
                    <div className="terminal-window rounded-lg p-6 md:p-8 card-hover group">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 bg-${activity.color}/10 rounded-lg group-hover:bg-${activity.color}/20 transition-colors flex-shrink-0`}>
                          <Icon className={`text-${activity.color}`} size={24} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-bold text-white font-mono mb-2 group-hover:text-hacker-green transition-colors">
                            {activity.title}
                          </h3>
                          <span className={`text-xs font-mono uppercase tracking-wider text-${activity.color}`}>
                            {activity.type}
                          </span>
                        </div>
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
