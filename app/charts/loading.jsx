'use client'

import { motion } from 'framer-motion'

export default function ChartsLoading() {
  return (
    <div className="min-h-screen p-4 md:p-6 bg-gradient-to-br from-green-50/90 via-emerald-50/70 to-cyan-50/80 dark:bg-chalkboard-bg">
      <div className="max-w-[1280px] mx-auto space-y-6 md:space-y-8">
        {/* Header Skeleton */}
        <motion.div
          className="text-center mb-6 md:mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="h-16 md:h-20 bg-gradient-to-r from-green-200 via-emerald-200 to-green-200 dark:from-green-800/30 dark:via-emerald-800/30 dark:to-green-800/30 rounded-xl mb-3 md:mb-4 max-w-2xl mx-auto animate-pulse" />
          <div className="h-6 md:h-8 bg-gray-200 dark:bg-chalkboard-surface rounded-lg max-w-xl mx-auto animate-pulse" />
        </motion.div>

        {/* Dashboard Skeleton */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {/* Environment Stats Skeleton */}
          <div className="lg:col-span-1">
            <div className="glass rounded-xl p-4 md:p-5 border-2 border-emerald-500/20 shadow-sm bg-white/90 dark:bg-chalkboard-surface space-y-4 md:space-y-5 h-full">
              <div className="h-8 bg-gray-200 dark:bg-chalkboard-bg rounded-lg animate-pulse mb-3" />
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="h-6 w-24 bg-gray-200 dark:bg-chalkboard-bg rounded animate-pulse" />
                    <div className="h-6 w-16 bg-gray-200 dark:bg-chalkboard-bg rounded animate-pulse" />
                  </div>
                  <div className="h-5 bg-gray-200 dark:bg-chalkboard-bg rounded-full animate-pulse" />
                </div>
              ))}
            </div>
          </div>

          {/* Charts Skeleton */}
          <div className="lg:col-span-4 space-y-5 md:space-y-6">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="glass rounded-xl p-5 md:p-6 bg-white/90 dark:bg-chalkboard-surface shadow-sm"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="h-6 w-48 bg-gray-200 dark:bg-chalkboard-bg rounded-lg animate-pulse" />
                  <div className="h-16 w-20 bg-gray-200 dark:bg-chalkboard-bg rounded-lg animate-pulse" />
                </div>
                <div className="h-60 bg-gray-200 dark:bg-chalkboard-bg rounded-lg animate-pulse" />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

