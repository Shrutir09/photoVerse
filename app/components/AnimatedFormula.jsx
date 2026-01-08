'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useTranslation } from '../context/TranslationContext'
import { t } from '../utils/translations'

export default function AnimatedFormula() {
  const { language } = useTranslation()
  const [step, setStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setStep((prev) => {
        if (prev >= 5) {
          setIsPlaying(false)
          return 0
        }
        return prev + 1
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [isPlaying, step])

  const handlePlay = () => {
    setStep(0)
    setIsPlaying(true)
  }

  const handleReset = () => {
    setStep(0)
    setIsPlaying(false)
  }

  return (
    <div className="space-y-6">
      <div className="text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent mb-2">
          ⚗️ {t('animatedFormula.title', language)}
        </h2>
        <p className="text-gray-600 dark:text-chalk-secondary mb-4">{t('animatedFormula.formula', language)}</p>
      </div>

      <div className="glass rounded-3xl p-8 md:p-12 border-2 border-emerald-500/20 shadow-xl relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 via-green-50/20 to-cyan-50/30 dark:from-emerald-900/10 dark:via-green-900/5 dark:to-cyan-900/10" />

        <div className="relative z-10">
          {/* Control Buttons */}
          <div className="flex justify-center gap-4 mb-8">
            <motion.button
              onClick={handlePlay}
              disabled={isPlaying}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ▶️ {t('animatedFormula.play', language)}
            </motion.button>
            <motion.button
              onClick={handleReset}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 glass border-2 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-semibold rounded-xl"
            >
              🔄 {t('animatedFormula.reset', language)}
            </motion.button>
          </div>

          {/* Animation Scene */}
          <div className="relative h-96 md:h-[500px] bg-gradient-to-b from-sky-100 via-green-50 to-green-100 dark:bg-chalkboard-surface rounded-2xl overflow-hidden">
            {/* Ground */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-green-600 to-green-500 dark:from-green-700 dark:to-green-600" />

            {/* Roots */}
            <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2">
              <svg width="100" height="80" viewBox="0 0 100 80" className="opacity-60">
                <path
                  d="M50 0 Q45 20 40 40 Q35 60 30 80 M50 0 Q55 20 60 40 Q65 60 70 80"
                  stroke="#8B4513"
                  strokeWidth="3"
                  fill="none"
                />
              </svg>
            </div>

            {/* Plant/Tree */}
            <motion.div
              className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-10"
              animate={{
                scale: step >= 3 ? [1, 1.1, 1] : 1,
                filter: step >= 3 ? 'brightness(1.2)' : 'brightness(1)',
              }}
              transition={{ duration: 2, repeat: step >= 3 ? Infinity : 0 }}
            >
              <div className="text-8xl md:text-9xl">🌳</div>
              {/* Plant glow when photosynthesizing */}
              {step >= 3 && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(34, 197, 94, 0.5) 0%, transparent 70%)',
                    filter: 'blur(30px)',
                  }}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              )}
            </motion.div>

            {/* CO₂ Bubbles moving to leaf */}
            {step >= 0 && (
              <motion.div
                className="absolute top-32 left-1/4 z-20"
                initial={{ opacity: 0, x: -50 }}
                animate={{
                  opacity: step >= 0 ? [0, 1, 1, 0] : 0,
                  x: step >= 0 ? [0, 100, 100, 0] : -50,
                  y: step >= 0 ? [0, -20, -20, 0] : 0,
                }}
                transition={{ duration: 2, delay: 0.5 }}
              >
                <div className="bg-gray-500/80 text-white px-3 py-2 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm">
                  CO₂
                </div>
              </motion.div>
            )}

            {/* Water flowing from roots */}
            {step >= 1 && (
              <motion.div
                className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: step >= 1 ? [0, 1, 1, 0] : 0,
                  y: step >= 1 ? [20, -60, -60, 20] : 20,
                }}
                transition={{ duration: 2, delay: 0.5 }}
              >
                <div className="bg-blue-400/80 text-white px-3 py-2 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm">
                  H₂O
                </div>
              </motion.div>
            )}

            {/* Sunlight rays */}
            {step >= 2 && (
              <motion.div
                className="absolute top-8 right-8 z-20"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  opacity: step >= 2 ? 1 : 0,
                  scale: step >= 2 ? [1, 1.2, 1] : 0.5,
                }}
                transition={{ duration: 2, repeat: step >= 2 ? Infinity : 0 }}
              >
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400 shadow-2xl">
                  <span className="text-4xl md:text-5xl flex items-center justify-center h-full">☀️</span>
                </div>
                {/* Sun rays */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    boxShadow: step >= 2 ? [
                      '0 0 30px rgba(251, 191, 36, 0.6)',
                      '0 0 50px rgba(251, 191, 36, 0.9)',
                      '0 0 30px rgba(251, 191, 36, 0.6)',
                    ] : 'none',
                  }}
                  transition={{ duration: 2, repeat: step >= 2 ? Infinity : 0 }}
                />
              </motion.div>
            )}

            {/* Glucose forming */}
            {step >= 4 && (
              <motion.div
                className="absolute top-40 left-1/2 transform -translate-x-1/2 z-20"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: step >= 4 ? 1 : 0,
                  scale: step >= 4 ? [0, 1.2, 1] : 0,
                }}
                transition={{ duration: 1.5 }}
              >
                <div className="bg-yellow-400/90 text-yellow-900 px-4 py-3 rounded-full text-base font-bold shadow-xl backdrop-blur-sm">
                  🍞 {language === 'hi' ? 'ग्लूकोज' : 'Glucose'}
                </div>
              </motion.div>
            )}

            {/* Oxygen bubbles coming out */}
            {step >= 5 && (
              <>
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute top-32 left-1/2 transform -translate-x-1/2 z-20"
                    initial={{ opacity: 0, scale: 0.5, y: 0 }}
                    animate={{
                      opacity: step >= 5 ? [0, 1, 1, 0] : 0,
                      y: step >= 5 ? [0, -100, -100, 0] : 0,
                      x: step >= 5 ? [0, (i - 1) * 40, (i - 1) * 40, 0] : 0,
                      scale: step >= 5 ? [0.5, 1, 1, 0.5] : 0.5,
                    }}
                    transition={{ duration: 2, delay: i * 0.3 }}
                  >
                    <div className="bg-blue-400/80 text-white px-3 py-2 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm">
                      O₂
                    </div>
                  </motion.div>
                ))}
              </>
            )}

            {/* Step Label */}
            {step > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-4 left-4 bg-emerald-500/90 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm"
              >
                {t(`animatedFormula.step${step + 1}`, language)}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

