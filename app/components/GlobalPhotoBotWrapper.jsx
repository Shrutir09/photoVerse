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
    // Load language preference
    const saved = localStorage.getItem('language')
    if (saved) setLanguage(saved)
  }, [])

  useEffect(() => {
    // Try to get context from localStorage (set by pages with simulation)
    const savedContext = localStorage.getItem('simulationContext')
    if (savedContext) {
      try {
        setContext(JSON.parse(savedContext))
      } catch (e) {
        // Invalid context
      }
    }
  }, [pathname])

  // Listen for context updates from pages
  useEffect(() => {
    const handleContextUpdate = (e) => {
      if (e.detail && typeof e.detail === 'object') {
        setContext(prev => ({ ...prev, ...e.detail }))
        localStorage.setItem('simulationContext', JSON.stringify({ ...context, ...e.detail }))
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

