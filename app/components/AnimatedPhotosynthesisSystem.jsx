'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function AnimatedPhotosynthesisSystem() {
  const [cycle, setCycle] = useState(0)
  const [co2Particles, setCo2Particles] = useState([])
  const [o2Particles, setO2Particles] = useState([])

  // Animation cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setCycle((prev) => (prev + 1) % 8)
    }, 2000) // Each phase lasts 2 seconds

    return () => clearInterval(interval)
  }, [])

  // Generate CO₂ particles when human exhales
  useEffect(() => {
    if (cycle === 1 || cycle === 2) {
      const particles = Array.from({ length: 3 }, (_, i) => ({
        id: Date.now() + i,
        x: 15, // Start from human
        y: 50,
        delay: i * 0.3,
      }))
      setCo2Particles((prev) => [...prev, ...particles].slice(-6))
    }
  }, [cycle])

  // Generate O₂ particles when plant produces
  useEffect(() => {
    if (cycle === 5 || cycle === 6) {
      const particles = Array.from({ length: 3 }, (_, i) => ({
        id: Date.now() + i + 1000,
        x: 50, // Start from plant
        y: 40,
        delay: i * 0.3,
      }))
      setO2Particles((prev) => [...prev, ...particles].slice(-6))
    }
  }, [cycle])

  // Remove particles after animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setCo2Particles((prev) => prev.filter((p) => Date.now() - p.id < 4000))
      setO2Particles((prev) => prev.filter((p) => Date.now() - p.id < 4000))
    }, 100)
    return () => clearTimeout(timer)
  }, [co2Particles, o2Particles])

  return (
    <div className="relative w-full h-[500px] md:h-[600px] bg-gradient-to-b from-sky-50 via-green-50 to-emerald-50 dark:bg-chalkboard-surface rounded-3xl overflow-hidden">
      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-green-600 to-green-500 dark:from-green-700 dark:to-green-600" />

      {/* Sun */}
      <motion.div
        className="absolute top-8 right-8 z-20"
        animate={{
          scale: cycle >= 3 && cycle <= 5 ? [1, 1.1, 1] : 1,
          opacity: cycle >= 3 && cycle <= 5 ? [0.8, 1, 0.8] : 0.7,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400 shadow-2xl relative">
          <span className="text-4xl md:text-5xl flex items-center justify-center h-full">☀️</span>
          {/* Sun rays */}
          {cycle >= 3 && cycle <= 5 && (
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: [
                  '0 0 30px rgba(251, 191, 36, 0.6)',
                  '0 0 50px rgba(251, 191, 36, 0.9)',
                  '0 0 30px rgba(251, 191, 36, 0.6)',
                ],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
        </div>
        {/* Sunlight label */}
        {cycle >= 3 && cycle <= 5 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-yellow-400/90 text-yellow-900 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap"
          >
            Sunlight
          </motion.div>
        )}
      </motion.div>

      {/* Human */}
      <div className="absolute bottom-24 left-[10%] md:left-[15%] z-10">
        <motion.div
          animate={{
            scale: cycle === 0 || cycle === 7 ? [1, 1.05, 1] : 1,
          }}
          transition={{
            duration: 1.5,
            repeat: cycle === 0 || cycle === 7 ? Infinity : 0,
            ease: "easeInOut"
          }}
          className="text-6xl md:text-7xl"
        >
          👤
        </motion.div>
        {/* Breathing indicator */}
        {(cycle === 0 || cycle === 7) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-blue-600 dark:text-blue-400"
          >
            Inhaling O₂
          </motion.div>
        )}
        {(cycle === 1 || cycle === 2) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-gray-600 dark:text-chalk-secondary"
          >
            Exhaling CO₂
          </motion.div>
        )}
      </div>

      {/* Plant/Tree */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-10">
        <motion.div
          animate={{
            scale: cycle >= 3 && cycle <= 6 ? [1, 1.1, 1] : 1,
            filter: cycle >= 4 && cycle <= 6 ? 'brightness(1.2)' : 'brightness(1)',
          }}
          transition={{
            duration: 2,
            repeat: cycle >= 3 && cycle <= 6 ? Infinity : 0,
            ease: "easeInOut"
          }}
          className="text-7xl md:text-8xl relative"
        >
          🌳
          {/* Plant glow when photosynthesizing */}
          {cycle >= 4 && cycle <= 6 && (
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
        {/* Photosynthesis label */}
        {cycle >= 4 && cycle <= 6 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-500/90 text-white px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap"
          >
            Photosynthesis
          </motion.div>
        )}
      </div>

      {/* CO₂ Particles moving from human to plant */}
      {co2Particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute z-20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            x: ['0%', '35%'],
            y: ['0%', '-10%'],
            opacity: [0, 1, 1, 0],
            scale: [0.5, 1, 1, 0.5],
          }}
          transition={{
            duration: 2,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        >
          <div className="bg-gray-500/80 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg">
            CO₂
          </div>
        </motion.div>
      ))}

      {/* O₂ Particles moving from plant to human */}
      {o2Particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute z-20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            x: ['0%', '-35%'],
            y: ['0%', '10%'],
            opacity: [0, 1, 1, 0],
            scale: [0.5, 1, 1, 0.5],
          }}
          transition={{
            duration: 2,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        >
          <div className="bg-blue-400/90 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg">
            O₂
          </div>
        </motion.div>
      ))}

      {/* Sunlight rays to plant */}
      {cycle >= 3 && cycle <= 5 && (
        <motion.div
          className="absolute top-16 right-16 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg className="w-32 h-32 md:w-40 md:h-40" viewBox="0 0 100 100">
            <motion.line
              x1="20"
              y1="20"
              x2="50"
              y2="60"
              stroke="rgba(251, 191, 36, 0.4)"
              strokeWidth="2"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <motion.line
              x1="30"
              y1="15"
              x2="50"
              y2="60"
              stroke="rgba(251, 191, 36, 0.4)"
              strokeWidth="2"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
            />
            <motion.line
              x1="40"
              y1="10"
              x2="50"
              y2="60"
              stroke="rgba(251, 191, 36, 0.4)"
              strokeWidth="2"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
            />
          </svg>
        </motion.div>
      )}

      {/* Cycle indicator (for debugging, can be removed) */}
      <div className="absolute top-4 left-4 text-xs text-gray-500 dark:text-chalk-secondary opacity-50">
        Cycle: {cycle}
      </div>
    </div>
  )
}

