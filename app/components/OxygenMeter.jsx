'use client'

import { motion } from 'framer-motion'

export default function OxygenMeter({ oxygen, photosynthesisRate }) {
  // Generate floating oxygen bubbles
  const bubbles = Array.from({ length: Math.min(Math.floor(oxygen / 10), 8) }, (_, i) => i);

  return (
    <div className="relative w-full h-64 md:h-80 overflow-hidden rounded-3xl glass p-6 md:p-8 border-2 border-blue-500/20 shadow-xl">
      <h3 className="text-xl md:text-2xl font-bold mb-6 text-center text-gray-800 dark:text-chalk-white">🌬 Oxygen Production</h3>
      
      {/* Floating Bubbles */}
      <div className="absolute inset-0 overflow-hidden">
        {bubbles.map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-400/40 border-2 border-blue-300/50 backdrop-blur-sm"
            initial={{
              x: Math.random() * 100 + '%',
              y: '100%',
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: '-20%',
              x: Math.random() * 100 + '%',
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Oxygen Percentage Display */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <motion.div
          className="text-5xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent"
          animate={{
            scale: oxygen > 70 ? [1, 1.1, 1] : 1,
          }}
          transition={{
            duration: 2,
            repeat: oxygen > 70 ? Infinity : 0,
          }}
          style={{
            filter: oxygen > 70 ? 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.5))' : 'none',
          }}
        >
          {oxygen}%
        </motion.div>
        <div className="text-sm md:text-base text-gray-600 dark:text-chalk-secondary font-medium">
          Oxygen Output
        </div>
      </div>

      {/* Progress Bar with Glow Effect */}
      <div className="absolute bottom-4 left-4 right-4 h-3 bg-gray-200 dark:bg-chalk-border/30 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-400 to-cyan-500 relative"
          initial={{ width: 0 }}
          animate={{ width: `${oxygen}%` }}
          transition={{ duration: 0.5 }}
          style={{
            boxShadow: oxygen > 70 ? `0 0 ${10 + (oxygen - 70) * 0.5}px rgba(59, 130, 246, 0.8)` : 'none',
          }}
        />
      </div>
    </div>
  )
}
