'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function RewardsSystem({ photosynthesisRate, gameWon, language = 'en' }) {
  const [user, setUser] = useState(null)
  const [levelProgress, setLevelProgress] = useState(0)

  useEffect(() => {
    // Load user data
    const userData = localStorage.getItem('user')
    if (userData) {
      const parsed = JSON.parse(userData)
      setUser(parsed)
    } else {
      // Default user
      setUser({ name: 'Guest', level: 1, points: 0, badges: [] })
    }
  }, [])

  useEffect(() => {
    if (gameWon && user) {
      // Award points
      const newPoints = (user.points || 0) + 10
      const newLevel = Math.floor(newPoints / 100) + 1
      const progress = (newPoints % 100) / 100

      const updatedUser = {
        ...user,
        points: newPoints,
        level: newLevel,
      }

      setUser(updatedUser)
      setLevelProgress(progress)
      localStorage.setItem('user', JSON.stringify(updatedUser))
    }
  }, [gameWon, user])

  const badges = [
    { id: 'first_plant', name: { en: 'First Plant', hi: 'पहला पौधा' }, icon: '🌱', unlocked: (user?.points || 0) >= 10 },
    { id: 'green_thumb', name: { en: 'Green Thumb', hi: 'हरा अंगूठा' }, icon: '👍', unlocked: (user?.points || 0) >= 50 },
    { id: 'master_gardener', name: { en: 'Master Gardener', hi: 'मास्टर माली' }, icon: '🏆', unlocked: (user?.points || 0) >= 200 },
    { id: 'oxygen_hero', name: { en: 'Oxygen Hero', hi: 'ऑक्सीजन हीरो' }, icon: '🌬', unlocked: photosynthesisRate >= 80 },
  ]

  if (!user) return null

  const t = (key) => {
    const translations = {
      en: { points: 'Points', level: 'Level', badges: 'Badges', progress: 'Progress' },
      hi: { points: 'अंक', level: 'स्तर', badges: 'बैज', progress: 'प्रगति' },
    }
    return translations[language]?.[key] || translations.en[key]
  }

  return (
    <div className="glass rounded-2xl p-6 space-y-4">
      <h3 className="text-xl font-bold text-center">🏆 {t('badges')}</h3>
      
      {/* Points and Level */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl">
        <div>
          <div className="text-sm text-gray-600 dark:text-gray-400">{t('points')}</div>
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {user.points || 0}
          </div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-600 dark:text-gray-400">{t('level')}</div>
          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            {user.level || 1}
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-600 dark:text-gray-400">{t('progress')}</div>
          <div className="text-lg font-semibold">
            {Math.round((user.points || 0) % 100)}/100
          </div>
        </div>
      </div>

      {/* Level Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>{t('level')} {user.level || 1}</span>
          <span>{t('level')} {(user.level || 1) + 1}</span>
        </div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
            initial={{ width: 0 }}
            animate={{ width: `${((user.points || 0) % 100)}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-4 gap-2">
        {badges.map((badge) => (
          <motion.div
            key={badge.id}
            className={`p-3 rounded-xl text-center ${
              badge.unlocked
                ? 'bg-gradient-to-br from-green-500/30 to-emerald-500/30 border-2 border-green-500'
                : 'bg-gray-200 dark:bg-gray-700 opacity-50'
            }`}
            whileHover={{ scale: badge.unlocked ? 1.1 : 1 }}
            title={badge.name[language] || badge.name.en}
          >
            <div className="text-3xl mb-1">{badge.icon}</div>
            <div className="text-xs font-semibold">
              {badge.name[language] || badge.name.en}
            </div>
            {badge.unlocked && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-green-500 text-lg"
              >
                ✓
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

