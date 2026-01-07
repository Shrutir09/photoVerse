'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function EcosystemActivity({ data, language = 'en' }) {
  const [co2Bubbles, setCo2Bubbles] = useState([])
  const [o2Bubbles, setO2Bubbles] = useState([])

  const translations = {
    en: {
      title: 'Ecosystem Activity',
      photosynthesisActivity: 'Photosynthesis Activity',
      oxygenGeneration: 'Oxygen Generation',
    },
    hi: {
      title: 'पारिस्थितिकी तंत्र गतिविधि',
      photosynthesisActivity: 'प्रकाश संश्लेषण गतिविधि',
      oxygenGeneration: 'ऑक्सीजन उत्पादन',
    },
  }

  const t = translations[language] || translations.en

  // Generate CO₂ bubbles
  useEffect(() => {
    const bubbles = Array.from({ length: 3 }, (_, i) => ({
      id: `co2-${i}`,
      x: Math.random() * 30 + 5,
      y: Math.random() * 30 + 20,
      delay: i * 0.6,
    }))
    setCo2Bubbles(bubbles)
  }, [])

  // Generate O₂ bubbles
  useEffect(() => {
    const bubbles = Array.from({ length: 4 }, (_, i) => ({
      id: `o2-${i}`,
      x: Math.random() * 40 + 30,
      y: Math.random() * 30 + 20,
      delay: i * 0.5,
    }))
    setO2Bubbles(bubbles)
  }, [])

  const photosynthesisRate = data?.photosynthesisRate || 0
  const oxygen = data?.oxygen || 0

  // Plant size based on activity (0.8x to 1.2x)
  const plantScale = 0.8 + (photosynthesisRate / 100) * 0.4

  return (
    <div className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
        🌱 {t.title}
      </h2>

      <div className="glass rounded-3xl p-6 md:p-8 border-2 border-emerald-500/20 shadow-xl relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 via-green-50/20 to-cyan-50/30 dark:bg-chalkboard-surface/50" />

        <div className="relative z-10">
          {/* Photosynthesis Activity Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm md:text-base font-semibold text-gray-700 dark:text-chalk-secondary">
                {t.photosynthesisActivity}
              </span>
              <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
                {photosynthesisRate.toFixed(1)}%
              </span>
            </div>
            <div className="relative h-4 bg-gray-200 dark:bg-chalk-border/30 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${photosynthesisRate}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                style={{
                  boxShadow: photosynthesisRate > 50 ? `0 0 15px rgba(16, 185, 129, 0.5)` : 'none',
                }}
              />
            </div>
          </div>

          {/* Animated Scene */}
          <div className="relative h-32 md:h-40 flex items-center justify-center">
            {/* CO₂ Bubbles */}
            {co2Bubbles.map((bubble) => (
              <motion.div
                key={bubble.id}
                className="absolute"
                style={{
                  left: `${bubble.x}%`,
                  top: `${bubble.y}%`,
                }}
                animate={{
                  x: ['0%', '20%'],
                  y: ['0%', '-10%'],
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{
                  duration: 6,
                  delay: bubble.delay,
                  repeat: Infinity,
                  repeatDelay: 1,
                  ease: "easeInOut"
                }}
              >
                <div className="text-xs md:text-sm bg-gray-500/60 text-white px-2 py-1 rounded-full backdrop-blur-sm">
                  CO₂
                </div>
              </motion.div>
            ))}

            {/* Animated Plant */}
            <motion.div
              className="relative z-10"
              animate={{
                scale: [plantScale, plantScale * 1.05, plantScale],
                rotate: [0, 1, -1, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="text-5xl md:text-6xl">🌳</div>
              {/* Plant glow when active */}
              {photosynthesisRate > 50 && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(34, 197, 94, 0.4) 0%, transparent 70%)',
                    filter: 'blur(15px)',
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.4, 0.6, 0.4],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              )}
            </motion.div>

            {/* O₂ Bubbles */}
            {o2Bubbles.map((bubble) => (
              <motion.div
                key={bubble.id}
                className="absolute"
                style={{
                  left: `${bubble.x}%`,
                  top: `${bubble.y}%`,
                }}
                animate={{
                  y: ['0%', '-40%'],
                  x: ['0%', Math.random() * 20 - 10 + '%'],
                  opacity: [0.5, 0.8, 0],
                  scale: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 5,
                  delay: bubble.delay,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                  ease: "easeOut"
                }}
              >
                <div className="text-xs md:text-sm bg-blue-400/70 text-white px-2 py-1 rounded-full backdrop-blur-sm">
                  O₂
                </div>
              </motion.div>
            ))}
          </div>

          {/* Oxygen Generation Label */}
          <div className="mt-4 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full border border-emerald-500/20">
              <span className="text-sm font-semibold text-gray-700 dark:text-chalk-white">
                {t.oxygenGeneration}
              </span>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                {oxygen}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

