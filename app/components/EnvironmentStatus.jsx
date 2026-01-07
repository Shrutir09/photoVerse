'use client'

import { motion } from 'framer-motion'

export default function EnvironmentStatus({ plantHealth, environmentBalance, photosynthesisRate }) {
  return (
    <div className="space-y-4">
      {/* Plant Health */}
      <motion.div
        className={`glass rounded-xl p-4 ${plantHealth.bgColor}`}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{plantHealth.emoji}</span>
            <div>
              <div className="font-semibold text-lg">Plant Health</div>
              <div className={`text-sm capitalize ${plantHealth.color}`}>
                {plantHealth.status}
              </div>
            </div>
          </div>
          <div className="text-2xl font-bold">{plantHealth.emoji}</div>
        </div>
        <div className="mt-3 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className={`h-full ${plantHealth.color.replace('text-', 'bg-')}`}
            initial={{ width: 0 }}
            animate={{ width: `${photosynthesisRate}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>

      {/* Environment Balance */}
      <motion.div
        className={`glass rounded-xl p-4 ${environmentBalance.bgColor}`}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{environmentBalance.emoji}</span>
            <div>
              <div className="font-semibold text-lg">Environment Balance</div>
              <div className={`text-sm capitalize ${environmentBalance.color}`}>
                {environmentBalance.status}
              </div>
            </div>
          </div>
          <div className="text-2xl font-bold">{environmentBalance.emoji}</div>
        </div>
        <div className="mt-3 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className={`h-full ${environmentBalance.color.replace('text-', 'bg-')}`}
            initial={{ width: 0 }}
            animate={{ width: `${photosynthesisRate}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>
    </div>
  )
}

