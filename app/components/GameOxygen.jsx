'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function GameOxygen({ sunlight, co2, temperature, onSunlightChange, onCo2Change, onTemperatureChange, oxygen }) {
  const [gameStarted, setGameStarted] = useState(false)
  const [gameWon, setGameWon] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [score, setScore] = useState(0)

  useEffect(() => {
    if (gameStarted && !gameWon) {
      const timer = setInterval(() => {
        setTimeElapsed((prev) => prev + 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [gameStarted, gameWon])

  useEffect(() => {
    if (gameStarted && oxygen >= 80 && temperature <= 30) {
      setGameWon(true)
      // Calculate score: higher oxygen and lower temperature = better score
      const calculatedScore = Math.round((oxygen * 10) + ((100 - temperature) * 5))
      setScore(calculatedScore)
    }
  }, [oxygen, temperature, gameStarted])

  const handleStart = () => {
    setGameStarted(true)
    setGameWon(false)
    setTimeElapsed(0)
    setScore(0)
  }

  const handleReset = () => {
    setGameStarted(false)
    setGameWon(false)
    setTimeElapsed(0)
    setScore(0)
  }

  return (
    <div className="glass rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">🎮 Oxygen Master</h2>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-4">
        Reach 80% oxygen with temperature ≤ 30
      </p>

      {!gameStarted ? (
        <motion.button
          onClick={handleStart}
          className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start Game
        </motion.button>
      ) : (
        <div className="space-y-4">
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold">Time: {timeElapsed}s</div>
            <div className="text-lg">
              Oxygen: {oxygen}% | Temp: {temperature}°C
            </div>
            <div className="text-lg font-semibold">
              Target: O₂ ≥ 80% & Temp ≤ 30°C
            </div>
          </div>

          <AnimatePresence>
            {gameWon && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-center p-4 bg-blue-500/20 rounded-lg border-2 border-blue-500"
              >
                <div className="text-4xl mb-2">🏆</div>
                <div className="text-2xl font-bold text-blue-500 mb-2">Victory!</div>
                <div className="text-lg mb-2">You achieved 80% oxygen!</div>
                <div className="text-xl font-bold">Score: {score}</div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            onClick={handleReset}
            className="w-full py-3 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Reset Game
          </motion.button>
        </div>
      )}
    </div>
  )
}

