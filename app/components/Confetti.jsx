'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Confetti({ active, onComplete }) {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    if (active) {
      // Generate confetti particles
      const colors = ['#22c55e', '#10b981', '#3b82f6', '#06b6d4', '#f59e0b', '#ef4444', '#a855f7']
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        color: colors[Math.floor(Math.random() * colors.length)],
        x: Math.random() * 100,
        y: -10,
        rotation: Math.random() * 360,
        delay: Math.random() * 0.5,
      }))
      setParticles(newParticles)

      // Clean up after animation
      const timer = setTimeout(() => {
        setParticles([])
        if (onComplete) onComplete()
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [active, onComplete])

  if (!active || particles.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-3 h-3 rounded-full"
          style={{
            backgroundColor: particle.color,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          initial={{
            y: -10,
            x: 0,
            rotate: 0,
            opacity: 1,
          }}
          animate={{
            y: typeof window !== 'undefined' ? window.innerHeight + 20 : 800,
            x: (Math.random() - 0.5) * 200,
            rotate: particle.rotation + 720,
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: 2 + Math.random(),
            delay: particle.delay,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  )
}

