'use client'

import { ArrowLeft, Shield, Calendar, MapPin, User, Tag, ExternalLink, AlertTriangle, FileText } from 'lucide-react'
import { CaseStudy } from '@/data/caseStudies'
import ScrollAnimation from './ScrollAnimation'
import CodeSnippet from './CodeSnippet'

interface CaseStudyDetailProps {
  caseStudy: CaseStudy
  onBack: () => void
}

// Function to format text with lists and bold headings
function formatTextWithLists(text: string) {
  const lines = text.split('\n')
  const elements: JSX.Element[] = []
  let currentList: string[] = []
  let currentNumberedList: Array<{ num: string; text: string }> = []
  let currentParagraph: string[] = []
  let listKey = 0

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const paragraphText = currentParagraph.join(' ').trim()
      if (paragraphText) {
        elements.push(
          <p key={`p-${elements.length}`} className="mb-4">
            {paragraphText}
          </p>
        )
      }
      currentParagraph = []
    }
  }

  const flushBulletList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`list-${listKey++}`} className="space-y-2 mb-4 ml-4">
          {currentList.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="text-hacker-green font-mono mt-1 flex-shrink-0">•</span>
              <span className="text-gray-200 flex-1">{item.trim()}</span>
            </li>
          ))}
        </ul>
      )
      currentList = []
    }
  }

  const flushNumberedList = () => {
    if (currentNumberedList.length > 0) {
      elements.push(
        <div key={`numbered-${listKey++}`} className="space-y-3 mb-4">
          {currentNumberedList.map((item, idx) => {
            const parts = item.text.split(':')
            const hasHeading = parts.length > 1 && parts[0].length < 50
            const itemNumber = parseInt(item.num) || (idx + 1)
            return (
              <div key={idx} className="flex items-start gap-3">
                <span className="text-hacker-green font-mono mt-1 flex-shrink-0">{itemNumber}.</span>
                <span className="text-gray-200 flex-1">
                  {hasHeading ? (
                    <>
                      <strong className="text-white font-semibold">{parts[0].trim()}:</strong>
                      <span className="ml-2">{parts.slice(1).join(':').trim()}</span>
                    </>
                  ) : (
                    item.text.trim()
                  )}
                </span>
              </div>
            )
          })}
        </div>
      )
      currentNumberedList = []
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    
    // Check for bullet list item (starts with -)
    if (line.startsWith('- ')) {
      flushParagraph()
      flushNumberedList()
      currentList.push(line.substring(2))
      continue
    }
    
    // Check for numbered list item (starts with number.)
    const numberedMatch = line.match(/^(\d+)\.\s+(.+)$/)
    if (numberedMatch) {
      flushParagraph()
      flushBulletList()
      currentNumberedList.push({ num: numberedMatch[1], text: numberedMatch[2] })
      continue
    }
    
    // Check for subheading (ends with colon, short line, not a URL)
    if (line.endsWith(':') && line.length < 80 && !line.includes('http') && !line.includes('@')) {
      flushParagraph()
      flushBulletList()
      flushNumberedList()
      elements.push(
        <h3 key={`subheading-${listKey++}`} className="text-lg font-bold text-white font-mono mb-3 mt-4">
          {line}
        </h3>
      )
      continue
    }
    
    // Regular paragraph text
    if (line) {
      flushBulletList()
      flushNumberedList()
      currentParagraph.push(line)
    } else {
      // Empty line - flush all
      flushParagraph()
      flushBulletList()
      flushNumberedList()
    }
  }

  // Flush remaining
  flushParagraph()
  flushBulletList()
  flushNumberedList()

  return <>{elements}</>
}

export default function CaseStudyDetail({ caseStudy, onBack }: CaseStudyDetailProps) {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-hacker-cyan hover:text-hacker-green font-mono transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Case Studies</span>
        </button>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-hacker-purple/10 rounded-lg">
              <Shield className="text-hacker-purple" size={28} />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-mono mb-4 break-words">
                {caseStudy.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm sm:text-base text-gray-400 mb-4">
                <span className="flex items-center gap-2">
                  <User size={16} />
                  {caseStudy.author}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar size={16} />
                  {caseStudy.date}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin size={16} />
                  {caseStudy.location}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 bg-hacker-purple/10 border border-hacker-purple/30 text-hacker-purple text-xs font-mono rounded">
                  {caseStudy.category}
                </span>
                {caseStudy.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-hacker-cyan/10 border border-hacker-cyan/40 text-hacker-cyan text-xs font-mono rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <ScrollAnimation delay={0}>
          <div className="terminal-window rounded-lg p-6 sm:p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="text-hacker-green" size={24} />
              <h2 className="text-2xl font-bold text-white font-mono">Executive Summary</h2>
            </div>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-200 leading-relaxed whitespace-pre-line">
                {caseStudy.executiveSummary}
              </p>
            </div>
          </div>
        </ScrollAnimation>

        {/* Introduction */}
        <ScrollAnimation delay={100}>
          <div className="terminal-window rounded-lg p-6 sm:p-8 mb-8">
            <h2 className="text-2xl font-bold text-white font-mono mb-4">Introduction</h2>
            <p className="text-gray-200 leading-relaxed whitespace-pre-line">
              {caseStudy.introduction}
            </p>
          </div>
        </ScrollAnimation>

        {/* Timeline */}
        <ScrollAnimation delay={200}>
          <div className="terminal-window rounded-lg p-6 sm:p-8 mb-8">
            <h2 className="text-2xl font-bold text-white font-mono mb-6">Timeline of Events</h2>
            <div className="space-y-4">
              {caseStudy.timeline.map((event, idx) => (
                <div key={idx} className="flex gap-4 pb-4 border-b border-hacker-green/20 last:border-0">
                  <div className="flex-shrink-0">
                    <div className="w-3 h-3 bg-hacker-green rounded-full mt-1.5"></div>
                  </div>
                  <div className="flex-1">
                    <div className="text-hacker-green font-mono text-sm mb-1">{event.date}</div>
                    <div className="text-gray-200">{event.event}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollAnimation>

        {/* Attack Narrative */}
        <ScrollAnimation delay={300}>
          <div className="terminal-window rounded-lg p-6 sm:p-8 mb-8">
            <h2 className="text-2xl font-bold text-white font-mono mb-4">Attack Narrative</h2>
            <p className="text-gray-200 leading-relaxed whitespace-pre-line">
              {caseStudy.attackNarrative}
            </p>
          </div>
        </ScrollAnimation>

        {/* Detection and Response Strategy */}
        <ScrollAnimation delay={400}>
          <div className="terminal-window rounded-lg p-6 sm:p-8 mb-8">
            <h2 className="text-2xl font-bold text-white font-mono mb-4">Detection and Response Strategy</h2>
            <div className="text-gray-200 leading-relaxed">
              {formatTextWithLists(caseStudy.detectionStrategy)}
            </div>
          </div>
        </ScrollAnimation>

        {/* Tools and Techniques */}
        <ScrollAnimation delay={500}>
          <div className="terminal-window rounded-lg p-6 sm:p-8 mb-8">
            <h2 className="text-2xl font-bold text-white font-mono mb-4">Tools and Techniques Used</h2>
            <ul className="space-y-3">
              {caseStudy.toolsAndTechniques.map((tool, idx) => {
                const parts = tool.split(':')
                const hasHeading = parts.length > 1 && parts[0].length < 80
                return (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-hacker-green font-mono mt-1">•</span>
                    <span className="text-gray-200 flex-1">
                      {hasHeading ? (
                        <>
                          <strong className="text-white font-semibold">{parts[0].trim()}:</strong>
                          <span className="ml-2">{parts.slice(1).join(':').trim()}</span>
                        </>
                      ) : (
                        tool
                      )}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
        </ScrollAnimation>

        {/* Affected Endpoints */}
        {caseStudy.affectedEndpoints && caseStudy.affectedEndpoints.length > 0 && (
          <ScrollAnimation delay={550}>
            <div className="terminal-window rounded-lg p-6 sm:p-8 mb-8">
              <h2 className="text-2xl font-bold text-white font-mono mb-4">Affected Endpoints</h2>
              <ul className="space-y-2">
                {caseStudy.affectedEndpoints.map((endpoint, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-hacker-green font-mono mt-1 flex-shrink-0">•</span>
                    <code className="text-gray-200 flex-1 font-mono text-sm break-all bg-terminal-bg/50 px-2 py-1 rounded">
                      {endpoint}
                    </code>
                  </li>
                ))}
              </ul>
              {caseStudy.exploitedParameters && caseStudy.exploitedParameters.length > 0 && (
                <div className="mt-6 pt-6 border-t border-hacker-green/30">
                  <h3 className="text-lg font-bold text-white font-mono mb-3">Exploited Parameters</h3>
                  <ul className="space-y-2">
                    {caseStudy.exploitedParameters.map((param, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-hacker-cyan font-mono mt-1 flex-shrink-0">•</span>
                        <code className="text-gray-200 flex-1 font-mono text-sm">
                          {param}
                        </code>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </ScrollAnimation>
        )}

        {/* Threat Intelligence */}
        <ScrollAnimation delay={600}>
          <div className="terminal-window rounded-lg p-6 sm:p-8 mb-8">
            <h2 className="text-2xl font-bold text-white font-mono mb-6">Threat Intelligence Summary</h2>
            <div className="space-y-6">
              {caseStudy.threatIntelligence.claimedName && (
                <div>
                  <h3 className="text-lg font-semibold text-hacker-green font-mono mb-2">Claimed Identity</h3>
                  <div className="grid sm:grid-cols-2 gap-3 text-sm">
                    {caseStudy.threatIntelligence.claimedName && (
                      <div>
                        <span className="text-gray-400">Name:</span>
                        <span className="text-gray-200 ml-2 font-mono">{caseStudy.threatIntelligence.claimedName}</span>
                      </div>
                    )}
                    {caseStudy.threatIntelligence.claimedDOB && (
                      <div>
                        <span className="text-gray-400">DOB:</span>
                        <span className="text-gray-200 ml-2 font-mono">{caseStudy.threatIntelligence.claimedDOB}</span>
                      </div>
                    )}
                    {caseStudy.threatIntelligence.claimedAddress && (
                      <div className="sm:col-span-2">
                        <span className="text-gray-400">Address:</span>
                        <span className="text-gray-200 ml-2 font-mono">{caseStudy.threatIntelligence.claimedAddress}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {caseStudy.threatIntelligence.phoneNumbers && caseStudy.threatIntelligence.phoneNumbers.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-hacker-green font-mono mb-2">Phone Numbers</h3>
                  <div className="flex flex-wrap gap-2">
                    {caseStudy.threatIntelligence.phoneNumbers.map((phone, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-hacker-cyan/10 border border-hacker-cyan/40 text-hacker-cyan text-xs font-mono rounded">
                        {phone}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {caseStudy.threatIntelligence.upiIds && caseStudy.threatIntelligence.upiIds.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-hacker-green font-mono mb-2">UPI IDs</h3>
                  <div className="flex flex-wrap gap-2">
                    {caseStudy.threatIntelligence.upiIds.map((upi, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-hacker-pink/10 border border-hacker-pink/40 text-hacker-pink text-xs font-mono rounded break-all">
                        {upi}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {caseStudy.threatIntelligence.deviceMetadata && (
                <div>
                  <h3 className="text-lg font-semibold text-hacker-green font-mono mb-2">Device Metadata</h3>
                  <div className="grid sm:grid-cols-2 gap-3 text-sm font-mono">
                    {caseStudy.threatIntelligence.deviceMetadata.ip && (
                      <div>
                        <span className="text-gray-400">IP Address:</span>
                        <span className="text-gray-200 ml-2">{caseStudy.threatIntelligence.deviceMetadata.ip}</span>
                      </div>
                    )}
                    {caseStudy.threatIntelligence.deviceMetadata.city && (
                      <div>
                        <span className="text-gray-400">City:</span>
                        <span className="text-gray-200 ml-2">{caseStudy.threatIntelligence.deviceMetadata.city}</span>
                      </div>
                    )}
                    {caseStudy.threatIntelligence.deviceMetadata.os && (
                      <div>
                        <span className="text-gray-400">OS:</span>
                        <span className="text-gray-200 ml-2">{caseStudy.threatIntelligence.deviceMetadata.os}</span>
                      </div>
                    )}
                    {caseStudy.threatIntelligence.deviceMetadata.browser && (
                      <div>
                        <span className="text-gray-400">Browser:</span>
                        <span className="text-gray-200 ml-2">{caseStudy.threatIntelligence.deviceMetadata.browser}</span>
                      </div>
                    )}
                    {caseStudy.threatIntelligence.deviceMetadata.gpu && (
                      <div>
                        <span className="text-gray-400">GPU:</span>
                        <span className="text-gray-200 ml-2">{caseStudy.threatIntelligence.deviceMetadata.gpu}</span>
                      </div>
                    )}
                    {caseStudy.threatIntelligence.deviceMetadata.resolution && (
                      <div>
                        <span className="text-gray-400">Resolution:</span>
                        <span className="text-gray-200 ml-2">{caseStudy.threatIntelligence.deviceMetadata.resolution}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </ScrollAnimation>

        {/* Legal Relevance */}
        {caseStudy.legalRelevance && caseStudy.legalRelevance.length > 0 && (
          <ScrollAnimation delay={700}>
            <div className="terminal-window rounded-lg p-6 sm:p-8 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="text-hacker-pink" size={24} />
                <h2 className="text-2xl font-bold text-white font-mono">Legal Relevance</h2>
              </div>
              <ul className="space-y-3">
                {caseStudy.legalRelevance.map((law, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-hacker-pink font-mono mt-1">§</span>
                    <span className="text-gray-200 flex-1 font-mono text-sm">{law}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollAnimation>
        )}

        {/* Societal Impact */}
        <ScrollAnimation delay={800}>
          <div className="terminal-window rounded-lg p-6 sm:p-8 mb-8">
            <h2 className="text-2xl font-bold text-white font-mono mb-4">Societal and National Impact</h2>
            <div className="text-gray-200 leading-relaxed">
              {formatTextWithLists(caseStudy.societalImpact)}
            </div>
          </div>
        </ScrollAnimation>

        {/* Professional Contribution */}
        <ScrollAnimation delay={900}>
          <div className="terminal-window rounded-lg p-6 sm:p-8 mb-8">
            <h2 className="text-2xl font-bold text-white font-mono mb-4">Professional Contribution</h2>
            <div className="text-gray-200 leading-relaxed">
              {formatTextWithLists(caseStudy.professionalContribution)}
            </div>
          </div>
        </ScrollAnimation>

        {/* Conclusion */}
        <ScrollAnimation delay={1000}>
          <div className="terminal-window rounded-lg p-6 sm:p-8 mb-8">
            <h2 className="text-2xl font-bold text-white font-mono mb-4">Conclusion</h2>
            <p className="text-gray-200 leading-relaxed whitespace-pre-line">
              {caseStudy.conclusion}
            </p>
          </div>
        </ScrollAnimation>

        {/* Appendices */}
        {caseStudy.appendices && caseStudy.appendices.length > 0 && (
          <ScrollAnimation delay={1100}>
            <div className="terminal-window rounded-lg p-6 sm:p-8 mb-8">
              <h2 className="text-2xl font-bold text-white font-mono mb-4">Appendices</h2>
              <ul className="space-y-2">
                {caseStudy.appendices.map((appendix, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-200">
                    <span className="text-hacker-green font-mono">•</span>
                    <span>{appendix}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollAnimation>
        )}

        {/* Back Button at Bottom */}
        <div className="mt-12">
          <button
            onClick={onBack}
            className="w-full sm:w-auto px-8 py-3 bg-hacker-green/10 border-2 border-hacker-green text-hacker-green font-mono rounded-lg hover:bg-hacker-green/20 transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft size={20} />
            <span>Back to Case Studies</span>
          </button>
        </div>
      </div>
    </section>
  )
}
