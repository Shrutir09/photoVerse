'use client'

import ProtectedRoute from '../components/ProtectedRoute'
import { motion } from 'framer-motion'
import { useTranslation } from '../context/TranslationContext'
import { t } from '../utils/translations'
import Footer from '../components/Footer'

export default function PrivacyPage() {
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
              {t('privacy.title', language)}
            </h1>

            <div className="space-y-6 text-gray-700 dark:text-gray-300">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t('privacy.lastUpdated', language)}: {new Date().toLocaleDateString()}
              </p>

              <div>
                <h2 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">
                  {t('privacy.introduction', language)}
                </h2>
                <p className="leading-relaxed">
                  {t('privacy.introductionText', language)}
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">
                  {t('privacy.informationWeCollect', language)}
                </h2>
                <p className="leading-relaxed mb-3">
                  {t('privacy.informationWeCollectText', language)}
                </p>
                <ul className="space-y-2 list-disc list-inside ml-4">
                  <li><strong>{t('privacy.accountInformation', language)}</strong> {t('privacy.accountInformationText', language)}</li>
                  <li><strong>{t('privacy.usageData', language)}</strong> {t('privacy.usageDataText', language)}</li>
                  <li><strong>{t('privacy.localStorage', language)}</strong> {t('privacy.localStorageText', language)}</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">
                  {t('privacy.howWeUse', language)}
                </h2>
                <ul className="space-y-2 list-disc list-inside ml-4">
                  <li>{t('privacy.use1', language)}</li>
                  <li>{t('privacy.use2', language)}</li>
                  <li>{t('privacy.use3', language)}</li>
                  <li>{t('privacy.use4', language)}</li>
                  <li>{t('privacy.use5', language)}</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">
                  {t('privacy.dataStorage', language)}
                </h2>
                <p className="leading-relaxed">
                  {t('privacy.dataStorageText', language)}
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">
                  {t('privacy.thirdPartyServices', language)}
                </h2>
                <p className="leading-relaxed">
                  {t('privacy.thirdPartyServicesText', language)}
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">
                  {t('privacy.yourRights', language)}
                </h2>
                <p className="leading-relaxed mb-3">
                  {t('privacy.yourRightsText', language)}
                </p>
                <ul className="space-y-2 list-disc list-inside ml-4">
                  <li>{t('privacy.right1', language)}</li>
                  <li>{t('privacy.right2', language)}</li>
                  <li>{t('privacy.right3', language)}</li>
                  <li>{t('privacy.right4', language)}</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">
                  {t('privacy.childrensPrivacy', language)}
                </h2>
                <p className="leading-relaxed">
                  {t('privacy.childrensPrivacyText', language)}
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">
                  {t('privacy.changesToPolicy', language)}
                </h2>
                <p className="leading-relaxed">
                  {t('privacy.changesToPolicyText', language)}
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">
                  {t('privacy.contactUs', language)}
                </h2>
                <p className="leading-relaxed">
                  {t('privacy.contactUsText', language)}
                </p>
                <div className="mt-3 p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                  <p className="font-semibold">{t('privacy.email', language)} <a href="mailto:support@photosphere.app" className="text-green-600 dark:text-green-400 hover:underline">support@photosphere.app</a></p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </ProtectedRoute>
  )
}

