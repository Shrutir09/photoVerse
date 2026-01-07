'use client'

import ProtectedRoute from '../components/ProtectedRoute'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

export default function ProfilePage() {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    totalGames: 0,
    gamesWon: 0,
    bestScore: 0,
    totalTime: 0,
  })

  useEffect(() => {
    // Load user stats from localStorage
    const savedStats = localStorage.getItem(`userStats_${user?.email}`)
    if (savedStats) {
      setStats(JSON.parse(savedStats))
    }
  }, [user])

  if (!user) {
    return (
      <ProtectedRoute>
        <div className="flex items-center justify-center h-screen">
          <p>Loading...</p>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-green-50 via-emerald-50 to-cyan-50 dark:from-gray-900 dark:via-green-900 dark:to-emerald-900">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-3xl p-8 md:p-12 border-2 border-green-500/20"
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white text-4xl font-bold shadow-xl">
                  {user.name?.[0]?.toUpperCase() || 'U'}
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-gray-900 flex items-center justify-center">
                  ✓
                </div>
              </div>

              {/* User Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
                  {user.name || 'User'}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{user.email}</p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <div className="px-4 py-2 bg-green-500/10 rounded-lg">
                    <div className="text-sm text-gray-600 dark:text-gray-400">Level</div>
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {user.level || 1}
                    </div>
                  </div>
                  <div className="px-4 py-2 bg-blue-500/10 rounded-lg">
                    <div className="text-sm text-gray-600 dark:text-gray-400">Points</div>
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {user.points || 0}
                    </div>
                  </div>
                  <div className="px-4 py-2 bg-yellow-500/10 rounded-lg">
                    <div className="text-sm text-gray-600 dark:text-gray-400">Badges</div>
                    <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                      {(user.badges || []).length}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass rounded-2xl p-6 border-2 border-green-500/20"
            >
              <h2 className="text-xl font-bold mb-4 text-green-600 dark:text-green-400">
                📊 Statistics
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Total Games</span>
                  <span className="font-bold text-lg">{stats.totalGames}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Games Won</span>
                  <span className="font-bold text-lg text-green-600 dark:text-green-400">
                    {stats.gamesWon}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Best Score</span>
                  <span className="font-bold text-lg text-blue-600 dark:text-blue-400">
                    {stats.bestScore}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Win Rate</span>
                  <span className="font-bold text-lg">
                    {stats.totalGames > 0
                      ? Math.round((stats.gamesWon / stats.totalGames) * 100)
                      : 0}
                    %
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass rounded-2xl p-6 border-2 border-green-500/20"
            >
              <h2 className="text-xl font-bold mb-4 text-green-600 dark:text-green-400">
                🎯 Progress
              </h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Level Progress</span>
                    <span className="text-sm font-semibold">
                      {(user.points || 0) % 100}/100
                    </span>
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
                <div className="pt-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Next Level: {((user.level || 1) + 1)}
                  </div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {100 - ((user.points || 0) % 100)} points needed
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-2xl p-6 border-2 border-green-500/20"
          >
            <h2 className="text-xl font-bold mb-4 text-green-600 dark:text-green-400">
              🌱 Recent Activity
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-green-500/5 rounded-lg">
                <span className="text-2xl">🎮</span>
                <div className="flex-1">
                  <div className="font-semibold">Started playing games</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date().toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-500/5 rounded-lg">
                <span className="text-2xl">📚</span>
                <div className="flex-1">
                  <div className="font-semibold">Exploring learning center</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date().toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

