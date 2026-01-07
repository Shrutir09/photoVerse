'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

export default function AIFloatingPanel({ sunlight, co2, temperature, photosynthesisRate, oxygen, plantHealth, language = 'en' }) {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [aiResponse, setAiResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [activeFeature, setActiveFeature] = useState(null)

  const features = [
    {
      id: 'suggest',
      icon: '💡',
      title: { en: 'AI Suggest Best Conditions', hi: 'AI सर्वोत्तम स्थितियां सुझाएं' },
    },
    {
      id: 'explain',
      icon: '🔍',
      title: { en: 'AI Explain My Plant', hi: 'AI मेरे पौधे को समझाएं' },
    },
    {
      id: 'predict',
      icon: '🔮',
      title: { en: 'AI Predict Health', hi: 'AI स्वास्थ्य की भविष्यवाणी करें' },
    },
  ]

  const handleMouseDown = (e) => {
    setIsDragging(true)
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    })
  }

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newX = e.clientX - dragStart.x
      const newY = e.clientY - dragStart.y
      
      // Keep panel within viewport
      const maxX = window.innerWidth - 400
      const maxY = window.innerHeight - 300
      
      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY)),
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, dragStart])

  const handleFeatureClick = async (featureId) => {
    setActiveFeature(featureId)
    setAiResponse('')
    setLoading(true)

    setTimeout(() => {
      let response = ''
      switch (featureId) {
        case 'suggest':
          response = `Based on your settings:\n\n• Increase sunlight to 70-80%\n• Maintain CO₂ around 60-70%\n• Keep temperature 20-25°C\n\nThis should give you 75-85% photosynthesis rate!`
          break
        case 'explain':
          response = `Your plant is ${plantHealth.status}!\n\n• Photosynthesis: ${photosynthesisRate.toFixed(1)}%\n• Oxygen: ${oxygen}%\n• ${photosynthesisRate >= 70 ? 'Excellent! Your plant is thriving.' : 'Try adjusting the sliders for better results.'}`
          break
        case 'predict':
          response = `Health Prediction:\n\n• Current: ${plantHealth.status}\n• If conditions stay stable: ${plantHealth.status}\n• Recommended: Keep temperature stable\n\nYour plant is ${photosynthesisRate >= 70 ? 'thriving' : 'growing well'}!`
          break
      }
      setAiResponse(response)
      setLoading(false)
    }, 1500)
  }

  const t = (key) => {
    const translations = {
      en: { assistant: 'Your AI Assistant', close: 'Close' },
      hi: { assistant: 'आपका AI सहायक', close: 'बंद करें' },
    }
    return translations[language]?.[key] || translations.en[key]
  }

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 glass rounded-full p-4 shadow-2xl border-2 border-green-500/30 hover:bg-green-500/10 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <span className="text-3xl">🌱</span>
          <span className="ml-2 font-semibold hidden md:inline">{t('assistant')}</span>
        </motion.button>
      )}

      {/* Draggable Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed z-50 w-96 max-w-[90vw]"
            style={{
              left: position.x || 'calc(100% - 420px)',
              top: position.y || 'calc(100% - 400px)',
              cursor: isDragging ? 'grabbing' : 'default',
            }}
            onMouseDown={handleMouseDown}
          >
            <div className="glass rounded-2xl p-6 shadow-2xl border-2 border-green-500/30 max-h-[80vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <span className="text-2xl">🌱</span>
                  {t('assistant')}
                </h3>
                <button
                  onClick={() => {
                    setIsOpen(false)
                    setActiveFeature(null)
                    setAiResponse('')
                  }}
                  className="text-2xl hover:scale-110 transition-transform"
                >
                  ✕
                </button>
              </div>

              {/* Features */}
              {!activeFeature ? (
                <div className="space-y-3">
                  {features.map((feature) => (
                    <motion.button
                      key={feature.id}
                      onClick={() => handleFeatureClick(feature.id)}
                      className="w-full p-4 glass rounded-xl hover:bg-green-500/20 transition-all text-left"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{feature.icon}</span>
                        <span className="font-semibold">
                          {feature.title[language] || feature.title.en}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <button
                    onClick={() => {
                      setActiveFeature(null)
                      setAiResponse('')
                    }}
                    className="text-sm text-green-600 dark:text-green-400 hover:underline"
                  >
                    ← Back
                  </button>
                  {loading ? (
                    <div className="flex items-center justify-center py-8">
                      <motion.div
                        className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                    </div>
                  ) : (
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                      {aiResponse}
                    </p>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

