'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useAuth } from '../context/AuthContext'
import { useTranslation } from '../context/TranslationContext'
import { t } from '../utils/translations'

export default function MyPlantCard() {
  const { user } = useAuth()
  const { language } = useTranslation()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full"
    >
      <Link href="/my-plant" prefetch={true}>
        <motion.div
          whileHover={{ scale: 1.02, y: -4 }}
          whileTap={{ scale: 0.98 }}
          className="glass rounded-3xl p-6 md:p-8 border-2 border-emerald-500/30 dark:border-chalk-border/40 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-green-50/90 via-emerald-50/80 to-cyan-50/70 dark:from-chalkboard-surface dark:to-chalkboard-bg relative overflow-hidden cursor-pointer"
        >
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/10 to-emerald-500/10 dark:from-green-500/20 dark:to-emerald-500/20 rounded-full blur-3xl -mr-16 -mt-16" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-emerald-400/10 to-green-500/10 dark:from-emerald-500/20 dark:to-green-500/20 rounded-full blur-2xl -ml-12 -mb-12" />

          <div className="relative z-10 flex items-center gap-6">
            {/* Plant Icon */}
            <motion.div
              className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-5xl md:text-6xl shadow-lg"
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              🌱
            </motion.div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-chalk-white mb-2">
                {t('home.myPlant', language)}
              </h3>
              <p className="text-gray-600 dark:text-chalk-secondary text-sm md:text-base">
                {t('home.myPlantDescription', language)}
              </p>
            </div>

            {/* Arrow */}
            <motion.div
              className="text-2xl md:text-3xl text-green-600 dark:text-chalk-emerald"
              animate={{ x: [0, 5, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              →
            </motion.div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}

