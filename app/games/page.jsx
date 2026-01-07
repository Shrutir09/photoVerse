'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ProtectedRoute from '../components/ProtectedRoute'
import { calculateAll } from '../logic/photosynthesis'
import Sliders from '../components/Sliders'
import GameBalance from '../components/GameBalance'
import GameOxygen from '../components/GameOxygen'
import RewardsSystem from '../components/RewardsSystem'
import Footer from '../components/Footer'

export default function GamesPage() {
  const [sunlight, setSunlight] = useState(50)
  const [co2, setCo2] = useState(50)
  const [temperature, setTemperature] = useState(25)
  const [data, setData] = useState(null)
  const [gameWon, setGameWon] = useState(false)
  const [language, setLanguage] = useState('en')

  useEffect(() => {
    const result = calculateAll(sunlight, co2, temperature)
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
  }, [sunlight, co2, temperature])

  useEffect(() => {
    const saved = localStorage.getItem('language')
    if (saved) setLanguage(saved)
  }, [])

  return (
    <ProtectedRoute>
      <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-green-50 via-emerald-50 to-cyan-50 dark:bg-chalkboard-bg">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent mb-4">
            🎮 Educational Games
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Learn through interactive challenges
          </p>
        </div>

        {data && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <GameBalance
                sunlight={sunlight}
                co2={co2}
                temperature={temperature}
                onSunlightChange={setSunlight}
                onCo2Change={setCo2}
                onTemperatureChange={setTemperature}
                photosynthesisRate={data.photosynthesisRate}
              />

              <GameOxygen
                sunlight={sunlight}
                co2={co2}
                temperature={temperature}
                onSunlightChange={setSunlight}
                onCo2Change={setCo2}
                onTemperatureChange={setTemperature}
                oxygen={data.oxygen}
              />
            </div>

            <div className="space-y-6">
              <Sliders
                sunlight={sunlight}
                co2={co2}
                temperature={temperature}
                onSunlightChange={setSunlight}
                onCo2Change={setCo2}
                onTemperatureChange={setTemperature}
              />

              <RewardsSystem
                photosynthesisRate={data.photosynthesisRate}
                gameWon={gameWon}
                language={language}
              />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
    </ProtectedRoute>
  )
}

