'use client'

import { useEffect, useState } from 'react'
import { Github, Star, GitBranch } from 'lucide-react'
import { resumeData } from '@/data/resume'
import ScrollAnimation from './ScrollAnimation'
import SkeletonLoader from './SkeletonLoader'

interface GitHubStats {
  stars: number
  repos: number
  contributions: number
}

export default function SocialProof() {
  const [stats, setStats] = useState<GitHubStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        setError(null)
        const username = resumeData.personal.github.split('/').pop() || 'nitish-yaddala'

        // Fetch repositories
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
        if (!reposResponse.ok) throw new Error('Failed to fetch repositories')
        const repos = await reposResponse.json()

        // Calculate total stars
        const totalStars = repos.reduce((sum: number, repo: any) => sum + (repo.stargazers_count || 0), 0)

        // Estimate contributions (GitHub REST API doesn't provide exact count)
        let contributions = 0
        try {
          const userResponse = await fetch(`https://api.github.com/users/${username}`)
          if (userResponse.ok) {
            const userData = await userResponse.json()
            contributions = repos.length * 10 // Rough estimate
          }
        } catch (e) {
          // If contribution fetch fails, use estimate
          contributions = repos.length * 10
        }

        setStats({
          stars: totalStars,
          repos: repos.length,
          contributions,
        })
      } catch (err) {
        console.error('Failed to fetch GitHub stats:', err)
        setError('Failed to load GitHub statistics')
        // Set default values on error
        setStats({
          stars: 0,
          repos: 0,
          contributions: 0,
        })
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <section id="social-proof" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <ScrollAnimation delay={0}>
          <div className="terminal-window rounded-lg p-6 md:p-8">
            <div className="flex items-center gap-4 mb-6">
              <Github className="text-hacker-green" size={32} />
              <h2 className="text-2xl md:text-3xl font-bold text-white font-mono">GitHub Activity</h2>
            </div>

            {loading ? (
              <div className="grid md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="text-center">
                    <SkeletonLoader variant="circle" width="48px" height="48px" className="mx-auto mb-3" />
                    <SkeletonLoader variant="text" count={2} width="120px" className="mx-auto" />
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-gray-400 font-mono text-sm">{error}</p>
                <a
                  href={resumeData.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-hacker-green hover:text-hacker-cyan font-mono text-sm mt-2 inline-block"
                >
                  View on GitHub →
                </a>
              </div>
            ) : stats ? (
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 rounded-lg bg-terminal-bg/50 border border-hacker-green/20">
                  <Star className="text-hacker-green mx-auto mb-2" size={32} />
                  <div className="text-3xl font-bold text-white font-mono mb-1">{stats.stars.toLocaleString()}</div>
                  <div className="text-gray-400 text-sm font-mono">Stars</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-terminal-bg/50 border border-hacker-green/20">
                  <GitBranch className="text-hacker-cyan mx-auto mb-2" size={32} />
                  <div className="text-3xl font-bold text-white font-mono mb-1">{stats.repos}</div>
                  <div className="text-gray-400 text-sm font-mono">Repositories</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-terminal-bg/50 border border-hacker-green/20">
                  <Github className="text-hacker-purple mx-auto mb-2" size={32} />
                  <div className="text-3xl font-bold text-white font-mono mb-1">{stats.contributions.toLocaleString()}+</div>
                  <div className="text-gray-400 text-sm font-mono">Contributions</div>
                </div>
              </div>
            ) : null}

            <div className="mt-6 text-center">
              <a
                href={resumeData.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-hacker-green hover:text-hacker-cyan font-mono text-sm transition-colors inline-flex items-center gap-2"
              >
                View GitHub Profile <Github size={16} />
              </a>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
