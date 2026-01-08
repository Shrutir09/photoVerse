'use client'

import ProtectedRoute from '../components/ProtectedRoute'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTranslation } from '../context/TranslationContext'
import { t } from '../utils/translations'
import Footer from '../components/Footer'

export default function HelpPage() {
  const { language } = useTranslation()
  const [openFaq, setOpenFaq] = useState(null)

  const faqs = [
    {
      question: t('help.faq1', language),
      answer: t('help.faq1Answer', language),
    },
    {
      question: t('help.faq2', language),
      answer: t('help.faq2Answer', language),
    },
    {
      question: t('help.faq3', language),
      answer: t('help.faq3Answer', language),
    },
    {
      question: t('help.faq4', language),
      answer: t('help.faq4Answer', language),
    },
    {
      question: t('help.faq5', language),
      answer: t('help.faq5Answer', language),
    },
    {
      question: t('help.faq6', language),
      answer: t('help.faq6Answer', language),
    },
  ]

  return (
    <ProtectedRoute>
      <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-green-50 via-emerald-50 to-cyan-50 dark:from-gray-900 dark:via-green-900 dark:to-emerald-900">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-3xl p-8 md:p-12 border-2 border-green-500/20"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
              {t('help.title', language)}
            </h1>

            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">
                  {t('help.getInTouch', language)}
                </h2>
                <div className="space-y-4">
                  <a
                    href="mailto:support@photosphere.app"
                    className="flex items-center gap-3 p-4 glass rounded-xl hover:bg-green-500/10 transition-all group"
                  >
                    <span className="text-3xl">📧</span>
                    <div>
                      <div className="font-semibold text-gray-700 dark:text-gray-300">{t('help.emailSupport', language)}</div>
                      <div className="text-green-600 dark:text-green-400 group-hover:underline">support@photosphere.app</div>
                    </div>
                  </a>
                  <a
                    href="tel:+911234567890"
                    className="flex items-center gap-3 p-4 glass rounded-xl hover:bg-green-500/10 transition-all group"
                  >
                    <span className="text-3xl">📞</span>
                    <div>
                      <div className="font-semibold text-gray-700 dark:text-gray-300">{t('help.phoneSupport', language)}</div>
                      <div className="text-green-600 dark:text-green-400 group-hover:underline">+91-XXXXXXXXXX</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-3xl p-8 md:p-12 border-2 border-green-500/20"
          >
            <h2 className="text-3xl font-bold mb-6 text-green-600 dark:text-green-400">
              {t('help.faq', language)}
            </h2>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-green-500/20 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full p-4 text-left flex items-center justify-between hover:bg-green-500/10 transition-colors"
                  >
                    <span className="font-semibold text-gray-700 dark:text-gray-300">
                      {faq.question}
                    </span>
                    <span className="text-2xl text-green-600 dark:text-green-400">
                      {openFaq === index ? '−' : '+'}
                    </span>
                  </button>
                  {openFaq === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-4 bg-green-500/5 text-gray-600 dark:text-gray-400"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </ProtectedRoute>
  )
}

