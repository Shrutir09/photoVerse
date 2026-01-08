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
import { useTranslation } from '../context/TranslationContext'
import { t } from '../utils/translations'

export default function GamesPage() {
  const [sunlight, setSunlight] = useState(50)
  const [co2, setCo2] = useState(50)
  const [temperature, setTemperature] = useState(25)
  const [data, setData] = useState(null)
  const [gameWon, setGameWon] = useState({ balance: false, oxygen: false })
  const { language } = useTranslation()
  const [gameWinCount, setGameWinCount] = useState(0)

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
    // Load game win count
    const wins = localStorage.getItem('gameWins')
    if (wins) setGameWinCount(parseInt(wins, 10))
  }, [])

  const handleGameWon = (gameType) => {
    setGameWon(prev => ({ ...prev, [gameType]: true }))
    setGameWinCount(prev => {
      const newCount = prev + 1
      localStorage.setItem('gameWins', newCount.toString())
      return newCount
    })
    
    // Reset after 3 seconds
    setTimeout(() => {
      setGameWon(prev => ({ ...prev, [gameType]: false }))
    }, 3000)
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen p-6 md:p-10 bg-gradient-to-br from-green-50/90 via-emerald-50/70 to-cyan-50/80 dark:bg-chalkboard-bg">
        <div className="max-w-[1280px] mx-auto space-y-10 md:space-y-12">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-green-500 bg-clip-text text-transparent mb-6 font-sans">
              🎮 {t('games.title', language)}
            </h1>
            <p className="text-lg md:text-xl text-gray-500 dark:text-chalk-secondary max-w-2xl mx-auto">
              Learn through interactive challenges
            </p>
          </motion.div>

          {data && (
            <motion.div 
              className="space-y-8 md:space-y-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Top Section: Game Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                <div className="h-full">
                  <GameBalance
                    sunlight={sunlight}
                    co2={co2}
                    temperature={temperature}
                    onSunlightChange={setSunlight}
                    onCo2Change={setCo2}
                    onTemperatureChange={setTemperature}
                    photosynthesisRate={data.photosynthesisRate}
                    onGameWon={handleGameWon}
                  />
                </div>
                <div className="h-full">
                  <GameOxygen
                    sunlight={sunlight}
                    co2={co2}
                    temperature={temperature}
                    onSunlightChange={setSunlight}
                    onCo2Change={setCo2}
                    onTemperatureChange={setTemperature}
                    oxygen={data.oxygen}
                    onGameWon={handleGameWon}
                  />
                </div>
              </div>

              {/* Bottom Section: Stats & Badges */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                <div className="h-full">
                  <Sliders
                    sunlight={sunlight}
                    co2={co2}
                    temperature={temperature}
                    onSunlightChange={setSunlight}
                    onCo2Change={setCo2}
                    onTemperatureChange={setTemperature}
                  />
                </div>
                <div className="h-full">
                  <RewardsSystem
                    photosynthesisRate={data.photosynthesisRate}
                    gameWon={gameWon.balance || gameWon.oxygen}
                    gameWinCount={gameWinCount}
                    language={language}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </div>
        <Footer />
      </div>
    </ProtectedRoute>
  )
}

