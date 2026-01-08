'use client'

import ProtectedRoute from '../components/ProtectedRoute'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { useTranslation } from '../context/TranslationContext'
import { t } from '../utils/translations'
import Footer from '../components/Footer'

export default function LeaderboardPage() {
  const { user } = useAuth()
  const { language } = useTranslation()
  const [leaderboard, setLeaderboard] = useState([])
  const [userRank, setUserRank] = useState(null)

  useEffect(() => {
    // Generate sample leaderboard data
    const sampleData = [
      { name: 'GreenMaster', points: 1250, level: 12, badges: 8 },
      { name: 'PlantLover', points: 980, level: 10, badges: 7 },
      { name: 'OxygenKing', points: 850, level: 9, badges: 6 },
      { name: 'PhotoPro', points: 720, level: 8, badges: 5 },
      { name: 'EcoWarrior', points: 650, level: 7, badges: 5 },
      { name: user?.name || 'You', points: user?.points || 0, level: user?.level || 1, badges: (user?.badges || []).length },
      { name: 'NatureFan', points: 420, level: 5, badges: 3 },
      { name: 'LeafLearner', points: 380, level: 4, badges: 3 },
      { name: 'SunSeeker', points: 320, level: 4, badges: 2 },
      { name: 'PlantNewbie', points: 150, level: 2, badges: 1 },
    ]

    // Sort by points
    const sorted = sampleData.sort((a, b) => b.points - a.points)
    
    // Find user rank
    const rank = sorted.findIndex((u) => u.name === (user?.name || 'You')) + 1
    setUserRank(rank)
    
    setLeaderboard(sorted)
  }, [user])

  const getRankIcon = (rank) => {
    if (rank === 1) return '🥇'
    if (rank === 2) return '🥈'
    if (rank === 3) return '🥉'
    return `#${rank}`
  }

  const getRankColor = (rank) => {
    if (rank === 1) return 'from-yellow-400 to-yellow-600'
    if (rank === 2) return 'from-gray-300 to-gray-500'
    if (rank === 3) return 'from-orange-400 to-orange-600'
    return 'from-green-400 to-emerald-500'
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-green-50 via-emerald-50 to-cyan-50 dark:from-gray-900 dark:via-green-900 dark:to-emerald-900">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-3xl p-8 border-2 border-green-500/20 text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
              📊 {t('leaderboard.title', language)}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {t('leaderboard.subtitle', language)}
            </p>
            {userRank && (
              <div className="mt-4 inline-block px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full text-white font-semibold">
                {t('leaderboard.yourRank', language)}: #{userRank}
              </div>
            )}
          </motion.div>

          {/* Leaderboard List */}
          <div className="space-y-3">
            {leaderboard.map((player, index) => {
              const rank = index + 1
              const isCurrentUser = player.name === (user?.name || 'You')
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`glass rounded-xl p-4 border-2 transition-all ${
                    isCurrentUser
                      ? 'border-green-500 bg-green-500/10 shadow-lg'
                      : 'border-green-500/20'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Rank */}
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getRankColor(rank)} flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
                      {getRankIcon(rank)}
                    </div>

                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                      {player.name[0].toUpperCase()}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className={`font-bold text-lg ${
                          isCurrentUser
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-gray-800 dark:text-white'
                        }`}>
                          {player.name}
                          {isCurrentUser && <span className="ml-2 text-sm">(You)</span>}
                        </h3>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                        <span>{t('leaderboard.level', language)} {player.level}</span>
                        <span>•</span>
                        <span>{player.badges} {t('leaderboard.badges', language)}</span>
                      </div>
                    </div>

                    {/* Points */}
                    <div className="text-right flex-shrink-0">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {player.points}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{t('leaderboard.points', language)}</div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Stats Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass rounded-2xl p-6 border-2 border-green-500/20"
          >
            <h2 className="text-xl font-bold mb-4 text-green-600 dark:text-green-400">
              📈 {t('leaderboard.leaderboardStats', language)}
            </h2>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {leaderboard.length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{t('leaderboard.totalPlayers', language)}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {leaderboard[0]?.points || 0}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{t('leaderboard.topScore', language)}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  {Math.round(leaderboard.reduce((sum, p) => sum + p.points, 0) / leaderboard.length) || 0}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{t('leaderboard.averageScore', language)}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </ProtectedRoute>
  )
}

