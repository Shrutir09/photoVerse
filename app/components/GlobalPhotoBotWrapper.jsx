'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import GlobalPhotoBot from './GlobalPhotoBot'

// This wrapper provides context data to PhotoBot based on current page
export default function GlobalPhotoBotWrapper() {
  const pathname = usePathname()
  const [context, setContext] = useState({
    sunlight: 50,
    co2: 50,
    temperature: 25,
    photosynthesisRate: 0,
    oxygen: 0,
    plantHealth: null,
  })
  const [language, setLanguage] = useState('en')

  useEffect(() => {
    // Load language preference only on client
    if (typeof window === 'undefined') return
    
    try {
      const saved = localStorage.getItem('language')
      if (saved) setLanguage(saved)
    } catch (e) {
      // localStorage not available
    }
  }, [])

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return
    
    // Try to get context from localStorage (set by pages with simulation)
    // Use requestIdleCallback for non-critical operation
    const loadContext = () => {
      try {
        const savedContext = localStorage.getItem('simulationContext')
        if (savedContext) {
          setContext(JSON.parse(savedContext))
        }
      } catch (e) {
        // Invalid context or localStorage not available
      }
    }

    if ('requestIdleCallback' in window) {
      requestIdleCallback(loadContext, { timeout: 1000 })
    } else {
      // Fallback: use setTimeout
      setTimeout(loadContext, 0)
    }
  }, [pathname])

  // Listen for context updates from pages
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const handleContextUpdate = (e) => {
      if (e.detail && typeof e.detail === 'object') {
        setContext(prev => {
          const newContext = { ...prev, ...e.detail }
          // Debounce localStorage writes
          setTimeout(() => {
            try {
              localStorage.setItem('simulationContext', JSON.stringify(newContext))
            } catch (e) {
              // localStorage not available
            }
          }, 300)
          return newContext
        })
      }
    }

    window.addEventListener('photobot-context-update', handleContextUpdate)
    return () => window.removeEventListener('photobot-context-update', handleContextUpdate)
  }, [])

  return (
    <GlobalPhotoBot
      sunlight={context.sunlight}
      co2={context.co2}
      temperature={context.temperature}
      photosynthesisRate={context.photosynthesisRate}
      oxygen={context.oxygen}
      plantHealth={context.plantHealth}
      language={language}
    />
  )
}

