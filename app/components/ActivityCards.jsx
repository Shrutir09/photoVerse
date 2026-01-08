'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useTranslation } from '../context/TranslationContext'
import { t } from '../utils/translations'

export default function ActivityCards() {
  const { language } = useTranslation()
  const [isExpanded, setIsExpanded] = useState(false)
  const [sunlight, setSunlight] = useState(50)
  const [co2, setCo2] = useState(50)
  const [water, setWater] = useState(50)

  // Calculate values based on inputs
  const photosynthesisRate = Math.min(100, (sunlight * co2) / 50)
  const oxygenOutput = Math.min(100, photosynthesisRate * 0.9)
  const plantHealth = photosynthesisRate > 70 ? 'healthy' : photosynthesisRate > 40 ? 'average' : 'poor'
  const leafHealth = water > 60 && sunlight > 50 ? 'excellent' : water > 40 && sunlight > 40 ? 'good' : 'needsCare'

  // Preview cards data
  const previewCards = [
    { icon: '🌱', labelKey: 'activities.growPlant', color: 'from-green-500 to-emerald-500' },
    { icon: '💨', labelKey: 'activities.oxygenOutput', color: 'from-blue-500 to-cyan-500' },
    { icon: '🍃', labelKey: 'activities.leafHealth', color: 'from-emerald-500 to-green-500' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent mb-2">
            🧪 {t('activities.title', language)}
          </h2>
          <p className="text-gray-600 dark:text-chalk-secondary">{t('activities.subtitle', language)}</p>
        </div>
      </div>

      {/* Compact Preview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {previewCards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.03, y: -3 }}
            className="glass rounded-xl p-4 border-2 border-emerald-500/20 shadow-lg cursor-pointer"
            onClick={() => setIsExpanded(true)}
          >
            <div className="flex items-center gap-3">
              <div className={`text-3xl p-2 rounded-lg bg-gradient-to-br ${card.color} opacity-20`}>
                {card.icon}
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-gray-700 dark:text-chalk-secondary">
                  {t(card.labelKey, language)}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Expand/Collapse Button */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full glass rounded-xl p-4 border-2 border-emerald-500/20 shadow-lg flex items-center justify-between group"
      >
        <span className="font-semibold text-emerald-600 dark:text-chalk-emerald">
          {isExpanded ? t('activities.collapse', language) : t('activities.expand', language)}
        </span>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-2xl text-emerald-600 dark:text-chalk-emerald"
        >
          ▼
        </motion.div>
      </motion.button>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-6">
              {/* Main Control Panel */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass rounded-2xl p-6 border-2 border-emerald-500/20 shadow-xl"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">🌱</span>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-chalk-white">
                    {t('activities.growPlant', language)}
                  </h3>
                </div>

                {/* Sunlight Slider */}
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">☀️</span>
                      <span className="text-sm font-semibold text-gray-700 dark:text-chalk-secondary">{t('activities.adjustSunlight', language)}</span>
                    </div>
                    <span className="text-base font-bold text-yellow-600">{sunlight}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sunlight}
                    onChange={(e) => setSunlight(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-chalk-border/30 rounded-full appearance-none cursor-pointer accent-yellow-500"
                    style={{
                      background: `linear-gradient(to right, #fbbf24 0%, #fbbf24 ${sunlight}%, #e5e7eb ${sunlight}%, #e5e7eb 100%)`
                    }}
                  />
                </div>

                {/* CO₂ Slider */}
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🌬</span>
                      <span className="text-sm font-semibold text-gray-700 dark:text-chalk-secondary">{t('activities.adjustCo2', language)}</span>
                    </div>
                    <span className="text-base font-bold text-blue-600">{co2}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={co2}
                    onChange={(e) => setCo2(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-chalk-border/30 rounded-full appearance-none cursor-pointer accent-blue-500"
                    style={{
                      background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${co2}%, #e5e7eb ${co2}%, #e5e7eb 100%)`
                    }}
                  />
                </div>

                {/* Water Slider */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">💧</span>
                      <span className="text-sm font-semibold text-gray-700 dark:text-chalk-secondary">{t('activities.waterControl', language)}</span>
                    </div>
                    <span className="text-base font-bold text-cyan-600">{water}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={water}
                    onChange={(e) => setWater(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-chalk-border/30 rounded-full appearance-none cursor-pointer accent-cyan-500"
                    style={{
                      background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${water}%, #e5e7eb ${water}%, #e5e7eb 100%)`
                    }}
                  />
                </div>
              </motion.div>

              {/* Results Panel */}
              <div className="space-y-5">
                {/* Oxygen Output Meter */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="glass rounded-2xl p-5 border-2 border-blue-500/20 shadow-xl"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl">💨</span>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-chalk-white">
                      {t('activities.oxygenOutput', language)}
                    </h3>
                  </div>
                  <div className="relative">
                    <div className="text-4xl font-bold text-center mb-3 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                      {oxygenOutput.toFixed(1)}%
                    </div>
                    <div className="h-4 bg-gray-200 dark:bg-chalk-border/30 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${oxygenOutput}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Leaf Health Indicator */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="glass rounded-2xl p-5 border-2 border-green-500/20 shadow-xl"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl">🍃</span>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-chalk-white">
                      {t('activities.leafHealth', language)}
                    </h3>
                  </div>
                  <div className="flex items-center gap-4">
                    <motion.div
                      animate={{
                        scale: plantHealth === 'healthy' ? [1, 1.1, 1] : 1,
                      }}
                      transition={{ duration: 2, repeat: plantHealth === 'healthy' ? Infinity : 0 }}
                      className="text-5xl"
                    >
                      {plantHealth === 'healthy' ? '🌿' : plantHealth === 'average' ? '🍃' : '🥀'}
                    </motion.div>
                    <div>
                      <div className="text-xl font-bold mb-1">
                        {plantHealth === 'healthy' ? t('activities.healthy', language) : plantHealth === 'average' ? t('activities.average', language) : t('activities.poor', language)}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-chalk-secondary">
                        {leafHealth === 'excellent' ? t('activities.excellent', language) : leafHealth === 'good' ? t('activities.good', language) : t('activities.needsCare', language)}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Plant Visualization */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="glass rounded-2xl p-5 border-2 border-emerald-500/20 shadow-xl"
                >
                  <div className="flex justify-center items-center h-28">
                    <motion.div
                      animate={{
                        scale: plantHealth === 'healthy' ? [1, 1.15, 1] : plantHealth === 'average' ? [1, 1.05, 1] : 1,
                        filter: plantHealth === 'healthy' ? 'brightness(1.2)' : plantHealth === 'average' ? 'brightness(1.1)' : 'brightness(0.9)',
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="text-6xl"
                    >
                      🌳
                    </motion.div>
                  </div>
                  <div className="text-center mt-3">
                    <div className="text-xs font-semibold text-gray-700 dark:text-chalk-secondary">
                      {t('activities.photosynthesis', language)}: {photosynthesisRate.toFixed(1)}%
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
