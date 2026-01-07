'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function PlantView({ photosynthesisRate, sunlight, co2, environment = null }) {
  // Calculate plant size based on photosynthesis rate (30% to 100% scale)
  const plantScale = 0.3 + (photosynthesisRate / 100) * 0.7;
  const sunBrightness = sunlight / 100;
  const glowIntensity = photosynthesisRate / 100;
  
  // Environment effects on visual appearance
  const [envEffects, setEnvEffects] = useState({
    aqiWarning: false,
    oxygenBoost: false,
    rainEffect: false,
    lowLight: false,
  })
  
  useEffect(() => {
    if (!environment) return
    
    setEnvEffects({
      aqiWarning: environment.aqi !== null && environment.aqi > 100,
      oxygenBoost: environment.oxygenLevel > 80 && environment.greeneryIndex > 60,
      rainEffect: environment.rainfall > 0,
      lowLight: environment.ambientLight !== null && environment.ambientLight < 100,
    })
  }, [environment])
  
  // Generate glucose icons
  const [glucoseIcons, setGlucoseIcons] = useState([])
  
  useEffect(() => {
    if (photosynthesisRate > 30) {
      const count = Math.floor(photosynthesisRate / 20)
      const icons = Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: 30 + Math.random() * 40,
        delay: i * 0.2,
      }))
      setGlucoseIcons(icons)
    } else {
      setGlucoseIcons([])
    }
  }, [photosynthesisRate])

  // Generate CO₂ particles
  const co2Particles = Array.from({ length: Math.floor(co2 / 10) }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: i * 0.3,
  }))

  return (
    <div className="relative w-full h-96 flex items-center justify-center overflow-hidden bg-gradient-to-b from-sky-100 to-green-100 dark:from-gray-800 dark:to-green-900 rounded-2xl">
      {/* Sun */}
      <motion.div
        className="absolute top-8 right-8 z-20"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div
          className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400 shadow-2xl"
          style={{
            boxShadow: `0 0 ${30 + sunBrightness * 50}px rgba(251, 191, 36, ${0.6 + sunBrightness * 0.4}), 0 0 ${60 + sunBrightness * 80}px rgba(251, 191, 36, ${0.3 + sunBrightness * 0.3})`,
            filter: `brightness(${0.8 + sunBrightness * 0.2})`,
          }}
        >
          <span className="text-6xl flex items-center justify-center h-full">☀️</span>
        </div>
      </motion.div>

      {/* CO₂ Particles moving into leaves */}
      {co2Particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute text-2xl opacity-60"
          style={{
            left: `${particle.x}%`,
            top: '10%',
          }}
          animate={{
            y: ['10%', '50%', '50%'],
            x: [0, Math.random() * 20 - 10, Math.random() * 20 - 10],
            opacity: [0.6, 0.8, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        >
          💨
        </motion.div>
      ))}

      {/* Environment effect indicators */}
      {envEffects.aqiWarning && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-4 left-4 z-30 bg-red-500/80 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"
        >
          ⚠️ High AQI
        </motion.div>
      )}
      {envEffects.oxygenBoost && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-4 right-4 z-30 bg-green-500/80 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"
        >
          ✨ Oxygen Boost
        </motion.div>
      )}
      {envEffects.rainEffect && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 bg-blue-500/80 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"
        >
          🌧️ Rain Boost
        </motion.div>
      )}
      {envEffects.lowLight && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-1/2 left-4 z-30 bg-yellow-500/80 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"
        >
          💡 Low Light
        </motion.div>
      )}

      {/* Plant with glowing effect and gentle movement */}
      <motion.div
        className="relative z-10"
        animate={{
          scale: plantScale,
          y: [0, -5, 0],
          rotate: [0, 1, -1, 0],
          filter: envEffects.aqiWarning 
            ? ['brightness(0.8)', 'brightness(0.7)', 'brightness(0.8)']
            : envEffects.oxygenBoost
            ? ['brightness(1.1)', 'brightness(1.2)', 'brightness(1.1)']
            : 'brightness(1)',
        }}
        transition={{
          scale: {
            type: "spring",
            stiffness: 100,
            damping: 10,
          },
          y: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          },
          rotate: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          },
          filter: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        <div className="relative">
          <div 
            className="text-8xl relative"
            style={{
              filter: `drop-shadow(0 0 ${10 + glowIntensity * 20}px rgba(34, 197, 94, ${0.5 + glowIntensity * 0.5}))`,
            }}
          >
            {photosynthesisRate < 30 ? '🌱' : photosynthesisRate < 70 ? '🌿' : '🌳'}
          </div>
          
          {/* Glowing leaves effect */}
          {photosynthesisRate > 30 && (
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: `radial-gradient(circle, rgba(34, 197, 94, ${0.3 * glowIntensity}) 0%, transparent 70%)`,
                filter: `blur(${20 * glowIntensity}px)`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
        </div>
      </motion.div>

      {/* Glucose icons appearing in leaves */}
      {glucoseIcons.map((icon) => (
        <motion.div
          key={icon.id}
          className="absolute text-2xl z-10"
          style={{
            left: `${icon.x}%`,
            top: `${icon.y}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 1, 0],
            y: [0, -10, -20],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: icon.delay,
            ease: "easeInOut"
          }}
        >
          🍞
        </motion.div>
      ))}

      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-green-700 to-green-500 dark:from-green-800 dark:to-green-600 rounded-b-2xl" />
    </div>
  )
}

