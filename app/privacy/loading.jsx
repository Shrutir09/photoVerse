'use client'

import { motion } from 'framer-motion'

export default function PrivacyLoading() {
  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-green-50 via-emerald-50 to-cyan-50 dark:bg-chalkboard-bg">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="glass rounded-3xl p-8 md:p-12 border-2 border-green-500/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="h-16 bg-gray-200 dark:bg-chalkboard-surface rounded-xl mb-6 animate-pulse" />
          <div className="space-y-6">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-8 bg-gray-200 dark:bg-chalkboard-surface rounded-lg animate-pulse" />
                <div className="h-4 bg-gray-200 dark:bg-chalkboard-surface rounded w-full animate-pulse" />
                <div className="h-4 bg-gray-200 dark:bg-chalkboard-surface rounded w-5/6 animate-pulse" />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

