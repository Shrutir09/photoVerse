'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function HeroSection({ language = 'en' }) {
  const [co2Bubbles, setCo2Bubbles] = useState([])
  const [o2Bubbles, setO2Bubbles] = useState([])

  // Generate CO₂ bubbles
  useEffect(() => {
    const bubbles = Array.from({ length: 4 }, (_, i) => ({
      id: `co2-${i}`,
      x: Math.random() * 30 + 10, // Start from left side
      y: Math.random() * 40 + 30,
      delay: i * 0.5,
    }))
    setCo2Bubbles(bubbles)
  }, [])

  // Generate O₂ bubbles
  useEffect(() => {
    const bubbles = Array.from({ length: 5 }, (_, i) => ({
      id: `o2-${i}`,
      x: 50, // Start from tree center
      y: 40,
      delay: i * 0.4,
    }))
    setO2Bubbles(bubbles)
  }, [])

  const translations = {
    en: {
      title: 'Your Living Photosynthesis World',
      tagline: 'Learn • Simulate • Visualize Photosynthesis',
      description: 'Control sunlight, CO₂ levels, and temperature to watch your plant ecosystem come alive. Discover how environmental factors affect plant growth and oxygen production in real-time.',
      startSimulation: 'Start Simulation',
      learnPhotosynthesis: 'Learn Photosynthesis',
      liveEcosystem: 'Live Ecosystem Simulation',
    },
    hi: {
      title: 'आपकी जीवंत प्रकाश संश्लेषण दुनिया',
      tagline: 'सीखें • सिमुलेट करें • प्रकाश संश्लेषण देखें',
      description: 'सूरज की रोशनी, CO₂ स्तर और तापमान को नियंत्रित करें और अपने पौधे के पारिस्थितिकी तंत्र को जीवंत होते देखें। वास्तविक समय में देखें कि पर्यावरणीय कारक पौधे के विकास और ऑक्सीजन उत्पादन को कैसे प्रभावित करते हैं।',
      startSimulation: 'सिमुलेशन शुरू करें',
      learnPhotosynthesis: 'प्रकाश संश्लेषण सीखें',
      liveEcosystem: 'लाइव पारिस्थितिकी तंत्र सिमुलेशन',
    },
  }

  const t = translations[language] || translations.en

  return (
    <section className="relative min-h-[600px] md:min-h-[700px] flex items-center pt-16 md:pt-20 pb-16 md:pb-24 overflow-hidden -mt-20 md:-mt-24">
      {/* Subtle Top Border/Glow Separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-400/50 to-transparent z-20" />
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-green-400/5 to-transparent z-10" />
      
      {/* Light, Bright Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-cyan-50 dark:bg-chalkboard-bg">
        <motion.div
          className="absolute inset-0 opacity-40"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(34, 197, 94, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)',
            backgroundSize: '200% 200%',
          }}
        />
        {/* Very light abstract shapes/glow (5-10% opacity) */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-emerald-400/8 to-green-400/8 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-48 h-48 rounded-full bg-gradient-to-br from-cyan-400/8 to-emerald-400/8 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        {/* Very subtle texture */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 md:space-y-8 text-center lg:text-left"
          >
            {/* Heading with Glow */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.3] md:leading-[1.25] relative tracking-tight"
              style={{
                textShadow: '0 2px 20px rgba(34, 197, 94, 0.3), 0 4px 30px rgba(16, 185, 129, 0.2)',
                fontSmooth: 'antialiased',
                WebkitFontSmoothing: 'antialiased',
              }}
            >
              {/* Subtle glow behind heading */}
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-emerald-400/20 via-green-400/20 to-emerald-400/20 blur-3xl rounded-full"
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <span className="relative z-10 bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 dark:from-chalk-emerald dark:via-chalk-emerald dark:to-chalk-white bg-clip-text text-transparent">
                {language === 'hi' ? t.title.split(' ').slice(0, 3).join(' ') : 'Your Living'}
              </span>
              <br />
              <span className="relative z-10 bg-gradient-to-r from-green-600 via-emerald-600 to-cyan-600 dark:from-chalk-emerald dark:via-chalk-white dark:to-chalk-secondary bg-clip-text text-transparent">
                {language === 'hi' ? t.title.split(' ').slice(3).join(' ') : 'Photosynthesis World'}
              </span>
              <motion.span
                className="absolute ml-2 text-4xl md:text-5xl relative z-10"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                🌱
              </motion.span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base md:text-lg text-emerald-600 dark:text-chalk-secondary font-medium max-w-2xl mx-auto lg:mx-0 tracking-wide"
              style={{
                fontSmooth: 'antialiased',
                WebkitFontSmoothing: 'antialiased',
              }}
            >
              {t.tagline}
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex justify-center"
            >
              {/* Primary Button - Start Simulation */}
              <Link href="#simulation">
                <motion.button
                  whileHover={{ 
                    scale: 1.1, 
                    y: -5,
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 text-white font-semibold rounded-xl shadow-2xl shadow-emerald-500/50 overflow-hidden transition-all duration-300"
                  style={{
                    boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)',
                  }}
                >
                  {/* Soft gradient base */}
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-500 opacity-90" />
                  
                  {/* Pulse animation */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-emerald-300 to-green-300"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {/* Gentle hover glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-emerald-200 to-green-200 opacity-0 group-hover:opacity-60 transition-opacity duration-300 blur-sm"
                  />
                  
                  <span className="relative z-10 flex items-center gap-2">
                    🚀 {t.startSimulation}
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      →
                    </motion.span>
                  </span>
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Side - Visual Scene with Subtle Background Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Subtle background illustration (5-10% opacity) */}
            <div className="absolute inset-0 flex items-center justify-center lg:justify-end opacity-[0.08] pointer-events-none">
              <motion.div
                className="relative"
                animate={{
                  scale: [1, 1.05, 1],
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="text-9xl md:text-[12rem] opacity-50">🌱</div>
                <motion.div
                  className="absolute -top-8 -right-8 text-6xl md:text-7xl opacity-40"
                  animate={{
                    rotate: 360,
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    rotate: {
                      duration: 30,
                      repeat: Infinity,
                      ease: "linear"
                    },
                    scale: {
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                >
                  ☀️
                </motion.div>
              </motion.div>
            </div>

            {/* Main Visual Scene - Larger and More Visible */}
            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative z-10 scale-110 md:scale-125"
            >
              {/* Sun with soft pulse - Larger */}
              <motion.div
                className="absolute -top-12 -right-12 z-20"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <motion.div
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400 shadow-xl relative"
                  animate={{
                    scale: [1, 1.15, 1],
                    boxShadow: [
                      '0 0 25px rgba(251, 191, 36, 0.5)',
                      '0 0 40px rgba(251, 191, 36, 0.7)',
                      '0 0 25px rgba(251, 191, 36, 0.5)',
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <span className="text-5xl md:text-6xl flex items-center justify-center h-full">☀️</span>
                </motion.div>
              </motion.div>

              {/* CO₂ Bubbles moving toward tree */}
              {co2Bubbles.map((bubble) => (
                <motion.div
                  key={bubble.id}
                  className="absolute z-10"
                  style={{
                    left: `${bubble.x}%`,
                    top: `${bubble.y}%`,
                  }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{
                    x: ['0%', '25%'],
                    y: ['0%', '-5%'],
                    opacity: [0, 0.7, 0.7, 0],
                    scale: [0.5, 0.8, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 4,
                    delay: bubble.delay,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: "easeInOut"
                  }}
                >
                  <div className="text-xs md:text-sm bg-gray-500/70 text-white px-2 py-1 rounded-full backdrop-blur-sm shadow-md">
                    CO₂
                  </div>
                </motion.div>
              ))}

              {/* Plant with gentle sway - Larger */}
              <motion.div
                className="text-8xl md:text-9xl relative z-10"
                animate={{
                  rotate: [0, 2, -2, 0],
                  y: [0, -3, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                🌳
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(34, 197, 94, 0.4) 0%, transparent 70%)',
                    filter: 'blur(25px)',
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.4, 0.6, 0.4],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>

              {/* O₂ Bubbles coming out of tree */}
              {o2Bubbles.map((bubble) => (
                <motion.div
                  key={bubble.id}
                  className="absolute z-10"
                  style={{
                    left: `${bubble.x}%`,
                    top: `${bubble.y}%`,
                  }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{
                    x: ['0%', Math.random() * 40 - 20 + '%'],
                    y: ['0%', '-30%'],
                    opacity: [0, 0.8, 0.8, 0],
                    scale: [0.5, 1, 1, 0.5],
                  }}
                  transition={{
                    duration: 5,
                    delay: bubble.delay,
                    repeat: Infinity,
                    repeatDelay: 1,
                    ease: "easeOut"
                  }}
                >
                  <div className="text-xs md:text-sm bg-blue-400/70 text-white px-2 py-1 rounded-full backdrop-blur-sm shadow-md">
                    O₂
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
