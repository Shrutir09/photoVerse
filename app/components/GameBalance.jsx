'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Confetti from './Confetti'
import { playApplause, playSuccessSound } from '../utils/sounds'
import { useTranslation } from '../context/TranslationContext'
import { t } from '../utils/translations'

export default function GameBalance({ sunlight, co2, temperature, onSunlightChange, onCo2Change, onTemperatureChange, photosynthesisRate, onGameWon }) {
  const { language } = useTranslation()
  const [gameStarted, setGameStarted] = useState(false)
  const [gameWon, setGameWon] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const hasWonRef = useRef(false)

  useEffect(() => {
    if (gameStarted && !gameWon) {
      const timer = setInterval(() => {
        setTimeElapsed((prev) => prev + 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [gameStarted, gameWon])

  useEffect(() => {
    if (gameStarted && photosynthesisRate >= 70 && photosynthesisRate <= 75 && !hasWonRef.current) {
      hasWonRef.current = true
      setGameWon(true)
      setShowConfetti(true)
      playApplause()
      playSuccessSound()
      
      // Notify parent component
      if (onGameWon) {
        onGameWon('balance')
      }
    }
  }, [photosynthesisRate, gameStarted, onGameWon])

  const handleStart = () => {
    setGameStarted(true)
    setGameWon(false)
    setTimeElapsed(0)
    hasWonRef.current = false
    setShowConfetti(false)
  }

  const handleReset = () => {
    setGameStarted(false)
    setGameWon(false)
    setTimeElapsed(0)
    hasWonRef.current = false
    setShowConfetti(false)
  }

  return (
    <>
      <Confetti active={showConfetti} onComplete={() => setShowConfetti(false)} />
      <motion.div 
        className="glass rounded-[20px] p-8 md:p-10 bg-white/90 dark:bg-chalkboard-surface shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -4 }}
      >
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/10 to-emerald-500/10 dark:from-green-500/20 dark:to-emerald-500/20 rounded-full blur-3xl -mr-16 -mt-16" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-emerald-400/10 to-green-500/10 dark:from-emerald-500/20 dark:to-green-500/20 rounded-full blur-2xl -ml-12 -mb-12" />

        <div className="relative z-10 flex-grow flex flex-col">
          <div className="flex items-center gap-4 mb-6">
            <motion.div 
              className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-4xl shadow-lg"
              animate={gameWon ? { 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              } : {}}
              transition={{ duration: 0.5, repeat: gameWon ? Infinity : 0, repeatDelay: 1 }}
            >
              ⚖️
            </motion.div>
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-chalk-white mb-2">
                {t('games.balanceEarth', language)}
              </h2>
              <p className="text-gray-600 dark:text-chalk-secondary text-sm md:text-base leading-relaxed">
                {t('games.balanceEarthDescription', language)}
              </p>
            </div>
          </div>

          {/* Objective Card */}
          {!gameStarted && (
            <motion.div
              className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-chalkboard-bg/50 dark:to-chalkboard-surface/30 rounded-xl border border-green-200 dark:border-chalk-border/30"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl">🎯</div>
                <div>
                  <h3 className="font-bold text-gray-800 dark:text-chalk-white mb-1">{t('games.yourMission', language)}</h3>
                  <p className="text-sm text-gray-600 dark:text-chalk-secondary">
                    {t('games.balanceEarthDescription', language)}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {!gameStarted ? (
        <motion.button
          onClick={handleStart}
          className="w-full py-4 md:py-4 min-h-[56px] bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 hover:from-green-600 hover:via-emerald-600 hover:to-green-700 text-white font-bold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg text-lg md:text-lg mt-auto touch-manipulation"
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {t('games.startGame', language)}
        </motion.button>
      ) : (
        <div className="space-y-6 flex-grow flex flex-col">
          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-chalkboard-bg/50 dark:to-chalkboard-surface/30 rounded-xl">
            <div className="text-3xl font-bold mb-2 text-gray-800 dark:text-chalk-white">
              Time: {timeElapsed}s
            </div>
            <div className="text-lg text-gray-600 dark:text-chalk-secondary">
              Target: 70-75% | Current: <span className="font-bold text-green-600 dark:text-chalk-emerald">{photosynthesisRate.toFixed(1)}%</span>
            </div>
          </div>

          <AnimatePresence>
            {gameWon && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-center p-6 bg-gradient-to-br from-green-500/30 to-emerald-500/30 dark:from-green-500/40 dark:to-emerald-500/40 rounded-xl border-2 border-green-500 dark:border-chalk-emerald shadow-2xl relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                />
                <div className="relative z-10">
                  <motion.div 
                    className="text-6xl mb-3"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 15, -15, 0]
                    }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0.5 }}
                  >
                    🎉
                  </motion.div>
                  <motion.div 
                    className="text-3xl font-bold text-green-600 dark:text-chalk-emerald mb-2"
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {t('games.success', language)}!
                  </motion.div>
                  <div className="text-lg text-gray-700 dark:text-chalk-white mb-2">
                    {language === 'hi' 
                      ? `आपने ${timeElapsed} सेकंड में पृथ्वी को संतुलित किया!`
                      : `You balanced the Earth in ${timeElapsed} seconds!`}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-chalk-secondary">
                    {language === 'hi' 
                      ? '+10 अंक अर्जित किए! नीचे अपने बैज देखें।'
                      : '+10 Points earned! Check your badges below.'}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            onClick={handleReset}
            className="w-full py-4 md:py-4 min-h-[56px] bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg text-lg md:text-lg mt-auto touch-manipulation"
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {t('games.reset', language)}
          </motion.button>
        </div>
          )}
        </div>
      </motion.div>
    </>
  )
}

