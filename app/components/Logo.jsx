'use client'

import { motion } from 'framer-motion'

export default function Logo({ size = 'md' }) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  }

  return (
    <motion.div
      className={`${sizes[size]} relative`}
      whileHover={{ scale: 1.1, rotate: 5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-lg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Sun rays gradient */}
          <linearGradient id="sunGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.5" />
          </linearGradient>
          
          {/* Circle background gradient */}
          <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#d1fae5" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#86efac" stopOpacity="0.6" />
          </linearGradient>
          
          {/* Leaf gradient - bold green and white */}
          <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="1" />
            <stop offset="30%" stopColor="#16a34a" stopOpacity="1" />
            <stop offset="60%" stopColor="#ffffff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#15803d" stopOpacity="1" />
          </linearGradient>
          
          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          {/* Shadow filter */}
          <filter id="shadow">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#22c55e" floodOpacity="0.5"/>
          </filter>
        </defs>

        {/* Sun rays background - bolder */}
        <g opacity="0.7">
          {[...Array(8)].map((_, i) => {
            const angle = (i * 45) * (Math.PI / 180)
            const x1 = 50 + Math.cos(angle) * 32
            const y1 = 50 + Math.sin(angle) * 32
            const x2 = 50 + Math.cos(angle) * 48
            const y2 = 50 + Math.sin(angle) * 48
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="url(#sunGradient)"
                strokeWidth="3"
                strokeLinecap="round"
              />
            )
          })}
        </g>

        {/* Circle background with bold white and green */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="url(#circleGradient)"
          stroke="#22c55e"
          strokeWidth="2"
          filter="url(#shadow)"
        />

        {/* Bold leaf with green and white mix */}
        <g>
          {/* Main leaf shape - bolder */}
          <motion.path
            d="M 50 15 Q 30 25 25 42 Q 20 60 32 72 Q 42 78 50 82 Q 58 78 68 72 Q 80 60 75 42 Q 70 25 50 15 Z"
            fill="url(#leafGradient)"
            filter="url(#glow)"
            stroke="#15803d"
            strokeWidth="1.5"
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Bold leaf vein - white highlight */}
          <line
            x1="50"
            y1="15"
            x2="50"
            y2="82"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.8"
          />
          
          {/* Side veins - white highlights */}
          <line
            x1="50"
            y1="30"
            x2="40"
            y2="50"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.6"
          />
          <line
            x1="50"
            y1="30"
            x2="60"
            y2="50"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.6"
          />
          <line
            x1="50"
            y1="55"
            x2="38"
            y2="70"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.6"
          />
          <line
            x1="50"
            y1="55"
            x2="62"
            y2="70"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.6"
          />
        </g>
      </svg>
    </motion.div>
  )
}
