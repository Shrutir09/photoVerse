'use client'

import { motion } from 'framer-motion'

export default function LearnLoading() {
  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-green-50 via-emerald-50 to-cyan-50 dark:bg-chalkboard-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 md:space-y-16 pb-12">
        {/* Header Skeleton */}
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="h-12 md:h-16 bg-gradient-to-r from-emerald-200 to-green-200 dark:from-emerald-800/30 dark:to-green-800/30 rounded-xl mb-4 md:mb-6 max-w-3xl mx-auto animate-pulse" />
          <div className="h-6 md:h-8 bg-gray-200 dark:bg-chalkboard-surface rounded-lg max-w-2xl mx-auto animate-pulse" />
        </motion.div>

        {/* Articles Skeleton */}
        <div className="space-y-6">
          <div className="h-10 bg-gray-200 dark:bg-chalkboard-surface rounded-lg w-64 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
                className="glass rounded-2xl p-6 border-2 border-emerald-500/20 animate-pulse"
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gray-300 dark:bg-chalkboard-surface rounded-xl" />
                  <div className="flex-1 space-y-2">
                    <div className="h-6 bg-gray-300 dark:bg-chalkboard-surface rounded-lg" />
                    <div className="h-4 bg-gray-200 dark:bg-chalkboard-bg rounded w-3/4" />
                    <div className="h-4 bg-gray-200 dark:bg-chalkboard-bg rounded w-1/2" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Formula Skeleton */}
        <div className="space-y-6">
          <div className="h-10 bg-gray-200 dark:bg-chalkboard-surface rounded-lg w-80 animate-pulse" />
          <div className="glass rounded-3xl p-8 md:p-12 border-2 border-emerald-500/20">
            <div className="h-96 bg-gray-200 dark:bg-chalkboard-surface rounded-2xl animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  )
}

