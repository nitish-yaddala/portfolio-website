'use client'

interface SkeletonLoaderProps {
  className?: string
  variant?: 'text' | 'card' | 'circle' | 'line'
  width?: string
  height?: string
  count?: number
}

export default function SkeletonLoader({ 
  className = '', 
  variant = 'line',
  width,
  height,
  count = 1
}: SkeletonLoaderProps) {
  const baseClasses = 'animate-pulse bg-gradient-to-r from-terminal-border/20 via-terminal-border/10 to-terminal-border/20 bg-[length:200%_100%] animate-shimmer'
  
  const variantClasses = {
    text: 'rounded h-4',
    card: 'rounded-lg h-32',
    circle: 'rounded-full',
    line: 'rounded h-3',
  }

  const style: React.CSSProperties = {}
  if (width) style.width = width
  if (height) style.height = height || (variant === 'circle' ? width : undefined)

  if (count > 1) {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: count }).map((_, idx) => (
          <div
            key={idx}
            className={`${baseClasses} ${variantClasses[variant]}`}
            style={style}
            aria-hidden="true"
          />
        ))}
      </div>
    )
  }

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
      aria-hidden="true"
    />
  )
}
