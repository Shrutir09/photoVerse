'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function RewardsSystem({ photosynthesisRate, gameWon, gameWinCount = 0, language = 'en' }) {
  const [user, setUser] = useState(null)
  const [levelProgress, setLevelProgress] = useState(0)
  const [newlyUnlockedBadges, setNewlyUnlockedBadges] = useState([])

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

      // Check for newly unlocked badges
      const previousPoints = user.points || 0
      const newlyUnlocked = []
      
      if (previousPoints < 10 && newPoints >= 10) newlyUnlocked.push('first_plant')
      if (previousPoints < 50 && newPoints >= 50) newlyUnlocked.push('green_thumb')
      if (previousPoints < 200 && newPoints >= 200) newlyUnlocked.push('master_gardener')
      if (photosynthesisRate >= 80 && !user.badges?.includes('oxygen_hero')) {
        newlyUnlocked.push('oxygen_hero')
      }

      if (newlyUnlocked.length > 0) {
        setNewlyUnlockedBadges(newlyUnlocked)
        // Clear after animation
        setTimeout(() => setNewlyUnlockedBadges([]), 3000)
      }

      const updatedUser = {
        ...user,
        points: newPoints,
        level: newLevel,
        badges: [...(user.badges || []), ...newlyUnlocked],
      }

      setUser(updatedUser)
      setLevelProgress(progress)
      localStorage.setItem('user', JSON.stringify(updatedUser))
    }
  }, [gameWon, user, photosynthesisRate])

  const badges = [
    { id: 'first_plant', name: { en: 'First Plant', hi: 'पहला पौधा' }, icon: '🌱', unlocked: (user?.points || 0) >= 10 || user?.badges?.includes('first_plant') },
    { id: 'green_thumb', name: { en: 'Green Thumb', hi: 'हरा अंगूठा' }, icon: '👍', unlocked: (user?.points || 0) >= 50 || user?.badges?.includes('green_thumb') },
    { id: 'master_gardener', name: { en: 'Master Gardener', hi: 'मास्टर माली' }, icon: '🏆', unlocked: (user?.points || 0) >= 200 || user?.badges?.includes('master_gardener') },
    { id: 'oxygen_hero', name: { en: 'Oxygen Hero', hi: 'ऑक्सीजन हीरो' }, icon: '🌬', unlocked: photosynthesisRate >= 80 || user?.badges?.includes('oxygen_hero') },
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
    <motion.div 
      className="glass rounded-[20px] p-8 md:p-10 bg-white/90 dark:bg-chalkboard-surface shadow-lg space-y-6 h-full flex flex-col"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-800 dark:text-chalk-white mb-6">
        🏆 {t('badges')}
      </h3>
      
      {/* Points and Level */}
      <div className="flex items-center justify-between p-6 bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-green-500/20 dark:from-green-500/30 dark:via-emerald-500/30 dark:to-green-500/30 rounded-xl border border-green-500/20 dark:border-chalk-border/40">
        <div>
          <div className="text-sm text-gray-600 dark:text-chalk-secondary mb-1">{t('points')}</div>
          <div className="text-3xl font-bold text-green-600 dark:text-chalk-emerald">
            {user.points || 0}
          </div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-600 dark:text-chalk-secondary mb-1">{t('level')}</div>
          <div className="text-3xl font-bold text-emerald-600 dark:text-chalk-emerald">
            {user.level || 1}
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-600 dark:text-chalk-secondary mb-1">{t('progress')}</div>
          <div className="text-xl font-semibold text-gray-800 dark:text-chalk-white">
            {Math.round((user.points || 0) % 100)}/100
          </div>
        </div>
      </div>

      {/* Level Progress Bar */}
      <div className="space-y-3">
        <div className="flex justify-between text-sm text-gray-600 dark:text-chalk-secondary">
          <span className="font-semibold">{t('level')} {user.level || 1}</span>
          <span className="font-semibold">{t('level')} {(user.level || 1) + 1}</span>
        </div>
        <div className="h-4 bg-gray-200 dark:bg-chalk-border/30 rounded-full overflow-hidden shadow-inner">
          <motion.div
            className="h-full bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 dark:from-chalk-emerald dark:via-emerald-400 dark:to-chalk-emerald shadow-md"
            initial={{ width: 0 }}
            animate={{ width: `${((user.points || 0) % 100)}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-4 gap-3">
        {badges.map((badge) => {
          const isNewlyUnlocked = newlyUnlockedBadges.includes(badge.id)
          return (
            <motion.div
              key={badge.id}
              className={`p-4 rounded-xl text-center transition-all duration-300 relative ${
                badge.unlocked
                  ? 'bg-gradient-to-br from-green-500/30 to-emerald-500/30 dark:from-green-500/40 dark:to-emerald-500/40 border-2 border-green-500 dark:border-chalk-emerald shadow-md'
                  : 'bg-gray-200 dark:bg-chalkboard-bg/50 opacity-50 border-2 border-gray-300 dark:border-chalk-border/30'
              }`}
              whileHover={{ scale: badge.unlocked ? 1.1 : 1.05, y: badge.unlocked ? -2 : 0 }}
              title={badge.name[language] || badge.name.en}
              animate={isNewlyUnlocked ? {
                scale: [1, 1.3, 1],
                boxShadow: [
                  '0 4px 6px rgba(0, 0, 0, 0.1)',
                  '0 0 20px rgba(34, 197, 94, 0.8)',
                  '0 4px 6px rgba(0, 0, 0, 0.1)'
                ]
              } : {}}
              transition={{ duration: 0.5, repeat: isNewlyUnlocked ? 2 : 0 }}
            >
              {isNewlyUnlocked && (
                <motion.div
                  className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-sm font-bold"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  ✨
                </motion.div>
              )}
              <motion.div 
                className="text-4xl mb-2"
                animate={isNewlyUnlocked ? {
                  scale: [1, 1.3, 1],
                  rotate: [0, 360]
                } : {}}
                transition={{ duration: 0.6 }}
              >
                {badge.icon}
              </motion.div>
              <div className="text-xs font-semibold text-gray-700 dark:text-chalk-white">
                {badge.name[language] || badge.name.en}
              </div>
              {badge.unlocked && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="text-green-600 dark:text-chalk-emerald text-lg mt-1"
                >
                  ✓
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

