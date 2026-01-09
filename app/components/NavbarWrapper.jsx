'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useAuth } from '../context/AuthContext'
import { useTranslation } from '../context/TranslationContext'
import Navbar from './Navbar'

export default function NavbarWrapper() {
  const [darkMode, setDarkMode] = useState(false)
  const { language, setLanguage } = useTranslation()
  const { user } = useAuth()
  const pathname = usePathname()

  // Hide navbar on login/signup pages
  const hideNavbar = pathname === '/login' || pathname === '/signup' || pathname === '/forgot-password'

  useEffect(() => {
    // Load preferences only on client side
    if (typeof window === 'undefined') return
    
    try {
      const savedDarkMode = localStorage.getItem('darkMode')
      if (savedDarkMode === 'true') {
        setDarkMode(true)
        document.documentElement.classList.add('dark')
      } else {
        // Ensure light mode is set
        document.documentElement.classList.remove('dark')
      }
    } catch (e) {
      // localStorage not available
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    
    // Save to localStorage (non-blocking)
    try {
      localStorage.setItem('darkMode', darkMode ? 'true' : 'false')
    } catch (e) {
      // localStorage not available
    }
  }, [darkMode])

  if (hideNavbar) {
    return null
  }

  return (
    <Navbar
      language={language}
      onLanguageChange={setLanguage}
      darkMode={darkMode}
      onDarkModeToggle={() => setDarkMode(!darkMode)}
      user={user}
    />
  )
}

