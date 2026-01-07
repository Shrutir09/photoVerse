'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { askPhotoBot } from '../ai/photobot'

export default function AIFeatures({ sunlight, co2, temperature, photosynthesisRate, oxygen, plantHealth, language = 'en' }) {
  const [activeFeature, setActiveFeature] = useState(null)
  const [aiResponse, setAiResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const features = [
    {
      id: 'suggest',
      icon: '💡',
      title: { en: 'AI Suggest Best Conditions', hi: 'AI सर्वोत्तम स्थितियां सुझाएं' },
      description: { en: 'Get AI recommendations for optimal photosynthesis', hi: 'इष्टतम प्रकाश संश्लेषण के लिए AI सिफारिशें प्राप्त करें' },
    },
    {
      id: 'explain',
      icon: '🔍',
      title: { en: 'AI Explain My Results', hi: 'AI मेरे परिणाम समझाएं' },
      description: { en: 'Understand what your current settings mean', hi: 'समझें कि आपकी वर्तमान सेटिंग्स का क्या मतलब है' },
    },
    {
      id: 'predict',
      icon: '🔮',
      title: { en: 'AI Predict Plant Health', hi: 'AI पौधे के स्वास्थ्य की भविष्यवाणी करें' },
      description: { en: 'Predict future plant health based on trends', hi: 'ट्रेंड के आधार पर भविष्य के पौधे के स्वास्थ्य की भविष्यवाणी करें' },
    },
    {
      id: 'tutor',
      icon: '🤖',
      title: { en: 'PhotoBot AI Tutor', hi: 'PhotoBot AI ट्यूटर' },
      description: { en: 'Ask questions about photosynthesis', hi: 'प्रकाश संश्लेषण के बारे में प्रश्न पूछें' },
    },
  ]

  const handleFeatureClick = async (featureId) => {
    if (activeFeature === featureId) {
      setActiveFeature(null)
      return
    }

    setActiveFeature(featureId)
    setAiResponse('')
    setLoading(true)

    // Simulate AI responses (replace with actual API calls)
    setTimeout(() => {
      let response = ''
      
      switch (featureId) {
        case 'suggest':
          response = `Based on your current settings (Sunlight: ${sunlight}%, CO₂: ${co2}%, Temperature: ${temperature}°C), I recommend:\n\n• Increase sunlight to 70-80% for better photosynthesis\n• Maintain CO₂ around 60-70%\n• Keep temperature between 20-25°C for optimal conditions\n\nThese settings should give you a photosynthesis rate of 75-85%!`
          break
        case 'explain':
          response = `Your current photosynthesis rate is ${photosynthesisRate.toFixed(1)}%.\n\n• Plant Health: ${plantHealth.status} (${plantHealth.emoji})\n• Oxygen Production: ${oxygen}%\n• Environment: ${plantHealth.status === 'healthy' ? 'Well balanced!' : 'Needs adjustment'}\n\n${photosynthesisRate < 50 ? 'Try increasing sunlight and CO₂ while lowering temperature slightly.' : 'Great job! Your plant is thriving.'}`
          break
        case 'predict':
          response = `Based on current trends:\n\n• If you maintain these conditions, plant health will remain ${plantHealth.status}\n• Oxygen production is ${oxygen >= 70 ? 'excellent' : oxygen >= 50 ? 'good' : 'needs improvement'}\n• Recommended: Keep temperature stable and ensure adequate sunlight\n\nYour plant is ${photosynthesisRate >= 70 ? 'thriving' : photosynthesisRate >= 50 ? 'growing well' : 'struggling'} - ${photosynthesisRate >= 70 ? 'keep it up!' : 'try adjusting the sliders.'}`
          break
        case 'tutor':
          response = 'Ask me anything about photosynthesis! Try: "How does photosynthesis work?" or "Why do plants need sunlight?"'
          break
      }

      setAiResponse(response)
      setLoading(false)
    }, 1500)
  }

  const t = (key) => {
    const translations = {
      en: { title: 'AI Assistant', close: 'Close' },
      hi: { title: 'AI सहायक', close: 'बंद करें' },
    }
    return translations[language]?.[key] || translations.en[key]
  }

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {!activeFeature ? (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="glass rounded-2xl p-4 shadow-2xl border-2 border-green-500/30 max-w-sm"
          >
            <h3 className="text-lg font-bold mb-3 text-center">{t('title')}</h3>
            <div className="grid grid-cols-2 gap-2">
              {features.map((feature) => (
                <motion.button
                  key={feature.id}
                  onClick={() => handleFeatureClick(feature.id)}
                  className="p-3 glass rounded-xl hover:bg-green-500/20 transition-all text-left"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-2xl mb-1">{feature.icon}</div>
                  <div className="text-xs font-semibold">
                    {feature.title[language] || feature.title.en}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 20 }}
            className="glass rounded-2xl p-6 shadow-2xl border-2 border-green-500/30 w-96 max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">
                {features.find(f => f.id === activeFeature)?.icon}{' '}
                {features.find(f => f.id === activeFeature)?.title[language] || features.find(f => f.id === activeFeature)?.title.en}
              </h3>
              <button
                onClick={() => setActiveFeature(null)}
                className="text-2xl hover:scale-110 transition-transform"
              >
                ✕
              </button>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-8">
                <motion.div
                  className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {aiResponse}
                </p>
                {activeFeature === 'tutor' && (
                  <div className="mt-4 p-3 bg-green-500/10 rounded-lg border border-green-500/30">
                    <input
                      type="text"
                      placeholder="Ask a question..."
                      className="w-full px-3 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-green-500/30 focus:outline-none focus:ring-2 focus:ring-green-500"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          // Handle question
                        }
                      }}
                    />
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

