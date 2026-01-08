'use client'

import ProtectedRoute from '../components/ProtectedRoute'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { useTranslation } from '../context/TranslationContext'
import { t } from '../utils/translations'
import Footer from '../components/Footer'

export default function BadgesPage() {
  const { user } = useAuth()
  const { language } = useTranslation()
  const [badges, setBadges] = useState([])

  const allBadges = [
    {
      id: 'first_plant',
      name: 'First Plant',
      description: 'Complete your first simulation',
      icon: '🌱',
      color: 'from-green-400 to-emerald-500',
      unlocked: (user?.points || 0) >= 10,
    },
    {
      id: 'green_thumb',
      name: 'Green Thumb',
      description: 'Reach 50 points',
      icon: '👍',
      color: 'from-green-500 to-teal-500',
      unlocked: (user?.points || 0) >= 50,
    },
    {
      id: 'master_gardener',
      name: 'Master Gardener',
      description: 'Reach 200 points',
      icon: '🏆',
      color: 'from-yellow-400 to-orange-500',
      unlocked: (user?.points || 0) >= 200,
    },
    {
      id: 'oxygen_hero',
      name: 'Oxygen Hero',
      description: 'Achieve 80% oxygen output',
      icon: '🌬',
      color: 'from-blue-400 to-cyan-500',
      unlocked: false, // Would be set based on actual achievement
    },
    {
      id: 'balance_master',
      name: 'Balance Master',
      description: 'Win Balance the Earth game',
      icon: '🌍',
      color: 'from-emerald-400 to-green-500',
      unlocked: false,
    },
    {
      id: 'oxygen_champion',
      name: 'Oxygen Champion',
      description: 'Win Oxygen Master game',
      icon: '💨',
      color: 'from-blue-500 to-indigo-500',
      unlocked: false,
    },
    {
      id: 'learner',
      name: 'Learner',
      description: 'Complete all learning cards',
      icon: '📚',
      color: 'from-purple-400 to-pink-500',
      unlocked: false,
    },
    {
      id: 'level_5',
      name: 'Level 5 Champion',
      description: 'Reach level 5',
      icon: '⭐',
      color: 'from-yellow-500 to-amber-500',
      unlocked: (user?.level || 1) >= 5,
    },
    {
      id: 'level_10',
      name: 'Level 10 Master',
      description: 'Reach level 10',
      icon: '🌟',
      color: 'from-yellow-400 to-yellow-600',
      unlocked: (user?.level || 1) >= 10,
    },
  ]

  useEffect(() => {
    setBadges(allBadges)
  }, [user])

  const unlockedCount = badges.filter((b) => b.unlocked).length

  return (
    <ProtectedRoute>
      <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-green-50 via-emerald-50 to-cyan-50 dark:from-gray-900 dark:via-green-900 dark:to-emerald-900">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-3xl p-8 border-2 border-green-500/20 text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
              🏆 {t('badges.title', language)}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {unlockedCount} {t('badges.subtitle', language)} {badges.length}
            </p>
            <div className="mt-4 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden max-w-md mx-auto">
              <motion.div
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                initial={{ width: 0 }}
                animate={{ width: `${(unlockedCount / badges.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </motion.div>

          {/* Badges Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {badges.map((badge, index) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`glass rounded-2xl p-6 border-2 transition-all ${
                  badge.unlocked
                    ? `border-green-500/50 bg-gradient-to-br ${badge.color} bg-opacity-10`
                    : 'border-gray-300 dark:border-gray-700 opacity-60'
                }`}
              >
                <div className="text-center">
                  <div
                    className={`text-6xl mb-4 ${
                      badge.unlocked ? '' : 'grayscale opacity-50'
                    }`}
                  >
                    {badge.icon}
                  </div>
                  <h3
                    className={`text-xl font-bold mb-2 ${
                      badge.unlocked
                        ? 'text-gray-800 dark:text-white'
                        : 'text-gray-400 dark:text-gray-500'
                    }`}
                  >
                    {badge.name}
                  </h3>
                  <p
                    className={`text-sm mb-4 ${
                      badge.unlocked
                        ? 'text-gray-600 dark:text-gray-300'
                        : 'text-gray-400 dark:text-gray-500'
                    }`}
                  >
                    {badge.description}
                  </p>
                  {badge.unlocked ? (
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 rounded-full">
                      <span className="text-green-600 dark:text-green-400 font-semibold">✓ {t('badges.unlocked', language)}</span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                      <span className="text-gray-500 dark:text-gray-400 font-semibold">🔒 {t('badges.locked', language)}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </ProtectedRoute>
  )
}

