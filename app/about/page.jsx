'use client'

import ProtectedRoute from '../components/ProtectedRoute'
import { motion } from 'framer-motion'

export default function AboutPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-green-50 via-emerald-50 to-cyan-50 dark:from-gray-900 dark:via-green-900 dark:to-emerald-900">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-3xl p-8 md:p-12 border-2 border-green-500/20"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
              About PHOTOSPHERE
            </h1>

            <div className="space-y-6 text-gray-700 dark:text-gray-300">
              <p className="text-lg leading-relaxed">
                PHOTOSPHERE is an innovative, AI-powered educational platform that brings the fascinating world of photosynthesis to life through interactive simulations and real-time visualizations.
              </p>

              <div>
                <h2 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">
                  Our Mission
                </h2>
                <p className="leading-relaxed">
                  We believe that learning about photosynthesis should be engaging, interactive, and accessible to everyone. PHOTOSPHERE combines cutting-edge technology with educational excellence to create an immersive learning experience that helps students, teachers, and curious minds understand how plants convert sunlight into life.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">
                  What We Offer
                </h2>
                <ul className="space-y-3 list-disc list-inside">
                  <li><strong>Live Simulations:</strong> Real-time photosynthesis simulation with interactive controls for sunlight, CO₂, and temperature</li>
                  <li><strong>Educational Games:</strong> Fun, interactive challenges that teach photosynthesis concepts</li>
                  <li><strong>Learning Resources:</strong> Comprehensive guides and interactive cards explaining photosynthesis</li>
                  <li><strong>Data Analytics:</strong> Visual charts and graphs showing photosynthesis rates and oxygen production</li>
                  <li><strong>AI Assistant:</strong> PhotoBot, your intelligent tutor ready to answer questions and provide insights</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">
                  Technology
                </h2>
                <p className="leading-relaxed">
                  Built with modern web technologies including Next.js, React, and AI integration, PHOTOSPHERE delivers a smooth, responsive experience across all devices. Our platform uses real scientific formulas to calculate photosynthesis rates, making it both educational and accurate.
                </p>
              </div>

              <div className="mt-8 p-6 bg-green-500/10 rounded-xl border border-green-500/20">
                <p className="text-center text-lg font-semibold text-green-700 dark:text-green-400">
                  🌱 Where Sunlight Becomes Life 🌱
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

