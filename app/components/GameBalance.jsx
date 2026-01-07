'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function GameBalance({ sunlight, co2, temperature, onSunlightChange, onCo2Change, onTemperatureChange, photosynthesisRate }) {
  const [gameStarted, setGameStarted] = useState(false)
  const [gameWon, setGameWon] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)

  useEffect(() => {
    if (gameStarted && !gameWon) {
      const timer = setInterval(() => {
        setTimeElapsed((prev) => prev + 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [gameStarted, gameWon])

  useEffect(() => {
    if (gameStarted && photosynthesisRate >= 70 && photosynthesisRate <= 75) {
      setGameWon(true)
    }
  }, [photosynthesisRate, gameStarted])

  const handleStart = () => {
    setGameStarted(true)
    setGameWon(false)
    setTimeElapsed(0)
  }

  const handleReset = () => {
    setGameStarted(false)
    setGameWon(false)
    setTimeElapsed(0)
  }

  return (
    <div className="glass rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">🎮 Balance the Earth</h2>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-4">
        Adjust the sliders to achieve a Balanced environment (70-75% rate)
      </p>

      {!gameStarted ? (
        <motion.button
          onClick={handleStart}
          className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start Game
        </motion.button>
      ) : (
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-2xl font-bold mb-2">Time: {timeElapsed}s</div>
            <div className="text-lg">
              Target: 70-75% | Current: {photosynthesisRate.toFixed(1)}%
            </div>
          </div>

          <AnimatePresence>
            {gameWon && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-center p-4 bg-green-500/20 rounded-lg border-2 border-green-500"
              >
                <div className="text-4xl mb-2">🎉</div>
                <div className="text-2xl font-bold text-green-500 mb-2">Success!</div>
                <div className="text-lg">You balanced the Earth in {timeElapsed} seconds!</div>
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

