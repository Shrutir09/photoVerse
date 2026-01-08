'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

export default function HeroSection({ language = 'en' }) {
  const [bubbles, setBubbles] = useState([])
  const textContainerRef = useRef(null)
  const yourLivingRef = useRef(null)
  const yourTextRef = useRef(null)
  const [sunPosition, setSunPosition] = useState({ top: '20%', left: '50%' })

  // Generate bubbles
  useEffect(() => {
    const bubblePositions = [
      { x: 20, y: 15, delay: 0 },
      { x: 35, y: 12, delay: 0.5 },
      { x: 65, y: 14, delay: 1.5 },
      { x: 80, y: 16, delay: 2 },
      { x: 30, y: 25, delay: 0.3 },
      { x: 70, y: 22, delay: 0.8 },
    ]
    setBubbles(bubblePositions)
  }, [])

  // Position sun at top center of hero, ensuring no overlap with text
  useEffect(() => {
    const updateSunPosition = () => {
      if (yourLivingRef.current) {
        const h2Rect = yourLivingRef.current.getBoundingClientRect()
        const sectionRect = yourLivingRef.current.closest('section')?.getBoundingClientRect()
        if (sectionRect) {
          // Sun dimensions - must account for full height including rays
          const sunCoreSize = window.innerWidth >= 1024 ? 96 : window.innerWidth >= 768 ? 80 : 64
          const sunCoreRadius = sunCoreSize / 2
          const sunRaysMaxLength = 140 // Maximum ray length
          const sunMaxBottomExtension = sunCoreRadius + sunRaysMaxLength
          
          // Minimum spacing above text to prevent overlap
          const minSpacingAboveText = 50
          
          // Calculate the top of "Your Living" text relative to section
          const textTop = h2Rect.top - sectionRect.top
          
          // Position sun at top center, but ensure it doesn't overlap text
          // Calculate maximum allowed top position
          const maxSunTop = textTop - sunMaxBottomExtension - minSpacingAboveText
          
          // Position near top of hero (10% from top) but ensure no text overlap
          const desiredTop = sectionRect.height * 0.10 // 10% from top
          const finalTop = Math.min(desiredTop, maxSunTop)
          
          setSunPosition({
            top: `${Math.max(5, (finalTop / sectionRect.height) * 100)}%`,
            left: '50%', // Exact horizontal center
          })
        }
      }
    }

    // Initial positioning with multiple attempts to ensure DOM is ready
    const timeout1 = setTimeout(updateSunPosition, 50)
    const timeout2 = setTimeout(updateSunPosition, 200)
    const timeout3 = setTimeout(updateSunPosition, 500)
    
    window.addEventListener('resize', updateSunPosition)
    return () => {
      clearTimeout(timeout1)
      clearTimeout(timeout2)
      clearTimeout(timeout3)
      window.removeEventListener('resize', updateSunPosition)
    }
  }, [])

  return (
    <section 
      className="relative w-full h-screen max-h-[750px] flex items-center justify-center overflow-hidden"
    >
      {/* Background - Dark Green for Dark Mode, Light Green for Light Mode */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-50 via-emerald-50/80 to-white dark:from-[#0d2818] dark:via-[#0f2e24] dark:to-[#0a1f18]">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-50/20 to-transparent dark:via-transparent" />
      </div>

      {/* Soft Green Bush-like Glow on Left Side */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-1/3 pointer-events-none z-10"
        style={{
          background: 'radial-gradient(ellipse at left center, rgba(34, 197, 94, 0.25) 0%, rgba(16, 185, 129, 0.15) 40%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <div 
        className="absolute left-0 top-0 bottom-0 w-1/4 pointer-events-none z-10 dark:hidden"
        style={{
          background: 'radial-gradient(ellipse at left center, rgba(134, 239, 172, 0.2) 0%, rgba(74, 222, 128, 0.1) 50%, transparent 80%)',
          filter: 'blur(50px)',
        }}
      />

      {/* Soft Green Bush-like Glow on Right Side */}
      <div 
        className="absolute right-0 top-0 bottom-0 w-1/3 pointer-events-none z-10"
        style={{
          background: 'radial-gradient(ellipse at right center, rgba(34, 197, 94, 0.25) 0%, rgba(16, 185, 129, 0.15) 40%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <div 
        className="absolute right-0 top-0 bottom-0 w-1/4 pointer-events-none z-10 dark:hidden"
        style={{
          background: 'radial-gradient(ellipse at right center, rgba(134, 239, 172, 0.2) 0%, rgba(74, 222, 128, 0.1) 50%, transparent 80%)',
          filter: 'blur(50px)',
        }}
      />

      {/* Sun - Clean, Natural Glowing Sun - Exact Horizontal Center */}
      <motion.div
        className="absolute z-20"
        style={{
          top: sunPosition.top,
          left: sunPosition.left,
          transform: 'translate(-50%, 0)',
        }}
        animate={{
          scale: [1, 1.03, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Natural, subtle light rays fading outward in all directions */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[...Array(32)].map((_, i) => {
            const angle = i * 11.25 // Even distribution
            const distance = 60 + Math.random() * 40 // Vary distance for natural look
            const rayOpacity = 0.15 + Math.random() * 0.15 // Vary opacity
            
            return (
              <motion.div
                key={`ray-${i}`}
                className="absolute rounded-full"
                style={{
                  width: '3px',
                  height: `${80 + Math.random() * 60}px`,
                  background: `linear-gradient(to bottom, 
                    rgba(255, 235, 59, ${rayOpacity}) 0%, 
                    rgba(255, 193, 7, ${rayOpacity * 0.7}) 30%, 
                    rgba(255, 152, 0, ${rayOpacity * 0.4}) 60%, 
                    transparent 100%)`,
                  transform: `rotate(${angle}deg) translateY(-${distance}px)`,
                  transformOrigin: 'bottom center',
                  filter: 'blur(1.5px)',
                }}
                animate={{
                  opacity: [rayOpacity * 0.6, rayOpacity, rayOpacity * 0.6],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut"
                }}
              />
            )
          })}
        </div>

        {/* Gentle halo glow around sun */}
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            background: 'radial-gradient(circle, rgba(255, 235, 59, 0.3) 0%, rgba(255, 193, 7, 0.2) 30%, rgba(255, 152, 0, 0.1) 60%, transparent 100%)',
            filter: 'blur(25px)',
            width: '180px',
            height: '180px',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
        
        {/* Soft glowing sun core - Clean circle, no decorative shapes */}
        <div 
          className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full relative z-10"
          style={{
            background: 'radial-gradient(circle, #ffeb3b 0%, #ffc107 50%, #ff9800 100%)',
            boxShadow: '0 0 40px rgba(255, 235, 59, 0.6), 0 0 80px rgba(255, 193, 7, 0.4), 0 0 120px rgba(255, 152, 0, 0.2)',
          }}
        />
        
        {/* Light mode: softer, warmer sun */}
        <div 
          className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full absolute inset-0 dark:hidden"
          style={{
            background: 'radial-gradient(circle, #fff9c4 0%, #fff59d 50%, #ffeb3b 100%)',
            boxShadow: '0 0 35px rgba(255, 249, 196, 0.5), 0 0 70px rgba(255, 245, 157, 0.3), 0 0 100px rgba(255, 235, 59, 0.2)',
          }}
        />
      </motion.div>

      {/* Bubbles - Scattered around (avoiding sun area) */}
      {bubbles.map((bubble, i) => (
        <motion.div
          key={`bubble-${i}`}
          className="absolute z-20"
          style={{
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
          }}
          initial={{ opacity: 0.6, scale: 0.8 }}
          animate={{
            y: ['0px', '-20px', '0px'],
            opacity: [0.6, 0.8, 0.6],
            scale: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 5,
            delay: bubble.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div 
            className="w-2 h-2 md:w-3 md:h-3 rounded-full"
            style={{
              background: 'rgba(255, 255, 255, 0.3)',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              backdropFilter: 'blur(2px)',
            }}
          />
        </motion.div>
      ))}

      {/* Main Content - Perfectly Centered, Minimal Top Padding */}
      <div 
        ref={textContainerRef}
        className="relative z-30 w-full max-w-5xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center justify-center pt-8 md:pt-12"
      >
        {/* "Your Living" - Above Main Title */}
        <motion.h2
          ref={yourLivingRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-2 md:mb-3"
          style={{
            color: '#166534',
            letterSpacing: '-0.01em',
          }}
        >
          <span ref={yourTextRef} className="inline-block">
            {/* Light mode: dark green text */}
            <span className="dark:hidden">Your</span>
            {/* Dark mode: neon green with glow */}
            <span className="hidden dark:inline-block" style={{
              color: '#4ade80',
              textShadow: '0 0 15px rgba(74, 222, 128, 0.4)',
            }}>Your</span>
          </span>
          {' '}
          {/* Light mode: dark green text */}
          <span className="dark:hidden">Living</span>
          {/* Dark mode: neon green with glow */}
          <span className="hidden dark:inline-block" style={{
            color: '#4ade80',
            textShadow: '0 0 15px rgba(74, 222, 128, 0.4)',
          }}>Living</span>
        </motion.h2>

        {/* Main Title - "Photosynthesis World" */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-5 md:mb-7"
          style={{
            color: '#166534',
            letterSpacing: '-0.02em',
            lineHeight: '1.1',
          }}
        >
          {/* Light mode: dark green text */}
          <span className="dark:hidden">
            Photosynthesis World{' '}
            <span className="inline-block align-middle">
              <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">🌱</span>
            </span>
          </span>
          {/* Dark mode: neon green with glow */}
          <span className="hidden dark:inline-block" style={{
            color: '#4ade80',
            textShadow: '0 0 20px rgba(74, 222, 128, 0.5), 0 2px 10px rgba(74, 222, 128, 0.3)',
          }}>
            Photosynthesis World{' '}
            <span className="inline-block align-middle">
              <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">🌱</span>
            </span>
          </span>
        </motion.h1>

        {/* Tagline - "Learn • Simulate • Visualize" */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-8 md:mb-10 lg:mb-12 font-medium"
          style={{
            letterSpacing: '0.05em',
            color: '#166534',
          }}
        >
          {/* Light mode: dark green */}
          <span className="dark:hidden">
            Learn <span className="text-[#86efac]">•</span> Simulate <span className="text-[#86efac]">•</span> Visualize
          </span>
          {/* Dark mode: white with dark green dots */}
          <span className="hidden dark:inline-block text-white">
            Learn <span className="text-[#2d5a3d]">•</span> Simulate <span className="text-[#2d5a3d]">•</span> Visualize
          </span>
        </motion.p>

        {/* Start Simulation Button - Elegant, Balanced Size */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center mt-2 md:mt-4"
        >
          <Link href="#simulation">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-white rounded-xl transition-all duration-300"
              style={{
                background: '#22c55e',
                boxShadow: '0 4px 16px rgba(34, 197, 94, 0.35), 0 0 24px rgba(34, 197, 94, 0.15)',
              }}
            >
              {/* Light mode: elegant shadow */}
              <span className="dark:hidden">
                Start Simulation
              </span>
              {/* Dark mode: subtle glow */}
              <span className="hidden dark:inline-block" style={{
                boxShadow: '0 4px 20px rgba(34, 197, 94, 0.5), 0 0 30px rgba(74, 222, 128, 0.3)',
              }}>
                Start Simulation
              </span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
