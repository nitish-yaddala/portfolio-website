'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Calendar, Clock, Search, Tag, ArrowRight } from 'lucide-react'
import { blogPosts } from '@/data/blog'
import ScrollAnimation from '@/components/ScrollAnimation'

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  // Get all unique tags
  const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)))

  // Filter posts
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesTag = selectedTag === null || post.tags.includes(selectedTag)

    return matchesSearch && matchesTag
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200
    const wordCount = content.split(/\s+/).length
    return Math.ceil(wordCount / wordsPerMinute)
  }

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="section-heading text-4xl sm:text-5xl lg:text-6xl font-mono mb-6">
            <span className="text-hacker-green">{'>'}</span>{' '}
            <span className="text-white">Blog</span>
          </h1>
          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-hacker-green/60 to-transparent mx-auto mb-6"></div>
          <p className="text-gray-400 font-mono text-sm max-w-2xl mx-auto">
            Technical writeups, security research, and industry insights
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search blog posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-terminal-bg border border-hacker-green/30 rounded-lg text-white font-mono focus:outline-none focus:border-hacker-green focus:ring-2 focus:ring-hacker-green/20"
            />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-4 py-2 rounded-lg font-mono text-sm transition-colors ${
                selectedTag === null
                  ? 'bg-hacker-green/20 border-2 border-hacker-green text-hacker-green'
                  : 'bg-terminal-bg/50 border border-hacker-green/30 text-gray-400 hover:border-hacker-green/50'
              }`}
            >
              All
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-lg font-mono text-sm transition-colors ${
                  selectedTag === tag
                    ? 'bg-hacker-green/20 border-2 border-hacker-green text-hacker-green'
                    : 'bg-terminal-bg/50 border border-hacker-green/30 text-gray-400 hover:border-hacker-green/50'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 font-mono">No blog posts found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, idx) => (
              <ScrollAnimation key={post.slug} delay={idx * 100}>
                <Link href={`/blog/${post.slug}`}>
                  <article className="terminal-window rounded-lg p-6 h-full flex flex-col hover:border-hacker-green/50 transition-all card-hover group">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-hacker-cyan/10 border border-hacker-cyan/30 text-hacker-cyan text-xs font-mono rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-xl font-bold text-white font-mono mb-3 group-hover:text-hacker-green transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-400 text-sm mb-4 flex-1 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500 font-mono pt-4 border-t border-hacker-green/20">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {formatDate(post.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {calculateReadingTime(post.content)} min read
                        </span>
                      </div>
                      <ArrowRight className="text-hacker-green group-hover:translate-x-1 transition-transform" size={16} />
                    </div>
                  </article>
                </Link>
              </ScrollAnimation>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
