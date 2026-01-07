'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { askPhotoBot, fallbackResponses } from '../ai/photobot'

export default function PhotoBot({ language = 'en' }) {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)
  const [apiKey, setApiKey] = useState(process.env.NEXT_PUBLIC_OPENAI_API_KEY || '')

  const translations = {
    en: {
      title: '🤖🌱 PhotoBot - Your AI Tutor',
      placeholder: 'Ask me about photosynthesis...',
      askButton: 'Ask PhotoBot',
      exampleQuestions: 'Example Questions:',
      examples: [
        'How does photosynthesis work?',
        'Why do plants need sunlight?',
        'What happens if CO₂ is high?',
        'How do plants make food?',
      ],
      apiKeyPlaceholder: 'OpenAI API Key (optional)',
    },
    hi: {
      title: '🤖🌱 PhotoBot - आपका AI ट्यूटर',
      placeholder: 'मुझसे प्रकाश संश्लेषण के बारे में पूछें...',
      askButton: 'PhotoBot से पूछें',
      exampleQuestions: 'उदाहरण प्रश्न:',
      examples: [
        'प्रकाश संश्लेषण कैसे काम करता है?',
        'पौधों को सूरज की रोशनी की आवश्यकता क्यों है?',
        'यदि CO₂ अधिक है तो क्या होता है?',
        'पौधे भोजन कैसे बनाते हैं?',
      ],
      apiKeyPlaceholder: 'OpenAI API Key (वैकल्पिक)',
    },
  }

  const t = translations[language] || translations.en

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
        setAnswer("I'd love to help! Please add your OpenAI API key above to get detailed answers, or try one of the example questions for a quick answer.")
      }
      setLoading(false)
    }
  }

  const handleExampleClick = (example) => {
    setQuestion(example)
  }

  return (
    <div className="glass rounded-2xl p-6 space-y-4">
      <h2 className="text-2xl font-bold text-center">{t.title}</h2>

      {/* API Key Input */}
      <div className="space-y-2">
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder={t.apiKeyPlaceholder}
          className="w-full px-4 py-2 rounded-lg bg-white/10 dark:bg-black/20 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Question Input */}
      <div className="space-y-2">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder={t.placeholder}
          className="w-full px-4 py-3 rounded-lg bg-white/10 dark:bg-black/20 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
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
          {loading ? 'Thinking...' : t.askButton}
        </motion.button>
      </div>

      {/* Example Questions */}
      <div className="space-y-2">
        <div className="text-sm font-semibold">{t.exampleQuestions}</div>
        <div className="flex flex-wrap gap-2">
          {t.examples.map((example, idx) => (
            <motion.button
              key={idx}
              onClick={() => handleExampleClick(example)}
              className="px-3 py-1 text-sm bg-blue-500/20 hover:bg-blue-500/30 rounded-lg border border-blue-500/30"
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
          className="mt-4 p-4 bg-green-500/10 rounded-lg border border-green-500/30"
        >
          <div className="flex items-start gap-2">
            <span className="text-2xl">🤖</span>
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
              {answer}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  )
}

