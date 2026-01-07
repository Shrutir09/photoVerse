'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const cards = [
  {
    id: 'sunlight',
    emoji: '🌞',
    title: 'Sunlight',
    description: 'Sunlight provides the energy needed for photosynthesis. Plants capture light energy using chlorophyll in their leaves.',
    detail: 'Without sunlight, plants cannot produce glucose or oxygen. The intensity of sunlight directly affects the rate of photosynthesis.',
  },
  {
    id: 'co2',
    emoji: '🌬',
    title: 'CO₂ (Carbon Dioxide)',
    description: 'Carbon dioxide from the air is absorbed by plants through tiny pores called stomata in their leaves.',
    detail: 'CO₂ combines with water to create glucose during photosynthesis. Higher CO₂ levels can increase photosynthesis rates.',
  },
  {
    id: 'water',
    emoji: '💧',
    title: 'Water',
    description: 'Water is absorbed by plant roots from the soil and transported to the leaves where photosynthesis occurs.',
    detail: 'Water molecules are split during photosynthesis, releasing oxygen as a byproduct. This is why plants need regular watering!',
  },
  {
    id: 'chlorophyll',
    emoji: '🍃',
    title: 'Chlorophyll',
    description: 'Chlorophyll is the green pigment in leaves that captures sunlight energy. It gives plants their green color!',
    detail: 'This amazing molecule converts light energy into chemical energy, powering the entire photosynthesis process.',
  },
  {
    id: 'glucose',
    emoji: '🍞',
    title: 'Glucose',
    description: 'Glucose is the sugar that plants make during photosynthesis. It\'s their food and energy source!',
    detail: 'Plants use glucose to grow, repair themselves, and store energy. Some glucose is converted into starch for long-term storage.',
  },
  {
    id: 'oxygen',
    emoji: '🌬',
    title: 'Oxygen',
    description: 'Oxygen is released as a byproduct of photosynthesis. This is the oxygen we breathe!',
    detail: 'For every molecule of glucose produced, plants release 6 molecules of oxygen. Plants are Earth\'s oxygen factories!',
  },
]

export default function LearningCards({ language = 'en' }) {
  const [selectedCard, setSelectedCard] = useState(null)
  const [showFlow, setShowFlow] = useState(false)

  const translations = {
    en: {
      title: 'Interactive Learning Cards',
      clickToLearn: 'Click to learn more!',
      showFlow: 'Show Photosynthesis Flow',
      hideFlow: 'Hide Flow',
    },
    hi: {
      title: 'इंटरैक्टिव लर्निंग कार्ड',
      clickToLearn: 'अधिक जानने के लिए क्लिक करें!',
      showFlow: 'प्रकाश संश्लेषण प्रवाह दिखाएं',
      hideFlow: 'प्रवाह छुपाएं',
    },
  }

  const t = translations[language] || translations.en

  // Photosynthesis flow steps
  const flowSteps = [
    { emoji: '🌞', label: { en: 'Sunlight', hi: 'सूरज की रोशनी' }, id: 'sunlight' },
    { emoji: '→', label: { en: 'Energy', hi: 'ऊर्जा' }, id: 'arrow1' },
    { emoji: '🍃', label: { en: 'Chlorophyll', hi: 'क्लोरोफिल' }, id: 'chlorophyll' },
    { emoji: '→', label: { en: 'Absorbs', hi: 'अवशोषित' }, id: 'arrow2' },
    { emoji: '🌬', label: { en: 'CO₂', hi: 'CO₂' }, id: 'co2' },
    { emoji: '💧', label: { en: 'Water', hi: 'पानी' }, id: 'water' },
    { emoji: '→', label: { en: 'Creates', hi: 'बनाता है' }, id: 'arrow3' },
    { emoji: '🍞', label: { en: 'Glucose', hi: 'ग्लूकोज' }, id: 'glucose' },
    { emoji: '🌬', label: { en: 'Oxygen', hi: 'ऑक्सीजन' }, id: 'oxygen' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
          📖 {t.title}
        </h2>
        <motion.button
          onClick={() => setShowFlow(!showFlow)}
          className="px-6 py-2 glass rounded-xl font-semibold hover:bg-green-500/20 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {showFlow ? t.hideFlow : t.showFlow}
        </motion.button>
      </div>

      {/* Photosynthesis Flow */}
      <AnimatePresence>
        {showFlow && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="glass rounded-3xl p-6 md:p-8 border-2 border-emerald-500/30 overflow-hidden shadow-xl"
          >
            <h3 className="text-xl font-bold mb-6 text-center">
              {language === 'hi' ? 'प्रकाश संश्लेषण प्रक्रिया' : 'Photosynthesis Process Flow'}
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
              {flowSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex flex-col items-center ${
                    step.emoji === '→' ? 'text-3xl font-bold text-green-500' : ''
                  }`}
                >
                  {step.emoji !== '→' && (
                    <motion.div
                      className="text-5xl mb-2 p-4 glass rounded-2xl"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      {step.emoji}
                    </motion.div>
                  )}
                  {step.emoji === '→' && <div className="text-4xl">{step.emoji}</div>}
                  {step.emoji !== '→' && (
                    <span className="text-sm font-semibold text-center max-w-[80px]">
                      {step.label[language] || step.label.en}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
            <p className="text-center mt-6 text-gray-600 dark:text-chalk-secondary text-sm">
              {language === 'hi' 
                ? 'सूरज की रोशनी + CO₂ + पानी → ग्लूकोज + ऑक्सीजन'
                : 'Sunlight + CO₂ + Water → Glucose + Oxygen'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-center text-gray-600 dark:text-chalk-secondary font-medium">{t.clickToLearn}</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {cards.map((card) => (
          <motion.div
            key={card.id}
            className="glass rounded-2xl p-5 md:p-6 cursor-pointer border-2 border-emerald-500/20 hover:border-emerald-500/50 transition-all shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCard(selectedCard === card.id ? null : card.id)}
          >
            <div className="text-5xl md:text-6xl text-center mb-3">{card.emoji}</div>
            <div className="text-center font-bold text-lg md:text-xl text-gray-800 dark:text-chalk-white mb-2">{card.title}</div>
            <div className="text-sm md:text-base text-gray-600 dark:text-chalk-secondary mt-2 text-center leading-relaxed">
              {card.description}
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedCard && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="glass rounded-2xl p-6 md:p-8 border-2 border-emerald-500/50 shadow-2xl"
          >
            <div className="flex items-start gap-4">
              <div className="text-6xl">
                {cards.find(c => c.id === selectedCard)?.emoji}
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">
                  {cards.find(c => c.id === selectedCard)?.title}
                </h3>
                <p className="text-gray-700 dark:text-chalk-secondary">
                  {cards.find(c => c.id === selectedCard)?.detail}
                </p>
              </div>
              <button
                onClick={() => setSelectedCard(null)}
                className="text-2xl hover:scale-110 transition-transform"
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

