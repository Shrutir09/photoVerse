'use client'

import ProtectedRoute from '../components/ProtectedRoute'
import ArticleCards from '../components/ArticleCards'
import AnimatedFormula from '../components/AnimatedFormula'
import PhotosynthesisProcess from '../components/PhotosynthesisProcess'
import ActivityCards from '../components/ActivityCards'
import Footer from '../components/Footer'
import { useState, useEffect } from 'react'

export default function LearnPage() {
  const [language, setLanguage] = useState('en')

  useEffect(() => {
    const saved = localStorage.getItem('language')
    if (saved) setLanguage(saved)
  }, [])

  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  return (
    <ProtectedRoute>
      <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-green-50 via-emerald-50 to-cyan-50 dark:bg-chalkboard-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 md:space-y-16 pb-12">
          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent mb-4 md:mb-6">
              🧬 Photosynthesis & Environment Learning Hub
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-chalk-secondary max-w-3xl mx-auto">
              An interactive science lab to understand how plants, air, and ecosystems work
            </p>
          </div>

          {/* Section 1: Articles & Reading */}
          <section>
            <ArticleCards language={language} />
          </section>

          {/* Section 2: Animated Photosynthesis Formula */}
          <section>
            <AnimatedFormula language={language} />
          </section>

          {/* Section 3: Photosynthesis Process */}
          <section>
            <PhotosynthesisProcess language={language} />
          </section>

          {/* Section 4: Activities & Experiments */}
          <section>
            <ActivityCards language={language} />
          </section>
        </div>
      </div>
      <Footer />
    </ProtectedRoute>
  )
}

