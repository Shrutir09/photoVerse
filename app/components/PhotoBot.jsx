'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { askPhotoBot, fallbackResponses } from '../ai/photobot'
import { useTranslation } from '../context/TranslationContext'
import { t } from '../utils/translations'

export default function PhotoBot() {
  const { language } = useTranslation()
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)
  const [apiKey, setApiKey] = useState(process.env.NEXT_PUBLIC_OPENAI_API_KEY || '')

  const examples = language === 'hi' ? [
    'प्रकाश संश्लेषण कैसे काम करता है?',
    'पौधों को सूरज की रोशनी की आवश्यकता क्यों है?',
    'यदि CO₂ अधिक है तो क्या होता है?',
    'पौधे भोजन कैसे बनाते हैं?',
  ] : [
    'How does photosynthesis work?',
    'Why do plants need sunlight?',
    'What happens if CO₂ is high?',
    'How do plants make food?',
  ]

  const handleAsk = async () => {
    if (!question.trim()) return

    setLoading(true)
    setAnswer('')

    // Check for fallback responses first
    const lowerQuestion = question.toLowerCase()
    let foundFallback = false

    for (const [key, response] of Object.entries(fallbackResponses)) {
      if (lowerQuestion.includes(key)) {
        setAnswer(response)
        setLoading(false)
        foundFallback = true
        break
      }
    }

    if (!foundFallback) {
      // Try API if key is provided
      if (apiKey) {
        const result = await askPhotoBot(question, apiKey)
        setAnswer(result.answer)
      } else {
        setAnswer(language === 'hi' 
          ? "मैं मदद करना चाहूंगा! विस्तृत उत्तर पाने के लिए कृपया ऊपर अपनी OpenAI API key जोड़ें, या त्वरित उत्तर के लिए उदाहरण प्रश्नों में से एक को आज़माएं।"
          : "I'd love to help! Please add your OpenAI API key above to get detailed answers, or try one of the example questions for a quick answer.")
      }
      setLoading(false)
    }
  }

  const handleExampleClick = (example) => {
    setQuestion(example)
  }

  return (
    <div className="glass rounded-2xl p-6 space-y-4 bg-white/90 dark:bg-chalkboard-surface">
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-chalk-white">{t('photobot.title', language)}</h2>

      {/* API Key Input */}
      <div className="space-y-2">
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder={language === 'hi' ? 'OpenAI API Key (वैकल्पिक)' : 'OpenAI API Key (optional)'}
          className="w-full px-4 py-2 rounded-lg bg-white dark:bg-chalkboard-bg border border-gray-300 dark:border-chalk-border text-gray-800 dark:text-chalk-white placeholder-gray-500 dark:placeholder-chalk-secondary focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Question Input */}
      <div className="space-y-2">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder={t('photobot.placeholder', language)}
          className="w-full px-4 py-3 rounded-lg bg-white dark:bg-chalkboard-bg border border-gray-300 dark:border-chalk-border text-gray-800 dark:text-chalk-white placeholder-gray-500 dark:placeholder-chalk-secondary focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
          rows="3"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
              handleAsk()
            }
          }}
        />
        <motion.button
          onClick={handleAsk}
          disabled={loading || !question.trim()}
          className="w-full py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-bold rounded-lg transition-colors"
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
        >
          {loading ? t('photobot.thinking', language) : t('photobot.send', language)}
        </motion.button>
      </div>

      {/* Example Questions */}
      <div className="space-y-2">
        <div className="text-sm font-semibold text-gray-800 dark:text-chalk-white">{t('photobot.exampleQuestions', language)}</div>
        <div className="flex flex-wrap gap-2">
          {examples.map((example, idx) => (
            <motion.button
              key={idx}
              onClick={() => handleExampleClick(example)}
              className="px-3 py-1 text-sm bg-blue-500/20 dark:bg-blue-500/30 hover:bg-blue-500/30 dark:hover:bg-blue-500/40 rounded-lg border border-blue-500/30 dark:border-blue-500/40 text-blue-700 dark:text-blue-200 font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {example}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Answer Display */}
      {answer && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-green-500/10 dark:bg-green-500/20 rounded-lg border border-green-500/30 dark:border-green-500/40"
        >
          <div className="flex items-start gap-2">
            <span className="text-2xl">🤖</span>
            <p className="text-gray-800 dark:text-chalk-white whitespace-pre-wrap">
              {answer}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  )
}

