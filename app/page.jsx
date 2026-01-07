'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { calculateAll } from './logic/photosynthesis'
import ProtectedRoute from './components/ProtectedRoute'
import HeroSection from './components/HeroSection'
import Sliders from './components/Sliders'
import LiveEnvironmentPanel from './components/LiveEnvironmentPanel'
import AnimatedPhotosynthesisSystem from './components/AnimatedPhotosynthesisSystem'
import OxygenMeter from './components/OxygenMeter'
import EcosystemActivity from './components/EcosystemActivity'
import SummaryCards from './components/SummaryCards'
import BadgesSummary from './components/BadgesSummary'
import Footer from './components/Footer'

export default function Home() {
  // State for controls
  const [sunlight, setSunlight] = useState(50)
  const [co2, setCo2] = useState(50)
  const [temperature, setTemperature] = useState(25)

  // Environment data from Live Environment Panel
  const [environment, setEnvironment] = useState(null)

  // Calculated values
  const [data, setData] = useState(null)

  // UI state
  const [language, setLanguage] = useState('en')
  const [tip, setTip] = useState('')
  const [showTip, setShowTip] = useState(false)

  // Handle environment changes from LiveEnvironmentPanel
  const handleEnvironmentChange = (envData) => {
    setEnvironment(envData)
  }

  // Calculate data whenever controls or environment change
  useEffect(() => {
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
    localStorage.setItem('simulationContext', JSON.stringify({
      sunlight,
      co2,
      temperature,
      photosynthesisRate: result.photosynthesisRate,
      oxygen: result.oxygen,
      plantHealth: result.plantHealth,
      environment,
    }))
  }, [sunlight, co2, temperature, environment])

  // Load language preference
  useEffect(() => {
    const saved = localStorage.getItem('language')
    if (saved) setLanguage(saved)
  }, [])

  // Show tips when sliders change
  useEffect(() => {
    if (data) {
      let newTip = ''
      if (sunlight > 70) {
        newTip = language === 'hi' ? 'अधिक सूरज की रोशनी → अधिक ऑक्सीजन' : 'More sunlight → more oxygen'
      } else if (sunlight < 30) {
        newTip = language === 'hi' ? 'कम सूरज की रोशनी → धीमी वृद्धि' : 'Less sunlight → slower growth'
      } else if (co2 > 70) {
        newTip = language === 'hi' ? 'उच्च CO₂ → तेज़ प्रकाश संश्लेषण' : 'High CO₂ → faster photosynthesis'
      } else if (temperature > 40) {
        newTip = language === 'hi' ? 'उच्च तापमान → कम दक्षता' : 'High temperature → lower efficiency'
      } else if (temperature < 15) {
        newTip = language === 'hi' ? 'कम तापमान → धीमी प्रक्रिया' : 'Low temperature → slower process'
      }

      if (newTip) {
        setTip(newTip)
        setShowTip(true)
        const timer = setTimeout(() => setShowTip(false), 3000)
        return () => clearTimeout(timer)
      }
    }
  }, [sunlight, co2, temperature, data, language])

  if (!data) {
    return (
      <ProtectedRoute>
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-cyan-50 dark:bg-chalkboard-bg">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-chalk-secondary">Loading...</p>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-cyan-50 dark:from-gray-900 dark:via-green-900 dark:to-emerald-900">
        {/* Hero Section - Immediately below Navbar */}
        <HeroSection language={language} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 md:space-y-12 pb-8 md:pb-12">

          {/* Control Panel */}
          <section id="simulation" className="scroll-mt-24">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
              🎛 Control Panel
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
              🌱 Animated Photosynthesis System
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
