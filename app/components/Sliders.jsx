'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useTranslation } from '../context/TranslationContext'
import { t } from '../utils/translations'

export default function Sliders({ sunlight, co2, temperature, onSunlightChange, onCo2Change, onTemperatureChange }) {
  const { language } = useTranslation()
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
      className="glass rounded-xl p-4 md:p-5 border-2 border-emerald-500/20 dark:border-chalk-border/40 shadow-sm bg-white/90 dark:bg-chalkboard-surface space-y-4 md:space-y-5 h-full flex flex-col overflow-hidden"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="text-center mb-3 flex-shrink-0">
        <h3 className="text-base md:text-lg font-semibold text-gray-800 dark:text-chalk-white mb-0.5 leading-tight">
          {t('charts.environmentStats', language)}
        </h3>
        <p className="text-[10px] md:text-xs text-gray-500 dark:text-chalk-secondary leading-tight">
          {t('sliders.adjust', language)}
        </p>
      </div>

      {/* Sunlight Slider */}
      <div className="space-y-2.5 flex-shrink-0">
        <div className="flex items-center justify-between gap-2 min-w-0">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-400/20 to-orange-400/20 dark:from-yellow-500/30 dark:to-orange-500/30 flex items-center justify-center flex-shrink-0">
              <span className="text-base md:text-lg">🌞</span>
            </div>
            <span className="font-semibold text-sm md:text-base text-gray-800 dark:text-chalk-white truncate">{t('sliders.sunlight', language)}</span>
          </div>
          <span className="text-base md:text-lg font-semibold text-yellow-600 dark:text-chalk-yellow flex-shrink-0">
            {sunlight}%
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={sunlight}
          onChange={(e) => onSunlightChange(Number(e.target.value))}
          className="w-full h-5 rounded-full appearance-none cursor-pointer slider-thumb text-yellow-500"
          style={getSliderStyle(sunlight, '#fbbf24')}
        />
      </div>

      {/* CO₂ Slider */}
      <div className="space-y-2.5 flex-shrink-0">
        <div className="flex items-center justify-between gap-2 min-w-0">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400/20 to-emerald-400/20 dark:from-green-500/30 dark:to-emerald-500/30 flex items-center justify-center flex-shrink-0">
              <span className="text-base md:text-lg">🌬</span>
            </div>
            <span className="font-semibold text-sm md:text-base text-gray-800 dark:text-chalk-white truncate">{t('sliders.co2', language)}</span>
          </div>
          <span className="text-base md:text-lg font-semibold text-green-600 dark:text-chalk-emerald flex-shrink-0">
            {co2}%
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={co2}
          onChange={(e) => onCo2Change(Number(e.target.value))}
          className="w-full h-5 rounded-full appearance-none cursor-pointer slider-thumb text-green-500"
          style={getSliderStyle(co2, '#22c55e')}
        />
      </div>

      {/* Temperature Slider */}
      <div className="space-y-2.5 flex-shrink-0">
        <div className="flex items-center justify-between gap-2 min-w-0">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400/20 to-red-400/20 dark:from-orange-500/30 dark:to-red-500/30 flex items-center justify-center flex-shrink-0">
              <span className="text-base md:text-lg">🌡️</span>
            </div>
            <span className="font-semibold text-sm md:text-base text-gray-800 dark:text-chalk-white truncate">{t('sliders.temperature', language)}</span>
          </div>
          <span className="text-base md:text-lg font-semibold text-orange-600 dark:text-orange-400 flex-shrink-0 whitespace-nowrap">
            {temperature}°C
          </span>
        </div>
        <input
          type="range"
          min="1"
          max="100"
          value={temperature}
          onChange={(e) => onTemperatureChange(Number(e.target.value))}
          className="w-full h-5 rounded-full appearance-none cursor-pointer slider-thumb text-orange-500"
          style={getSliderStyle(temperature, '#f97316')}
        />
      </div>
    </motion.div>
  )
}
