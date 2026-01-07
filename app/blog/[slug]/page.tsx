'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, Tag, Share2 } from 'lucide-react'
import { blogPosts } from '@/data/blog'
import ScrollAnimation from '@/components/ScrollAnimation'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const [post, setPost] = useState(blogPosts.find(p => p.slug === params.slug))

  useEffect(() => {
    setPost(blogPosts.find(p => p.slug === params.slug))
  }, [params.slug])

  if (!post) {
    return (
      <div className="py-24 px-4 text-center">
        <h1 className="text-2xl font-bold text-white font-mono mb-4">Post Not Found</h1>
        <Link href="/blog" className="text-hacker-green hover:text-hacker-cyan font-mono">
          Back to Blog
        </Link>
      </div>
    )
  }

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

  // Helper function to process markdown bold syntax
  const processMarkdown = (text: string) => {
    const parts: (string | JSX.Element)[] = []
    let remaining = text
    let key = 0

    while (remaining.length > 0) {
      const boldMatch = remaining.match(/\*\*(.+?)\*\*/)
      if (boldMatch) {
        const beforeBold = remaining.substring(0, boldMatch.index)
        if (beforeBold) {
          parts.push(beforeBold)
        }
        parts.push(
          <strong key={`bold-${key++}`} className="text-white font-semibold">
            {boldMatch[1]}
          </strong>
        )
        remaining = remaining.substring((boldMatch.index || 0) + boldMatch[0].length)
      } else {
        parts.push(remaining)
        break
      }
    }

    return parts.length === 1 && typeof parts[0] === 'string' ? parts[0] : <>{parts}</>
  }

  const formatContent = (content: string) => {
    const lines = content.split('\n')
    const elements: JSX.Element[] = []
    let currentParagraph: string[] = []
    let inCodeBlock = false
    let codeBlockContent: string[] = []
    let listItems: string[] = []
    let numberedListItems: Array<{ num: number; text: string }> = []
    let listKey = 0
    let isNumberedList = false

    const flushParagraph = () => {
      if (currentParagraph.length > 0) {
        const text = currentParagraph.join(' ').trim()
        if (text) {
          elements.push(
            <p key={`p-${elements.length}`} className="mb-4 text-gray-200 leading-relaxed">
              {processMarkdown(text)}
            </p>
          )
        }
        currentParagraph = []
      }
    }

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`list-${listKey++}`} className="space-y-2 mb-4 ml-6 list-disc">
            {listItems.map((item, idx) => (
              <li key={idx} className="text-gray-200">
                {processMarkdown(item)}
              </li>
            ))}
          </ul>
        )
        listItems = []
      }
      if (numberedListItems.length > 0) {
        elements.push(
          <ol key={`numbered-${listKey++}`} className="space-y-2 mb-4 ml-6 list-decimal">
            {numberedListItems.map((item, idx) => (
              <li key={idx} className="text-gray-200">
                {processMarkdown(item.text)}
              </li>
            ))}
          </ol>
        )
        numberedListItems = []
        isNumberedList = false
      }
    }

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()

      // Code blocks
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          elements.push(
            <pre key={`code-${listKey++}`} className="bg-terminal-bg/50 p-4 rounded-lg mb-4 overflow-x-auto border border-hacker-green/20">
              <code className="text-hacker-green font-mono text-sm">
                {codeBlockContent.join('\n')}
              </code>
            </pre>
          )
          codeBlockContent = []
          inCodeBlock = false
        } else {
          flushParagraph()
          flushList()
          inCodeBlock = true
        }
        continue
      }

      if (inCodeBlock) {
        codeBlockContent.push(line)
        continue
      }

      // Headings
      if (line.startsWith('### ')) {
        flushParagraph()
        flushList()
        elements.push(
          <h3 key={`h3-${listKey++}`} className="text-xl font-bold text-white font-mono mb-3 mt-6">
            {processMarkdown(line.substring(4))}
          </h3>
        )
        continue
      }

      if (line.startsWith('## ')) {
        flushParagraph()
        flushList()
        elements.push(
          <h2 key={`h2-${listKey++}`} className="text-2xl font-bold text-white font-mono mb-4 mt-8">
            {processMarkdown(line.substring(3))}
          </h2>
        )
        continue
      }

      if (line.startsWith('# ')) {
        flushParagraph()
        flushList()
        elements.push(
          <h1 key={`h1-${listKey++}`} className="text-3xl font-bold text-white font-mono mb-6 mt-8">
            {processMarkdown(line.substring(2))}
          </h1>
        )
        continue
      }

      // Numbered list (check first to avoid conflicts)
      const numberedMatch = line.match(/^(\d+)\.\s+(.+)$/)
      if (numberedMatch) {
        flushParagraph()
        if (!isNumberedList && listItems.length > 0) {
          flushList()
        }
        isNumberedList = true
        numberedListItems.push({
          num: parseInt(numberedMatch[1]),
          text: numberedMatch[2]
        })
        continue
      }

      // Bullet list items
      if (line.startsWith('- ') || line.startsWith('* ')) {
        flushParagraph()
        if (isNumberedList && numberedListItems.length > 0) {
          flushList()
        }
        isNumberedList = false
        listItems.push(line.substring(2))
        continue
      }

      // Regular paragraph
      if (line) {
        flushList()
        currentParagraph.push(line)
      } else {
        flushParagraph()
        flushList()
      }
    }

    flushParagraph()
    flushList()

    return <>{elements}</>
  }

  return (
    <article className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-hacker-cyan hover:text-hacker-green font-mono transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Blog</span>
        </Link>

        {/* Header */}
        <ScrollAnimation delay={0}>
          <div className="mb-12">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1.5 bg-hacker-cyan/10 border border-hacker-cyan/30 text-hacker-cyan text-xs font-mono rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white font-mono mb-6">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 font-mono">
              <span className="flex items-center gap-2">
                <Calendar size={16} />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-2">
                <Clock size={16} />
                {calculateReadingTime(post.content)} min read
              </span>
              <span className="flex items-center gap-2">
                <Tag size={16} />
                {post.category}
              </span>
            </div>
          </div>
        </ScrollAnimation>

        {/* Content */}
        <ScrollAnimation delay={100}>
          <div className="terminal-window rounded-lg p-6 sm:p-8 mb-8 prose prose-invert max-w-none">
            {formatContent(post.content)}
          </div>
        </ScrollAnimation>

        {/* Share Section */}
        <ScrollAnimation delay={200}>
          <div className="terminal-window rounded-lg p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Share2 className="text-hacker-green" size={20} />
              <h3 className="text-lg font-bold text-white font-mono">Share this article</h3>
            </div>
            <div className="flex gap-4">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-hacker-cyan/10 border border-hacker-cyan/30 text-hacker-cyan font-mono text-sm rounded hover:bg-hacker-cyan/20 transition-colors"
              >
                Twitter
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-hacker-cyan/10 border border-hacker-cyan/30 text-hacker-cyan font-mono text-sm rounded hover:bg-hacker-cyan/20 transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </ScrollAnimation>

        {/* Back to Blog */}
        <div className="text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-hacker-green hover:text-hacker-cyan font-mono transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Blog</span>
          </Link>
        </div>
      </div>
    </article>
  )
}
