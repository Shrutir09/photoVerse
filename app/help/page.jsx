'use client'

import ProtectedRoute from '../components/ProtectedRoute'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function HelpPage() {
  const [openFaq, setOpenFaq] = useState(null)

  const faqs = [
    {
      question: 'How do I use the simulation?',
      answer: 'Adjust the sliders for Sunlight, CO₂, and Temperature to see how they affect photosynthesis. Watch the plant grow, oxygen bubbles appear, and check the data panels for real-time statistics.',
    },
    {
      question: 'What is the photosynthesis formula?',
      answer: 'The formula used is: Photosynthesis Rate = (Sunlight × CO₂) / Temperature. This simplified model demonstrates how these factors interact in real photosynthesis.',
    },
    {
      question: 'How do I earn badges?',
      answer: 'Complete challenges in the Games section, achieve optimal photosynthesis rates, and reach milestones. Badges unlock as you progress and earn points.',
    },
    {
      question: 'Can I use PhotoBot without an API key?',
      answer: 'Yes! PhotoBot works with fallback responses for common questions. For advanced AI features, you can optionally add your OpenAI API key.',
    },
    {
      question: 'Is my data saved?',
      answer: 'Your progress, badges, and preferences are saved locally in your browser. For cloud sync and multi-device access, account features are coming soon.',
    },
    {
      question: 'How do I change the language?',
      answer: 'Click the language toggle button (A/अ) in the navbar to switch between English and Hindi. Your preference is automatically saved.',
    },
  ]

  return (
    <ProtectedRoute>
      <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-green-50 via-emerald-50 to-cyan-50 dark:from-gray-900 dark:via-green-900 dark:to-emerald-900">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-3xl p-8 md:p-12 border-2 border-green-500/20"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
              Help & Support
            </h1>

            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">
                  Get in Touch
                </h2>
                <div className="space-y-4">
                  <a
                    href="mailto:support@photosphere.app"
                    className="flex items-center gap-3 p-4 glass rounded-xl hover:bg-green-500/10 transition-all group"
                  >
                    <span className="text-3xl">📧</span>
                    <div>
                      <div className="font-semibold text-gray-700 dark:text-gray-300">Email Support</div>
                      <div className="text-green-600 dark:text-green-400 group-hover:underline">support@photosphere.app</div>
                    </div>
                  </a>
                  <a
                    href="tel:+911234567890"
                    className="flex items-center gap-3 p-4 glass rounded-xl hover:bg-green-500/10 transition-all group"
                  >
                    <span className="text-3xl">📞</span>
                    <div>
                      <div className="font-semibold text-gray-700 dark:text-gray-300">Phone Support</div>
                      <div className="text-green-600 dark:text-green-400 group-hover:underline">+91-XXXXXXXXXX</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-3xl p-8 md:p-12 border-2 border-green-500/20"
          >
            <h2 className="text-3xl font-bold mb-6 text-green-600 dark:text-green-400">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-green-500/20 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full p-4 text-left flex items-center justify-between hover:bg-green-500/10 transition-colors"
                  >
                    <span className="font-semibold text-gray-700 dark:text-gray-300">
                      {faq.question}
                    </span>
                    <span className="text-2xl text-green-600 dark:text-green-400">
                      {openFaq === index ? '−' : '+'}
                    </span>
                  </button>
                  {openFaq === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-4 bg-green-500/5 text-gray-600 dark:text-gray-400"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

