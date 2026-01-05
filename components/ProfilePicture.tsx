'use client'

import { useState } from 'react'
import Image from 'next/image'
import ScrollAnimation from './ScrollAnimation'

export default function ProfilePicture() {
  const [imageError, setImageError] = useState(false)

  return (
    <section className="pt-0 pb-6 px-4 sm:px-6 lg:px-8 relative z-0 -mt-16">
      <div className="max-w-4xl mx-auto relative z-0">
        <ScrollAnimation>
          <div className="flex justify-center relative z-0">
            <div className="relative group">
              {/* Outer glow ring */}
              <div className="absolute -inset-2 bg-gradient-to-r from-hacker-green/20 via-hacker-cyan/20 to-hacker-purple/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-glow"></div>
              
              {/* Terminal-style border */}
              <div className="relative rounded-full p-1 bg-gradient-to-r from-hacker-green/50 via-hacker-cyan/50 to-hacker-purple/50">
                {/* Inner border with scanline effect */}
                <div className="relative rounded-full overflow-hidden bg-terminal-bg p-1">
                  {/* Scanline overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-hacker-green/10 to-transparent opacity-50 pointer-events-none animate-scanline"></div>
                  
                  {/* Profile image */}
                  <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-hacker-green/30">
                    {!imageError ? (
                      <Image
                        src="/profile.jpg"
                        alt="Muni Nitish Kumar Yaddala - Security Engineer"
                        fill
                        className="object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500 scale-125"
                        style={{ objectPosition: 'center 40%' }}
                        priority
                        sizes="(max-width: 640px) 224px, (max-width: 768px) 256px, 320px"
                        onError={() => setImageError(true)}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-hacker-green/10 to-hacker-cyan/10">
                        <span className="text-hacker-green font-mono text-4xl font-bold">NY</span>
                      </div>
                    )}
                    {/* Subtle overlay for terminal effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-hacker-green/5 via-transparent to-hacker-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>
              </div>
              
              {/* Corner brackets (terminal style) */}
              <div className="absolute -top-2 -left-2 text-hacker-green/60 font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                {'<'}
              </div>
              <div className="absolute -top-2 -right-2 text-hacker-green/60 font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                {'>'}
              </div>
              <div className="absolute -bottom-2 -left-2 text-hacker-cyan/60 font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                {'</'}
              </div>
              <div className="absolute -bottom-2 -right-2 text-hacker-cyan/60 font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                {'>'}
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
