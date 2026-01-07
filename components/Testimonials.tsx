'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Quote, Linkedin, ChevronLeft, ChevronRight } from 'lucide-react'
import { resumeData } from '@/data/resume'
import ScrollAnimation from './ScrollAnimation'

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const testimonials = resumeData.testimonials || []

  if (testimonials.length === 0) {
    return null
  }

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-heading text-4xl sm:text-5xl lg:text-6xl font-mono mb-6">
            <span className="text-hacker-green">{'>'}</span>{' '}
            <span className="text-white">Testimonials</span>
          </h2>
          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-hacker-green/60 to-transparent mx-auto"></div>
          <p className="text-gray-400 mt-6 font-mono text-sm">
            What colleagues and peers say about my work
          </p>
        </div>

        <ScrollAnimation delay={0}>
          <div className="terminal-window rounded-lg p-8 md:p-12 relative">
            {/* Quote Icon */}
            <div className="absolute top-6 right-6 opacity-20">
              <Quote className="text-hacker-green" size={48} />
            </div>

            {/* Testimonial Content */}
            <div className="relative z-10">
              <blockquote className="text-xl md:text-2xl text-gray-200 leading-relaxed mb-8 font-mono italic">
                &ldquo;{currentTestimonial.text}&rdquo;
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-hacker-green/20 to-hacker-cyan/20 flex items-center justify-center border-2 border-hacker-green/30 overflow-hidden">
                    {currentTestimonial.avatar ? (
                      <Image
                        src={currentTestimonial.avatar}
                        alt={currentTestimonial.name}
                        width={64}
                        height={64}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-hacker-green font-mono font-bold text-xl">
                        {currentTestimonial.name.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div>
                    <div className="text-white font-mono font-semibold text-lg">
                      {currentTestimonial.name}
                    </div>
                    <div className="text-gray-400 font-mono text-sm">
                      {currentTestimonial.role}
                      {currentTestimonial.company && ` at ${currentTestimonial.company}`}
                    </div>
                  </div>
                </div>

                {currentTestimonial.linkedin && currentTestimonial.linkedin !== '#' && (
                  <a
                    href={currentTestimonial.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-hacker-cyan hover:text-hacker-green transition-colors"
                    aria-label={`View ${currentTestimonial.name}'s LinkedIn`}
                  >
                    <Linkedin size={24} />
                  </a>
                )}
              </div>
            </div>

            {/* Navigation Controls */}
            {testimonials.length > 1 && (
              <>
                <div className="flex items-center justify-center gap-4 mt-8">
                  <button
                    onClick={prevTestimonial}
                    className="p-2 rounded-lg bg-terminal-bg/50 border border-hacker-green/30 text-hacker-green hover:bg-hacker-green/10 transition-colors"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  {/* Dots Indicator */}
                  <div className="flex gap-2">
                    {testimonials.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => goToTestimonial(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          idx === currentIndex
                            ? 'bg-hacker-green w-8'
                            : 'bg-gray-600 hover:bg-gray-500'
                        }`}
                        aria-label={`Go to testimonial ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={nextTestimonial}
                    className="p-2 rounded-lg bg-terminal-bg/50 border border-hacker-green/30 text-hacker-green hover:bg-hacker-green/10 transition-colors"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>

                {/* Testimonial Counter */}
                <div className="text-center mt-4 text-gray-400 font-mono text-sm">
                  {currentIndex + 1} / {testimonials.length}
                </div>
              </>
            )}
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
