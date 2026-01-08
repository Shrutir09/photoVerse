'use client'

import { motion } from 'framer-motion'

export default function BadgesLoading() {
  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-green-50 via-emerald-50 to-cyan-50 dark:bg-chalkboard-bg">
      <div className="max-w-6xl mx-auto space-y-8">
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

        {/* Badges Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="glass rounded-2xl p-6 border-2 border-green-500/20">
              <div className="h-24 bg-gray-200 dark:bg-chalkboard-surface rounded-full mb-4 mx-auto animate-pulse" />
              <div className="h-6 bg-gray-200 dark:bg-chalkboard-surface rounded mb-2 animate-pulse" />
              <div className="h-4 bg-gray-200 dark:bg-chalkboard-surface rounded w-3/4 mx-auto animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

