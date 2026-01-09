'use client'

import { useState, useEffect, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { calculateAll } from './logic/photosynthesis'
import ProtectedRoute from './components/ProtectedRoute'
import HeroSection from './components/HeroSection'
import Sliders from './components/Sliders'
import { useTranslation } from './context/TranslationContext'
import { t } from './utils/translations'

// Lazy load heavy components for better initial load performance
const LiveEnvironmentPanel = dynamic(() => import('./components/LiveEnvironmentPanel'), {
  loading: () => <div className="h-64 bg-white/50 dark:bg-gray-800/50 rounded-xl animate-pulse" />,
})
const AnimatedPhotosynthesisSystem = dynamic(() => import('./components/AnimatedPhotosynthesisSystem'), {
  loading: () => <div className="h-96 bg-white/50 dark:bg-gray-800/50 rounded-xl animate-pulse" />,
})
const EcosystemActivity = dynamic(() => import('./components/EcosystemActivity'), {
  loading: () => <div className="h-64 bg-white/50 dark:bg-gray-800/50 rounded-xl animate-pulse" />,
})
const SummaryCards = dynamic(() => import('./components/SummaryCards'), {
  loading: () => <div className="h-48 bg-white/50 dark:bg-gray-800/50 rounded-xl animate-pulse" />,
})
const BadgesSummary = dynamic(() => import('./components/BadgesSummary'), {
  loading: () => <div className="h-48 bg-white/50 dark:bg-gray-800/50 rounded-xl animate-pulse" />,
})
const MyPlantCard = dynamic(() => import('./components/MyPlantCard'), {
  loading: () => <div className="h-64 bg-white/50 dark:bg-gray-800/50 rounded-xl animate-pulse" />,
})
const Footer = dynamic(() => import('./components/Footer'), {
  ssr: false, // Footer doesn't need SSR
})

export default function Home() {
  // State for controls
  const [sunlight, setSunlight] = useState(50)
  const [co2, setCo2] = useState(50)
  const [temperature, setTemperature] = useState(25)

  // Environment data from Live Environment Panel
  const [environment, setEnvironment] = useState(null)

  // Calculated values - initialize with default to avoid blocking render
  const [data, setData] = useState(() => calculateAll(50, 50, 25, null))

  // UI state
  const { language } = useTranslation()
  const [tip, setTip] = useState('')
  const [showTip, setShowTip] = useState(false)

  // Handle environment changes from LiveEnvironmentPanel
  const handleEnvironmentChange = (envData) => {
    setEnvironment(envData)
  }

  // Calculate data whenever controls or environment change (optimized)
  useEffect(() => {
    // Use requestAnimationFrame to batch updates for better performance
    const frameId = requestAnimationFrame(() => {
      const result = calculateAll(sunlight, co2, temperature, environment)
      setData(result)
      
      // Update PhotoBot context
      const event = new CustomEvent('photobot-context-update', {
        detail: {
          sunlight,
          co2,
          temperature,
          photosynthesisRate: result.photosynthesisRate,
          oxygen: result.oxygen,
          plantHealth: result.plantHealth,
        }
      })
      window.dispatchEvent(event)
    })

    // Debounce localStorage writes (only save after 500ms of no changes)
    const timeoutId = setTimeout(() => {
      if (typeof window !== 'undefined') {
        try {
          const result = calculateAll(sunlight, co2, temperature, environment)
          localStorage.setItem('simulationContext', JSON.stringify({
            sunlight,
            co2,
            temperature,
            photosynthesisRate: result.photosynthesisRate,
            oxygen: result.oxygen,
            plantHealth: result.plantHealth,
            environment,
          }))
        } catch (e) {
          // localStorage not available
        }
      }
    }, 500)

    return () => {
      cancelAnimationFrame(frameId)
      clearTimeout(timeoutId)
    }
  }, [sunlight, co2, temperature, environment])

  // Show tips when sliders change
  useEffect(() => {
    if (data) {
      let newTip = ''
      if (sunlight > 70) {
        newTip = t('home.moreSunlight', language)
      } else if (sunlight < 30) {
        newTip = t('home.lessSunlight', language)
      } else if (co2 > 70) {
        newTip = t('home.highCO2', language)
      } else if (temperature > 40) {
        newTip = t('home.highTemp', language)
      } else if (temperature < 15) {
        newTip = t('home.lowTemp', language)
      }

      if (newTip) {
        setTip(newTip)
        setShowTip(true)
        const timer = setTimeout(() => setShowTip(false), 3000)
        return () => clearTimeout(timer)
      }
    }
  }, [sunlight, co2, temperature, data, language])


  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-cyan-50 dark:from-gray-900 dark:via-green-900 dark:to-emerald-900">
        {/* Hero Section - Immediately below Navbar */}
        <HeroSection language={language} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 md:space-y-12 pb-8 md:pb-12">
          {/* My Plant Card - Near Hero Section */}
          <section>
            <MyPlantCard />
          </section>

          {/* Control Panel */}
          <section id="simulation" className="scroll-mt-24">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
              {t('home.controlPanel', language)}
            </h2>
            <Sliders
              sunlight={sunlight}
              co2={co2}
              temperature={temperature}
              onSunlightChange={setSunlight}
              onCo2Change={setCo2}
              onTemperatureChange={setTemperature}
            />
          </section>

          {/* Live Environment Panel */}
          <LiveEnvironmentPanel onEnvironmentChange={handleEnvironmentChange} />

          {/* Animated Photosynthesis System */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
              {t('home.animatedPhotosynthesis', language)}
            </h2>
            <div className="glass rounded-3xl p-6 md:p-8 border-2 border-emerald-500/20 shadow-xl">
              <AnimatedPhotosynthesisSystem />
            </div>
          </section>

          {/* Ecosystem Activity */}
          <section>
            <EcosystemActivity data={data} language={language} />
          </section>
          <section>
            <SummaryCards data={data} language={language} />
          </section>

          {/* Badges Summary */}
          <section>
            <BadgesSummary language={language} />
          </section>
        </div>

        {/* Floating Tip */}
        <AnimatePresence>
          {showTip && tip && (
            <motion.div
              initial={{ opacity: 0, y: 20, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, y: 20, x: '-50%' }}
              className="fixed bottom-24 left-1/2 z-30 glass rounded-xl px-6 py-3 border-2 border-green-500/30 shadow-xl"
            >
              <p className="text-sm font-semibold text-green-700 dark:text-green-400">
                💡 {tip}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <Footer />
      </main>
    </ProtectedRoute>
  )
}
