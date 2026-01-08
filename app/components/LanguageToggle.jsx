'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function LanguageToggle({ language, onLanguageChange }) {
  const [isEnglish, setIsEnglish] = useState(language === 'en')

  useEffect(() => {
    setIsEnglish(language === 'en')
  }, [language])

  const toggleLanguage = () => {
    const newLang = isEnglish ? 'hi' : 'en'
    setIsEnglish(!isEnglish)
    onLanguageChange(newLang)
    localStorage.setItem('language', newLang)
  }

  return (
    <motion.button
      onClick={toggleLanguage}
      className="glass rounded-full p-2.5 text-xl font-bold hover:bg-green-500/10 transition-colors min-w-[3rem] flex items-center justify-center"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title={isEnglish ? 'हिंदी में बदलें' : 'Switch to English'}
    >
      {isEnglish ? 'A' : 'अ'}
    </motion.button>
  )
}
