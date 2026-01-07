'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Github, Calendar, Code } from 'lucide-react'
import { resumeData } from '@/data/resume'
import ScrollAnimation from '@/components/ScrollAnimation'
import CodeSnippet from '@/components/CodeSnippet'

interface ProjectDetailPageProps {
  params: {
    slug: string
  }
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const [project, setProject] = useState(
    resumeData.projects.find(p => 
      p.name.toLowerCase().replace(/\s+/g, '-') === params.slug
    )
  )

  useEffect(() => {
    setProject(
      resumeData.projects.find(p => 
        p.name.toLowerCase().replace(/\s+/g, '-') === params.slug
      )
    )
  }, [params.slug])

  if (!project) {
    return (
      <div className="py-24 px-4 text-center">
        <h1 className="text-2xl font-bold text-white font-mono mb-4">Project Not Found</h1>
        <Link href="/#projects" className="text-hacker-green hover:text-hacker-cyan font-mono">
          Back to Projects
        </Link>
      </div>
    )
  }

  return (
    <article className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/#projects"
          className="mb-8 inline-flex items-center gap-2 text-hacker-cyan hover:text-hacker-green font-mono transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Projects</span>
        </Link>

        {/* Header */}
        <ScrollAnimation delay={0}>
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-white font-mono mb-6">
              {project.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 font-mono mb-6">
              <span className="flex items-center gap-2">
                <Calendar size={16} />
                {project.period}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 bg-hacker-cyan/10 border border-hacker-cyan/30 text-hacker-cyan text-xs font-mono rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </ScrollAnimation>

        {/* Description */}
        <ScrollAnimation delay={100}>
          <div className="terminal-window rounded-lg p-6 sm:p-8 mb-8">
            <h2 className="text-2xl font-bold text-white font-mono mb-4 flex items-center gap-3">
              <Code className="text-hacker-green" size={24} />
              Project Overview
            </h2>
            <div className="space-y-4">
              {project.description.map((desc, idx) => (
                <p key={idx} className="text-gray-200 leading-relaxed">
                  {desc}
                </p>
              ))}
            </div>
          </div>
        </ScrollAnimation>

        {/* Technical Details */}
        <ScrollAnimation delay={200}>
          <div className="terminal-window rounded-lg p-6 sm:p-8 mb-8">
            <h2 className="text-2xl font-bold text-white font-mono mb-4">Technologies Used</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {project.tech.map((tech, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-3 rounded-lg bg-terminal-bg/50 border border-hacker-green/20"
                >
                  <span className="text-hacker-green font-mono">▸</span>
                  <span className="text-gray-200 font-mono text-sm">{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollAnimation>

        {/* Back to Projects */}
        <div className="text-center">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-hacker-green hover:text-hacker-cyan font-mono transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Projects</span>
          </Link>
        </div>
      </div>
    </article>
  )
}
