'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import { useTranslation } from '../context/TranslationContext'
import { t } from '../utils/translations'

export default function ArticleCards() {
  const { language } = useTranslation()
  
  const articles = [
    {
      id: 'photosynthesis-basics',
      titleKey: 'articles.photosynthesisBasics',
      icon: '🌱',
      descriptionKey: 'articles.photosynthesisBasicsDesc',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30',
    },
    {
      id: 'carbon-cycle',
      titleKey: 'articles.carbonCycle',
      icon: '🌍',
      descriptionKey: 'articles.carbonCycleDesc',
      color: 'from-gray-600 to-gray-700',
      bgColor: 'bg-gray-500/10',
      borderColor: 'border-gray-500/30',
    },
    {
      id: 'oxygen-cycle',
      titleKey: 'articles.oxygenCycle',
      icon: '💨',
      descriptionKey: 'articles.oxygenCycleDesc',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
    },
    {
      id: 'ecosystem-balance',
      titleKey: 'articles.ecosystemBalance',
      icon: '⚖️',
      descriptionKey: 'articles.ecosystemBalanceDesc',
      color: 'from-emerald-500 to-green-500',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
    },
    {
      id: 'climate-plants',
      titleKey: 'articles.climatePlants',
      icon: '🌡️',
      descriptionKey: 'articles.climatePlantsDesc',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/30',
    },
    {
      id: 'urban-greenery',
      titleKey: 'articles.urbanGreenery',
      icon: '🏙️',
      descriptionKey: 'articles.urbanGreeneryDesc',
      color: 'from-teal-500 to-cyan-500',
      bgColor: 'bg-teal-500/10',
      borderColor: 'border-teal-500/30',
    },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent mb-2">
          📚 {t('articles.title', language)}
        </h2>
        <p className="text-gray-600 dark:text-chalk-secondary">{t('articles.subtitle', language)}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <Link key={article.id} href={`/learn/${article.id}`}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className={`glass rounded-2xl p-6 border-2 ${article.borderColor} ${article.bgColor} cursor-pointer transition-all shadow-lg hover:shadow-xl`}
            >
              <div className="flex items-start gap-4">
                <div className={`text-5xl p-3 rounded-xl bg-gradient-to-br ${article.color} opacity-20`}>
                  {article.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-chalk-white mb-2">
                    {t(article.titleKey, language)}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-chalk-secondary leading-relaxed">
                    {t(article.descriptionKey, language)}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                {t('articles.readMore', language)} →
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  )
}

