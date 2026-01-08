'use client'

import { motion } from 'framer-motion'

export default function LeaderboardLoading() {
  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-green-50 via-emerald-50 to-cyan-50 dark:bg-chalkboard-bg">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Skeleton */}
        <motion.div
          className="glass rounded-3xl p-8 border-2 border-green-500/20 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="h-16 bg-gray-200 dark:bg-chalkboard-surface rounded-xl mb-4 max-w-md mx-auto animate-pulse" />
          <div className="h-6 bg-gray-200 dark:bg-chalkboard-surface rounded-lg max-w-xs mx-auto animate-pulse" />
        </motion.div>

        {/* Leaderboard List Skeleton */}
        <div className="space-y-3">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="glass rounded-xl p-4 border-2 border-green-500/20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 dark:bg-chalkboard-surface rounded-full animate-pulse" />
                <div className="w-12 h-12 bg-gray-200 dark:bg-chalkboard-surface rounded-full animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-6 bg-gray-200 dark:bg-chalkboard-surface rounded w-1/3 animate-pulse" />
                  <div className="h-4 bg-gray-200 dark:bg-chalkboard-surface rounded w-1/2 animate-pulse" />
                </div>
                <div className="h-10 w-20 bg-gray-200 dark:bg-chalkboard-surface rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

