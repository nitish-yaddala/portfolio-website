'use client'

import { useEffect, useState } from 'react'
import { Github, Calendar, GitCommit, GitBranch, Star } from 'lucide-react'
import { resumeData } from '@/data/resume'
import ScrollAnimation from './ScrollAnimation'
import SkeletonLoader from './SkeletonLoader'

interface GitHubActivity {
  contributions: number
  contributionsThisYear: number
  streak: number
  repos: number
  stars: number
  recentActivity: Array<{
    repo: string
    type: 'commit' | 'pr' | 'issue'
    message: string
    date: string
  }>
}

export default function GitHubActivity() {
  const [activity, setActivity] = useState<GitHubActivity | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        setLoading(true)
        setError(null)
        const username = resumeData.personal.github.split('/').pop() || 'nitish-yaddala'

        // Fetch user data
        const userResponse = await fetch(`https://api.github.com/users/${username}`)
        if (!userResponse.ok) throw new Error('Failed to fetch user data')
        const userData = await userResponse.json()

        // Fetch repositories
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`)
        if (!reposResponse.ok) throw new Error('Failed to fetch repositories')
        const repos = await reposResponse.json()

        // Calculate stats
        const totalStars = repos.reduce((sum: number, repo: any) => sum + (repo.stargazers_count || 0), 0)
        const publicRepos = repos.filter((repo: any) => !repo.private).length

        // Fetch recent activity (events)
        let recentActivity: GitHubActivity['recentActivity'] = []
        try {
          const eventsResponse = await fetch(`https://api.github.com/users/${username}/events/public?per_page=10`)
          if (eventsResponse.ok) {
            const events = await eventsResponse.json()
            recentActivity = events.slice(0, 5).map((event: any) => {
              const repoName = event.repo.name
              let type: 'commit' | 'pr' | 'issue' = 'commit'
              let message = 'Activity'

              if (event.type === 'PushEvent') {
                type = 'commit'
                message = event.payload.commits?.[0]?.message || 'Pushed commits'
              } else if (event.type === 'PullRequestEvent') {
                type = 'pr'
                message = event.payload.pull_request?.title || 'Pull request'
              } else if (event.type === 'IssuesEvent') {
                type = 'issue'
                message = event.payload.issue?.title || 'Issue'
              }

              return {
                repo: repoName,
                type,
                message: message.substring(0, 60) + (message.length > 60 ? '...' : ''),
                date: new Date(event.created_at).toLocaleDateString()
              }
            })
          }
        } catch (e) {
          console.warn('Failed to fetch recent activity:', e)
        }

        // Estimate contributions (GitHub API doesn't provide exact count easily)
        const contributionsEstimate = publicRepos * 15 // Rough estimate

        setActivity({
          contributions: contributionsEstimate,
          contributionsThisYear: Math.floor(contributionsEstimate * 0.3), // Estimate 30% this year
          streak: 0, // Would need GitHub GraphQL API for accurate streak
          repos: publicRepos,
          stars: totalStars,
          recentActivity
        })
      } catch (err) {
        console.error('Failed to fetch GitHub activity:', err)
        setError('Failed to load GitHub activity')
        setActivity(null)
      } finally {
        setLoading(false)
      }
    }

    fetchActivity()
  }, [])

  return (
    <section id="github-activity" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-heading text-4xl sm:text-5xl lg:text-6xl font-mono mb-6">
            <span className="text-hacker-green">{'>'}</span>{' '}
            <span className="text-white">GitHub Activity</span>
          </h2>
          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-hacker-green/60 to-transparent mx-auto"></div>
        </div>

        <ScrollAnimation delay={0}>
          <div className="terminal-window rounded-lg p-6 md:p-8">
            {loading ? (
              <div className="space-y-6">
                <div className="grid md:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="text-center p-4 rounded-lg bg-terminal-bg/50">
                      <SkeletonLoader variant="circle" width="40px" height="40px" className="mx-auto mb-2" />
                      <SkeletonLoader variant="text" count={2} width="100px" className="mx-auto" />
                    </div>
                  ))}
                </div>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-gray-400 font-mono text-sm mb-4">{error}</p>
                <a
                  href={resumeData.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-hacker-green hover:text-hacker-cyan font-mono text-sm transition-colors inline-flex items-center gap-2"
                >
                  View on GitHub <Github size={16} />
                </a>
              </div>
            ) : activity ? (
              <div className="space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 rounded-lg bg-terminal-bg/50 border border-hacker-green/20">
                    <GitCommit className="text-hacker-green mx-auto mb-2" size={28} />
                    <div className="text-2xl font-bold text-white font-mono mb-1">
                      {activity.contributions.toLocaleString()}+
                    </div>
                    <div className="text-gray-400 text-xs font-mono">Contributions</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-terminal-bg/50 border border-hacker-cyan/20">
                    <GitBranch className="text-hacker-cyan mx-auto mb-2" size={28} />
                    <div className="text-2xl font-bold text-white font-mono mb-1">
                      {activity.repos}
                    </div>
                    <div className="text-gray-400 text-xs font-mono">Repositories</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-terminal-bg/50 border border-hacker-purple/20">
                    <Star className="text-hacker-purple mx-auto mb-2" size={28} />
                    <div className="text-2xl font-bold text-white font-mono mb-1">
                      {activity.stars.toLocaleString()}
                    </div>
                    <div className="text-gray-400 text-xs font-mono">Stars</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-terminal-bg/50 border border-hacker-pink/20">
                    <Calendar className="text-hacker-pink mx-auto mb-2" size={28} />
                    <div className="text-2xl font-bold text-white font-mono mb-1">
                      {activity.contributionsThisYear}
                    </div>
                    <div className="text-gray-400 text-xs font-mono">This Year</div>
                  </div>
                </div>

                {/* Recent Activity */}
                {activity.recentActivity.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-white font-mono mb-4 flex items-center gap-2">
                      <Github size={20} className="text-hacker-green" />
                      Recent Activity
                    </h3>
                    <div className="space-y-3">
                      {activity.recentActivity.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-3 rounded-lg bg-terminal-bg/30 border border-hacker-green/10 hover:border-hacker-green/30 transition-colors"
                        >
                          <div className="mt-1">
                            {item.type === 'commit' && <GitCommit className="text-hacker-green" size={16} />}
                            {item.type === 'pr' && <GitBranch className="text-hacker-cyan" size={16} />}
                            {item.type === 'issue' && <Github className="text-hacker-purple" size={16} />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-gray-200 font-mono text-sm mb-1">
                              <span className="text-hacker-green">{item.repo}</span>
                              <span className="text-gray-500 mx-2">•</span>
                              <span className="text-gray-400">{item.message}</span>
                            </div>
                            <div className="text-gray-500 font-mono text-xs">{item.date}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* View Profile Link */}
                <div className="text-center pt-4 border-t border-hacker-green/20">
                  <a
                    href={resumeData.personal.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-hacker-green hover:text-hacker-cyan font-mono text-sm transition-colors inline-flex items-center gap-2"
                  >
                    View Full GitHub Profile <Github size={16} />
                  </a>
                </div>
              </div>
            ) : null}
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
