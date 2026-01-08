'use client'

import { motion } from 'framer-motion'

export default function ArticleLoading() {
  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-green-50 via-emerald-50 to-cyan-50 dark:bg-chalkboard-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-12">
        {/* Header Skeleton */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="h-12 md:h-16 bg-gradient-to-r from-emerald-200 to-green-200 dark:from-emerald-800/30 dark:to-green-800/30 rounded-xl mb-4 max-w-2xl mx-auto animate-pulse" />
          <div className="h-6 bg-gray-200 dark:bg-chalkboard-surface rounded-lg max-w-xl mx-auto animate-pulse" />
        </motion.div>

        {/* Content Skeleton */}
        <div className="glass rounded-3xl p-8 md:p-12 border-2 border-emerald-500/20">
          <div className="space-y-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="space-y-2">
                <div className={`h-4 bg-gray-200 dark:bg-chalkboard-surface rounded animate-pulse ${
                  i % 3 === 0 ? 'w-full' : i % 3 === 1 ? 'w-5/6' : 'w-4/6'
                }`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

