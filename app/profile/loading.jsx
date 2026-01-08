'use client'

import { motion } from 'framer-motion'

export default function ProfileLoading() {
  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-green-50 via-emerald-50 to-cyan-50 dark:bg-chalkboard-bg">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Skeleton */}
        <motion.div
          className="glass rounded-3xl p-8 md:p-12 border-2 border-green-500/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="w-24 h-24 bg-gray-300 dark:bg-chalkboard-surface rounded-full animate-pulse" />
            <div className="flex-1 space-y-4 w-full">
              <div className="h-10 bg-gray-200 dark:bg-chalkboard-surface rounded-lg animate-pulse" />
              <div className="h-6 bg-gray-200 dark:bg-chalkboard-surface rounded w-2/3 animate-pulse" />
              <div className="flex gap-4">
                <div className="h-20 w-24 bg-gray-200 dark:bg-chalkboard-surface rounded-lg animate-pulse" />
                <div className="h-20 w-24 bg-gray-200 dark:bg-chalkboard-surface rounded-lg animate-pulse" />
                <div className="h-20 w-24 bg-gray-200 dark:bg-chalkboard-surface rounded-lg animate-pulse" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="glass rounded-2xl p-6 border-2 border-green-500/20">
              <div className="h-8 bg-gray-200 dark:bg-chalkboard-surface rounded-lg mb-4 animate-pulse" />
              <div className="space-y-4">
                {[1, 2, 3, 4].map((j) => (
                  <div key={j} className="h-6 bg-gray-200 dark:bg-chalkboard-surface rounded animate-pulse" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

