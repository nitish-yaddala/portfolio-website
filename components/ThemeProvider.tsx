'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { Moon, Sun, Monitor } from 'lucide-react'

type Theme = 'dark' | 'light' | 'system'

interface ThemeContextType {
  theme: Theme
  resolvedTheme: 'dark' | 'light'
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')
  const [resolvedTheme, setResolvedTheme] = useState<'dark' | 'light'>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('theme') as Theme | null
    if (saved) {
      setTheme(saved)
    } else {
      // Detect system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setTheme('system')
      setResolvedTheme(prefersDark ? 'dark' : 'light')
    }
  }, [])

  useEffect(() => {
    if (!mounted) return

    let currentTheme: 'dark' | 'light' = 'dark'
    
    if (theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      currentTheme = prefersDark ? 'dark' : 'light'
    } else {
      currentTheme = theme
    }

    setResolvedTheme(currentTheme)
    document.documentElement.classList.remove('dark', 'light')
    document.documentElement.classList.add(currentTheme)
    localStorage.setItem('theme', theme)

    // Listen for system preference changes
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handleChange = (e: MediaQueryListEvent) => {
        setResolvedTheme(e.matches ? 'dark' : 'light')
        document.documentElement.classList.remove('dark', 'light')
        document.documentElement.classList.add(e.matches ? 'dark' : 'light')
      }
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
  }, [theme, mounted])

  const toggleTheme = () => {
    setTheme(prev => {
      if (prev === 'dark') return 'light'
      if (prev === 'light') return 'system'
      return 'dark'
    })
  }

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme()

  return (
    <div className="flex items-center gap-2 p-1 bg-terminal-bg/50 border border-hacker-green/30 rounded-lg">
      <button
        onClick={() => setTheme('dark')}
        className={`p-2 rounded transition-all ${
          theme === 'dark'
            ? 'bg-hacker-green/20 text-hacker-green'
            : 'text-gray-400 hover:text-hacker-green'
        }`}
        aria-label="Dark mode"
        title="Dark mode"
      >
        <Moon size={18} />
      </button>
      <button
        onClick={() => setTheme('light')}
        className={`p-2 rounded transition-all ${
          theme === 'light'
            ? 'bg-hacker-green/20 text-hacker-green'
            : 'text-gray-400 hover:text-hacker-green'
        }`}
        aria-label="Light mode"
        title="Light mode"
      >
        <Sun size={18} />
      </button>
      <button
        onClick={() => setTheme('system')}
        className={`p-2 rounded transition-all ${
          theme === 'system'
            ? 'bg-hacker-green/20 text-hacker-green'
            : 'text-gray-400 hover:text-hacker-green'
        }`}
        aria-label="System preference"
        title="System preference"
      >
        <Monitor size={18} />
      </button>
    </div>
  )
}
