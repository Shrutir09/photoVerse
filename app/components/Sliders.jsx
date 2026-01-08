'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Sliders({ sunlight, co2, temperature, onSunlightChange, onCo2Change, onTemperatureChange }) {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }
    checkDarkMode()
    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })
    return () => observer.disconnect()
  }, [])

  const getSliderStyle = (value, color) => {
    const bgColor = isDark ? '#2F6F5A' : '#e5e7eb'
    return {
      background: `linear-gradient(to right, ${color} 0%, ${color} ${value}%, ${bgColor} ${value}%, ${bgColor} 100%)`
    }
  }
  return (
    <motion.div 
      className="glass rounded-[20px] p-8 md:p-10 border-2 border-emerald-500/20 dark:border-chalk-border/40 shadow-xl bg-white/90 dark:bg-chalkboard-surface space-y-8 md:space-y-10 h-full flex flex-col"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-800 dark:text-chalk-white mb-6">
        Environment Stats
      </h3>

      {/* Sunlight Slider */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400/20 to-orange-400/20 dark:from-yellow-500/30 dark:to-orange-500/30 flex items-center justify-center">
              <span className="text-2xl md:text-3xl">🌞</span>
            </div>
            <span className="font-bold text-lg md:text-xl text-gray-800 dark:text-chalk-white">Sunlight</span>
          </div>
          <span className="text-2xl md:text-3xl font-bold text-yellow-600 dark:text-chalk-yellow">
            {sunlight}%
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={sunlight}
          onChange={(e) => onSunlightChange(Number(e.target.value))}
          className="w-full h-6 rounded-full appearance-none cursor-pointer slider-thumb text-yellow-500"
          style={getSliderStyle(sunlight, '#fbbf24')}
        />
      </div>

      {/* CO₂ Slider */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400/20 to-emerald-400/20 dark:from-green-500/30 dark:to-emerald-500/30 flex items-center justify-center">
              <span className="text-2xl md:text-3xl">🌬</span>
            </div>
            <span className="font-bold text-lg md:text-xl text-gray-800 dark:text-chalk-white">CO₂ Level</span>
          </div>
          <span className="text-2xl md:text-3xl font-bold text-green-600 dark:text-chalk-emerald">
            {co2}%
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={co2}
          onChange={(e) => onCo2Change(Number(e.target.value))}
          className="w-full h-6 rounded-full appearance-none cursor-pointer slider-thumb text-green-500"
          style={getSliderStyle(co2, '#22c55e')}
        />
      </div>

      {/* Temperature Slider */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400/20 to-red-400/20 dark:from-orange-500/30 dark:to-red-500/30 flex items-center justify-center">
              <span className="text-2xl md:text-3xl">🌡️</span>
            </div>
            <span className="font-bold text-lg md:text-xl text-gray-800 dark:text-chalk-white">Temperature</span>
          </div>
          <span className="text-2xl md:text-3xl font-bold text-orange-600 dark:text-orange-400">
            {temperature}°C
          </span>
        </div>
        <input
          type="range"
          min="1"
          max="100"
          value={temperature}
          onChange={(e) => onTemperatureChange(Number(e.target.value))}
          className="w-full h-6 rounded-full appearance-none cursor-pointer slider-thumb text-orange-500"
          style={getSliderStyle(temperature, '#f97316')}
        />
      </div>
    </motion.div>
  )
}
