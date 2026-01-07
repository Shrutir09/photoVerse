'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useAuth } from '../context/AuthContext'

export default function BadgesSummary({ language = 'en' }) {
  const { user } = useAuth()
  const [badgeCount, setBadgeCount] = useState(0)

  useEffect(() => {
    if (user) {
      // Count unlocked badges
      const badges = user.badges || []
      setBadgeCount(badges.length)
    }
  }, [user])

  const translations = {
    en: {
      level: 'Level',
      points: 'Points',
      badges: 'Badges Unlocked',
      viewAll: 'View All Badges',
    },
    hi: {
      level: 'स्तर',
      points: 'अंक',
      badges: 'बैज अनलॉक',
      viewAll: 'सभी बैज देखें',
    },
  }

  const t = translations[language] || translations.en

  if (!user) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-3xl p-6 md:p-8 border-2 border-green-500/20"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
          🏅 Your Progress
        </h2>
        <Link href="/badges">
          <motion.button
            className="px-4 py-2 glass rounded-lg text-sm font-semibold hover:bg-green-500/10 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t.viewAll}
          </motion.button>
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-4 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{t.level}</div>
          <div className="text-3xl font-bold text-green-600 dark:text-green-400">
            {user.level || 1}
          </div>
        </div>
        <div className="text-center p-4 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{t.points}</div>
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {user.points || 0}
          </div>
        </div>
        <div className="text-center p-4 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{t.badges}</div>
          <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
            {badgeCount}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

