'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'

const articles = [
  {
    id: 'photosynthesis-basics',
    title: 'Photosynthesis Basics',
    icon: '🌱',
    description: 'Learn how plants convert sunlight into energy and produce oxygen.',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
  },
  {
    id: 'carbon-cycle',
    title: 'Carbon Cycle',
    icon: '🌍',
    description: 'Understand how carbon moves through the atmosphere, plants, and soil.',
    color: 'from-gray-600 to-gray-700',
    bgColor: 'bg-gray-500/10',
    borderColor: 'border-gray-500/30',
  },
  {
    id: 'oxygen-cycle',
    title: 'Oxygen Cycle',
    icon: '💨',
    description: 'Discover how oxygen is produced and consumed in nature.',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
  },
  {
    id: 'ecosystem-balance',
    title: 'Ecosystem Balance',
    icon: '⚖️',
    description: 'Explore how plants maintain balance in natural ecosystems.',
    color: 'from-emerald-500 to-green-500',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
  },
  {
    id: 'climate-plants',
    title: 'Climate & Plants',
    icon: '🌡️',
    description: 'Learn how temperature and climate affect plant growth.',
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30',
  },
  {
    id: 'urban-greenery',
    title: 'Urban Greenery & Air Quality',
    icon: '🏙️',
    description: 'See how plants in cities improve air quality and reduce pollution.',
    color: 'from-teal-500 to-cyan-500',
    bgColor: 'bg-teal-500/10',
    borderColor: 'border-teal-500/30',
  },
]

export default function ArticleCards({ language = 'en' }) {
  const translations = {
    en: {
      title: 'Articles & Reading',
      subtitle: 'Explore in-depth articles about photosynthesis and the environment',
    },
    hi: {
      title: 'लेख और पढ़ना',
      subtitle: 'प्रकाश संश्लेषण और पर्यावरण के बारे में गहराई से लेख देखें',
    },
  }

  const t = translations[language] || translations.en

  return (
    <div className="space-y-6">
      <div className="text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent mb-2">
          📚 {t.title}
        </h2>
        <p className="text-gray-600 dark:text-chalk-secondary">{t.subtitle}</p>
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
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-chalk-secondary leading-relaxed">
                    {article.description}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                Read more →
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  )
}

