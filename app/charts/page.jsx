'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ProtectedRoute from '../components/ProtectedRoute'
import { calculateAll } from '../logic/photosynthesis'
import Charts from '../components/Charts'
import Sliders from '../components/Sliders'
import Footer from '../components/Footer'
import { useTranslation } from '../context/TranslationContext'
import { t } from '../utils/translations'

export default function ChartsPage() {
  const { language } = useTranslation()
  const [sunlight, setSunlight] = useState(50)
  const [co2, setCo2] = useState(50)
  const [temperature, setTemperature] = useState(25)
  const [dataHistory, setDataHistory] = useState([])

  useEffect(() => {
    const result = calculateAll(sunlight, co2, temperature)
    const newEntry = {
      time: new Date().toLocaleTimeString(),
      rate: result.photosynthesisRate,
      oxygen: result.oxygen,
    }
    setDataHistory((prev) => {
      const updated = [...prev, newEntry]
      return updated.slice(-20)
    })
    
    // Update PhotoBot context
    const event = new CustomEvent('photobot-context-update', {
      detail: {
        sunlight,
        co2,
        temperature,
        photosynthesisRate: result.photosynthesisRate,
        oxygen: result.oxygen,
        plantHealth: result.plantHealth || { status: 'unknown' },
      }
    })
    window.dispatchEvent(event)
  }, [sunlight, co2, temperature])

  const currentData = dataHistory.length > 0 ? dataHistory[dataHistory.length - 1] : null

  return (
    <ProtectedRoute>
      <div className="min-h-screen p-4 md:p-6 bg-gradient-to-br from-green-50/90 via-emerald-50/70 to-cyan-50/80 dark:bg-chalkboard-bg">
        <div className="max-w-[1280px] mx-auto space-y-6 md:space-y-8">
          <motion.div 
            className="text-center mb-6 md:mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-green-500 bg-clip-text text-transparent mb-3 md:mb-4 font-sans">
              📊 {t('charts.title', language)}
            </h1>
            <p className="text-base md:text-lg text-gray-500 dark:text-chalk-secondary max-w-2xl mx-auto">
              {t('charts.title', language)}
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Compact Environment Stats Card - Left Side */}
            <div className="lg:col-span-1">
              <Sliders
                sunlight={sunlight}
                co2={co2}
                temperature={temperature}
                onSunlightChange={setSunlight}
                onCo2Change={setCo2}
                onTemperatureChange={setTemperature}
              />
            </div>

            {/* Dominant Chart Cards - Right Side */}
            <div className="lg:col-span-4">
              {dataHistory.length > 0 && (
                <Charts 
                  dataHistory={dataHistory} 
                  currentData={currentData}
                  sunlight={sunlight}
                  co2={co2}
                  temperature={temperature}
                />
              )}
            </div>
          </motion.div>
        </div>
        <Footer />
      </div>
    </ProtectedRoute>
  )
}

