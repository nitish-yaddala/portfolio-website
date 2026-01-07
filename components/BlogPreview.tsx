'use client'

import Link from 'next/link'
import { ArrowRight, FileText, Calendar, Clock } from 'lucide-react'
import { blogPosts } from '@/data/blog'
import ScrollAnimation from './ScrollAnimation'

export default function BlogPreview() {
  const featuredPosts = blogPosts.filter(post => post.featured).slice(0, 3)

  if (featuredPosts.length === 0) {
    return null
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200
    const wordCount = content.split(/\s+/).length
    return Math.ceil(wordCount / wordsPerMinute)
  }

  return (
    <section id="blog-preview" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-heading text-4xl sm:text-5xl lg:text-6xl font-mono mb-6">
            <span className="text-hacker-green">{'>'}</span>{' '}
            <span className="text-white">Latest Articles</span>
          </h2>
          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-hacker-green/60 to-transparent mx-auto mb-6"></div>
          <Link
            href="/blog"
            className="text-hacker-green hover:text-hacker-cyan font-mono text-sm transition-colors inline-flex items-center gap-2"
          >
            View All Posts <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {featuredPosts.map((post, idx) => (
            <ScrollAnimation key={post.slug} delay={idx * 100}>
              <Link href={`/blog/${post.slug}`}>
                <article className="terminal-window rounded-lg p-6 h-full flex flex-col hover:border-hacker-green/50 transition-all card-hover group">
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="text-hacker-green" size={20} />
                    <span className="px-2 py-1 bg-hacker-cyan/10 border border-hacker-cyan/30 text-hacker-cyan text-xs font-mono rounded">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white font-mono mb-3 group-hover:text-hacker-green transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 flex-1 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500 font-mono pt-4 border-t border-hacker-green/20">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {formatDate(post.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {calculateReadingTime(post.content)} min
                      </span>
                    </div>
                    <ArrowRight className="text-hacker-green group-hover:translate-x-1 transition-transform" size={14} />
                  </div>
                </article>
              </Link>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}
