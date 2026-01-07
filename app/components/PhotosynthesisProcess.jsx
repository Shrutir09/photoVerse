'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function PhotosynthesisProcess({ language = 'en' }) {
  const [activeStep, setActiveStep] = useState(null)

  const translations = {
    en: {
      title: 'Photosynthesis Process',
      subtitle: 'Visual guide to understanding how photosynthesis works',
      sunlight: 'Sunlight',
      co2: 'CO₂ enters leaf',
      water: 'Water from roots',
      glucose: 'Glucose created',
      oxygen: 'Oxygen released',
      step1: 'Sunlight provides energy',
      step2: 'CO₂ enters through stomata',
      step3: 'Water flows from roots',
      step4: 'Photosynthesis occurs',
      step5: 'Glucose is produced',
      step6: 'Oxygen is released',
    },
    hi: {
      title: 'प्रकाश संश्लेषण प्रक्रिया',
      subtitle: 'प्रकाश संश्लेषण कैसे काम करता है इसे समझने के लिए दृश्य गाइड',
      sunlight: 'सूरज की रोशनी',
      co2: 'CO₂ पत्ती में प्रवेश करता है',
      water: 'जड़ों से पानी',
      glucose: 'ग्लूकोज बनता है',
      oxygen: 'ऑक्सीजन निकलती है',
      step1: 'सूरज की रोशनी ऊर्जा प्रदान करती है',
      step2: 'CO₂ स्टोमाटा के माध्यम से प्रवेश करता है',
      step3: 'पानी जड़ों से बहता है',
      step4: 'प्रकाश संश्लेषण होता है',
      step5: 'ग्लूकोज उत्पन्न होता है',
      step6: 'ऑक्सीजन निकलती है',
    },
  }

  const t = translations[language] || translations.en

  const steps = [
    { id: 1, icon: '☀️', label: t.sunlight, description: t.step1, color: 'from-yellow-400 to-orange-400' },
    { id: 2, icon: '🌬', label: t.co2, description: t.step2, color: 'from-gray-500 to-gray-600' },
    { id: 3, icon: '💧', label: t.water, description: t.step3, color: 'from-blue-400 to-cyan-400' },
    { id: 4, icon: '🌱', label: 'Photosynthesis', description: t.step4, color: 'from-green-400 to-emerald-400' },
    { id: 5, icon: '🍞', label: t.glucose, description: t.step5, color: 'from-yellow-500 to-amber-500' },
    { id: 6, icon: '💨', label: t.oxygen, description: t.step6, color: 'from-blue-500 to-cyan-500' },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent mb-2">
          🔬 {t.title}
        </h2>
        <p className="text-gray-600 dark:text-chalk-secondary">{t.subtitle}</p>
      </div>

      <div className="glass rounded-3xl p-6 md:p-8 border-2 border-emerald-500/20 shadow-xl relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 via-green-50/20 to-cyan-50/30 dark:from-emerald-900/10 dark:via-green-900/5 dark:to-cyan-900/10" />

        <div className="relative z-10">
          {/* Visual Process Scene */}
          <div className="relative h-64 md:h-80 bg-gradient-to-b from-sky-100 via-green-50 to-green-100 dark:bg-chalkboard-surface rounded-2xl overflow-hidden mb-6">
            {/* Ground */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-green-600 to-green-500 dark:from-green-700 dark:to-green-600" />

            {/* Plant */}
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10">
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-6xl md:text-7xl"
              >
                🌳
              </motion.div>
            </div>

            {/* Sunlight */}
            <motion.div
              className="absolute top-4 right-4 z-20"
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
              onMouseEnter={() => setActiveStep(1)}
              onMouseLeave={() => setActiveStep(null)}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400 shadow-xl">
                <span className="text-3xl md:text-4xl flex items-center justify-center h-full">☀️</span>
              </div>
              {activeStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-yellow-400/90 text-yellow-900 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap"
                >
                  {t.step1}
                </motion.div>
              )}
            </motion.div>

            {/* CO₂ entering */}
            <motion.div
              className="absolute top-20 left-1/4 z-20"
              animate={{
                x: [0, 50, 50, 0],
                y: [0, -10, -10, 0],
                opacity: [0.6, 1, 1, 0.6],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              onMouseEnter={() => setActiveStep(2)}
              onMouseLeave={() => setActiveStep(null)}
            >
              <div className="bg-gray-500/80 text-white px-3 py-2 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm">
                CO₂
              </div>
              {activeStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-gray-500/90 text-white px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap"
                >
                  {t.step2}
                </motion.div>
              )}
            </motion.div>

            {/* Water from roots */}
            <motion.div
              className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20"
              animate={{
                y: [0, -40, -40, 0],
                opacity: [0.6, 1, 1, 0.6],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              onMouseEnter={() => setActiveStep(3)}
              onMouseLeave={() => setActiveStep(null)}
            >
              <div className="bg-blue-400/80 text-white px-3 py-2 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm">
                H₂O
              </div>
              {activeStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-blue-400/90 text-white px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap"
                >
                  {t.step3}
                </motion.div>
              )}
            </motion.div>

            {/* Glucose */}
            <motion.div
              className="absolute top-32 left-1/2 transform -translate-x-1/2 z-20"
              animate={{
                scale: [0.8, 1, 1, 0.8],
                opacity: [0.7, 1, 1, 0.7],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
              onMouseEnter={() => setActiveStep(5)}
              onMouseLeave={() => setActiveStep(null)}
            >
              <div className="bg-yellow-400/90 text-yellow-900 px-3 py-2 rounded-full text-sm font-bold shadow-lg backdrop-blur-sm">
                🍞 Glucose
              </div>
              {activeStep === 5 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-yellow-400/90 text-yellow-900 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap"
                >
                  {t.step5}
                </motion.div>
              )}
            </motion.div>

            {/* Oxygen bubbles */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute top-24 left-1/2 transform -translate-x-1/2 z-20"
                animate={{
                  y: [0, -60, -60, 0],
                  x: [0, (i - 1) * 30, (i - 1) * 30, 0],
                  opacity: [0.6, 1, 1, 0],
                  scale: [0.8, 1, 1, 0.8],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.5 + 2.5,
                  ease: "easeOut"
                }}
                onMouseEnter={() => setActiveStep(6)}
                onMouseLeave={() => setActiveStep(null)}
              >
                <div className="bg-blue-400/80 text-white px-3 py-2 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm">
                  O₂
                </div>
                {activeStep === 6 && i === 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-blue-400/90 text-white px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap"
                  >
                    {t.step6}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Step Labels Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {steps.map((step) => (
              <motion.div
                key={step.id}
                whileHover={{ scale: 1.05, y: -3 }}
                className={`glass rounded-xl p-4 border-2 border-emerald-500/20 cursor-pointer transition-all ${
                  activeStep === step.id ? 'bg-emerald-500/10 border-emerald-500/40' : ''
                }`}
                onMouseEnter={() => setActiveStep(step.id)}
                onMouseLeave={() => setActiveStep(null)}
              >
                <div className="text-center">
                  <div className={`text-3xl mb-2 p-2 rounded-lg bg-gradient-to-br ${step.color} opacity-20 inline-block`}>
                    {step.icon}
                  </div>
                  <div className="text-xs font-semibold text-gray-700 dark:text-chalk-secondary">
                    {step.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

