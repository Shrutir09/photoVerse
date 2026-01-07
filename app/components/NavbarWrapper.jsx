'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useAuth } from '../context/AuthContext'
import Navbar from './Navbar'

export default function NavbarWrapper() {
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState('en')
  const { user } = useAuth()
  const pathname = usePathname()

  // Hide navbar on login/signup pages
  const hideNavbar = pathname === '/login' || pathname === '/signup' || pathname === '/forgot-password'

  useEffect(() => {
    // Load preferences
    const savedDarkMode = localStorage.getItem('darkMode')
    if (savedDarkMode === 'true') {
      setDarkMode(true)
      document.documentElement.classList.add('dark')
    }

    const savedLanguage = localStorage.getItem('language')
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('darkMode', 'true')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('darkMode', 'false')
    }
  }, [darkMode])

  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

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

