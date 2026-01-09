'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const TranslationContext = createContext(null)

export function TranslationProvider({ children }) {
  const [language, setLanguage] = useState('en')
  const [mounted, setMounted] = useState(false)

  // Mark component as mounted (client-side only)
  useEffect(() => {
    setMounted(true)
    // Load language preference only on client
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('language')
        if (saved) {
          setLanguage(saved)
        }
      } catch (e) {
        // localStorage not available
      }
    }
  }, [])

  useEffect(() => {
    // Only save to localStorage after mount and when language changes
    if (mounted && typeof window !== 'undefined') {
      try {
        localStorage.setItem('language', language)
      } catch (e) {
        // localStorage not available
      }
    }
  }, [language, mounted])

  return (
    <TranslationContext.Provider value={{ language, setLanguage }}>
      {children}
    </TranslationContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(TranslationContext)
  if (!context) {
    throw new Error('useTranslation must be used within TranslationProvider')
  }
  return context
}

