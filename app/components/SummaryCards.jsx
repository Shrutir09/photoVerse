'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function SummaryCards({ data, language = 'en' }) {
  const translations = {
    en: {
      oxygenOutput: 'Oxygen Output',
      photosynthesisRate: 'Photosynthesis Rate',
      plantHealth: 'Plant Health',
      environmentStatus: 'Environment Status',
      viewCharts: 'View Detailed Charts →',
    },
    hi: {
      oxygenOutput: 'ऑक्सीजन उत्पादन',
      photosynthesisRate: 'प्रकाश संश्लेषण दर',
      plantHealth: 'पौधे का स्वास्थ्य',
      environmentStatus: 'पर्यावरण स्थिति',
      viewCharts: 'विस्तृत चार्ट देखें →',
    },
  }

  const t = translations[language] || translations.en

  const cards = [
    {
      title: t.oxygenOutput,
      value: `${data.oxygen}%`,
      icon: '🌬',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
    },
    {
      title: t.photosynthesisRate,
      value: `${data.photosynthesisRate.toFixed(1)}%`,
      icon: '🌱',
      color: 'from-emerald-500 to-green-500',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
    },
    {
      title: t.plantHealth,
      value: data.plantHealth.status,
      icon: data.plantHealth.emoji,
      color: data.plantHealth.status === 'healthy' ? 'from-green-500 to-emerald-500' : data.plantHealth.status === 'average' ? 'from-yellow-500 to-orange-500' : 'from-red-500 to-pink-500',
      bgColor: data.plantHealth.bgColor,
      borderColor: data.plantHealth.status === 'healthy' ? 'border-green-500/30' : data.plantHealth.status === 'average' ? 'border-yellow-500/30' : 'border-red-500/30',
    },
    {
      title: t.environmentStatus,
      value: data.environmentBalance.status,
      icon: data.environmentBalance.emoji,
      color: data.environmentBalance.status === 'balanced' ? 'from-green-500 to-emerald-500' : data.environmentBalance.status === 'moderate' ? 'from-yellow-500 to-orange-500' : 'from-red-500 to-pink-500',
      bgColor: data.environmentBalance.bgColor,
      borderColor: data.environmentBalance.status === 'balanced' ? 'border-green-500/30' : data.environmentBalance.status === 'moderate' ? 'border-yellow-500/30' : 'border-red-500/30',
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
          📊 Key Statistics
        </h2>
        <Link href="/charts">
          <motion.button
            className="px-5 py-2.5 glass rounded-xl text-sm font-semibold hover:bg-emerald-500/10 transition-all flex items-center gap-2 border-2 border-emerald-500/20"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            {t.viewCharts}
          </motion.button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`glass rounded-2xl p-5 md:p-6 border-2 ${card.borderColor} ${card.bgColor} hover:scale-105 transition-all shadow-lg`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl md:text-4xl">{card.icon}</span>
              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br ${card.color} opacity-20`} />
            </div>
            <div className="text-sm md:text-base font-medium text-gray-700 dark:text-gray-300 mb-2">{card.title}</div>
            <div className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${card.color} bg-clip-text text-transparent capitalize`}>
              {card.value}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
