'use client'

import ProtectedRoute from '../components/ProtectedRoute'
import { motion } from 'framer-motion'
import { useTranslation } from '../context/TranslationContext'
import { t } from '../utils/translations'
import Footer from '../components/Footer'

export default function AboutPage() {
  const { language } = useTranslation()
  return (
    <ProtectedRoute>
      <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-green-50 via-emerald-50 to-cyan-50 dark:from-gray-900 dark:via-green-900 dark:to-emerald-900">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-3xl p-8 md:p-12 border-2 border-green-500/20"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
              {t('about.title', language)}
            </h1>

            <div className="space-y-6 text-gray-700 dark:text-gray-300">
              <p className="text-lg leading-relaxed">
                {t('about.introText', language)}
              </p>

              <div>
                <h2 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">
                  {t('about.mission', language)}
                </h2>
                <p className="leading-relaxed">
                  {t('about.missionText', language)}
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">
                  {t('about.whatWeOffer', language)}
                </h2>
                <ul className="space-y-3 list-disc list-inside">
                  <li><strong>{t('about.offer1', language)}</strong> {t('about.offer1Text', language)}</li>
                  <li><strong>{t('about.offer2', language)}</strong> {t('about.offer2Text', language)}</li>
                  <li><strong>{t('about.offer3', language)}</strong> {t('about.offer3Text', language)}</li>
                  <li><strong>{t('about.offer4', language)}</strong> {t('about.offer4Text', language)}</li>
                  <li><strong>{t('about.offer5', language)}</strong> {t('about.offer5Text', language)}</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">
                  {t('about.technology', language)}
                </h2>
                <p className="leading-relaxed">
                  {t('about.technologyText', language)}
                </p>
              </div>

              <div className="mt-8 p-6 bg-green-500/10 rounded-xl border border-green-500/20">
                <p className="text-center text-lg font-semibold text-green-700 dark:text-green-400">
                  🌱 {t('about.tagline', language)} 🌱
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </ProtectedRoute>
  )
}

