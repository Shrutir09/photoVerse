'use client'

import { motion } from 'framer-motion'

export default function MyPlantLoading() {
  return (
    <div className="min-h-screen p-6 md:p-10 bg-gradient-to-br from-green-50/90 via-emerald-50/70 to-cyan-50/80 dark:bg-chalkboard-bg">
      <div className="max-w-6xl mx-auto space-y-8 md:space-y-10">
        {/* Header Skeleton */}
        <motion.div
          className="text-center mb-8 md:mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="h-16 md:h-20 bg-gradient-to-r from-green-200 to-emerald-200 dark:from-green-800/30 dark:to-emerald-800/30 rounded-xl mb-4 md:mb-6 max-w-2xl mx-auto animate-pulse" />
          <div className="h-6 md:h-8 bg-gray-200 dark:bg-chalkboard-surface rounded-lg max-w-xl mx-auto animate-pulse" />
        </motion.div>

        {/* Dashboard Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Plant Visual Skeleton */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="glass rounded-3xl p-8 md:p-12 bg-white/90 dark:bg-chalkboard-surface shadow-xl h-full flex flex-col items-center justify-center">
              <div className="w-48 h-48 md:w-64 md:h-64 bg-gray-300 dark:bg-chalkboard-bg rounded-full animate-pulse mb-6" />
              <div className="h-12 w-48 bg-gray-200 dark:bg-chalkboard-bg rounded-full animate-pulse mb-4" />
              <div className="h-8 w-64 bg-gray-200 dark:bg-chalkboard-bg rounded-lg animate-pulse" />
            </div>
          </motion.div>

          {/* Checklist Skeleton */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="glass rounded-3xl p-6 md:p-8 bg-white/90 dark:bg-chalkboard-surface shadow-xl h-full">
              <div className="h-10 bg-gray-200 dark:bg-chalkboard-bg rounded-lg mb-6 animate-pulse" />
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-20 bg-gray-100 dark:bg-chalkboard-bg rounded-xl animate-pulse"
                  />
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-chalk-border/30">
                <div className="h-4 bg-gray-200 dark:bg-chalkboard-bg rounded mb-2 animate-pulse" />
                <div className="h-10 bg-gray-200 dark:bg-chalkboard-bg rounded-lg animate-pulse" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

