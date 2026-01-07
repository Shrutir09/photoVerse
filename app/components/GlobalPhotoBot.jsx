'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { askPhotoBot, fallbackResponses } from '../ai/photobot'

export default function GlobalPhotoBot({ 
  sunlight = 50, 
  co2 = 50, 
  temperature = 25, 
  photosynthesisRate = 0, 
  oxygen = 0, 
  plantHealth = null,
  language = 'en' 
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const panelRef = useRef(null)

  // Load saved position and open state
  useEffect(() => {
    const savedPosition = localStorage.getItem('photobotPosition')
    const savedOpen = localStorage.getItem('photobotOpen') === 'true'
    
    if (savedPosition) {
      try {
        setPosition(JSON.parse(savedPosition))
      } catch (e) {
        // Invalid position, use default
      }
    }
    
    setIsOpen(savedOpen)
  }, [])

  // Save position and open state
  useEffect(() => {
    if (position.x !== 0 || position.y !== 0) {
      localStorage.setItem('photobotPosition', JSON.stringify(position))
    }
    localStorage.setItem('photobotOpen', isOpen.toString())
  }, [position, isOpen])

  // Scroll to bottom when new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMsg = language === 'hi' 
        ? 'नमस्ते! मैं PhotoBot हूं। मैं प्रकाश संश्लेषण और पौधों के बारे में आपकी मदद कर सकता हूं।'
        : "Hello! I'm PhotoBot. I can help you understand photosynthesis and plants!"
      setMessages([{ role: 'assistant', content: welcomeMsg }])
    }
  }, [isOpen, language])

  const handleMouseDown = (e) => {
    if (e.target.closest('input, button, a')) return
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
      const maxY = window.innerHeight - 500
      
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

  const getContextInfo = () => {
    return {
      sunlight,
      co2,
      temperature,
      photosynthesisRate: photosynthesisRate.toFixed(1),
      oxygen,
      plantHealth: plantHealth?.status || 'unknown',
    }
  }

  const handleSendMessage = async (text = null) => {
    const messageText = text || inputValue.trim()
    if (!messageText) return

    // Add user message
    const userMessage = { role: 'user', content: messageText }
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setLoading(true)

    // Get context
    const context = getContextInfo()
    const contextPrompt = `Current environment: Sunlight ${context.sunlight}%, CO₂ ${context.co2}%, Temperature ${context.temperature}°C. Photosynthesis rate: ${context.photosynthesisRate}%, Oxygen: ${context.oxygen}%, Plant health: ${context.plantHealth}.`

    // Check for fallback responses first
    const lowerMessage = messageText.toLowerCase()
    let foundFallback = false

    for (const [key, response] of Object.entries(fallbackResponses)) {
      if (lowerMessage.includes(key)) {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: response + '\n\n' + contextPrompt 
        }])
        setLoading(false)
        foundFallback = true
        break
      }
    }

    if (!foundFallback) {
      // Try API or use smart response
      const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY
      if (apiKey) {
        try {
          const result = await askPhotoBot(`${contextPrompt}\n\nUser question: ${messageText}`, apiKey)
          setMessages(prev => [...prev, { role: 'assistant', content: result.answer }])
        } catch (e) {
          setMessages(prev => [...prev, { 
            role: 'assistant', 
            content: generateSmartResponse(messageText, context) 
          }])
        }
      } else {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: generateSmartResponse(messageText, context) 
        }])
      }
      setLoading(false)
    }
  }

  const generateSmartResponse = (question, context) => {
    const lowerQ = question.toLowerCase()
    
    if (lowerQ.includes('sunlight') || lowerQ.includes('sun')) {
      return `Your current sunlight is ${context.sunlight}%. ${context.sunlight > 70 ? 'Great! High sunlight helps photosynthesis.' : context.sunlight < 30 ? 'Low sunlight slows down photosynthesis. Try increasing it.' : 'Moderate sunlight is good, but you could increase it for better results.'}`
    }
    
    if (lowerQ.includes('co2') || lowerQ.includes('carbon')) {
      return `Your CO₂ level is ${context.co2}%. ${context.co2 > 70 ? 'High CO₂ levels boost photosynthesis!' : context.co2 < 30 ? 'Low CO₂ limits photosynthesis. Increase it for better results.' : 'CO₂ level is moderate. Higher levels can improve photosynthesis.'}`
    }
    
    if (lowerQ.includes('temperature') || lowerQ.includes('temp')) {
      return `Current temperature is ${context.temperature}°C. ${context.temperature > 40 ? 'Too hot! Lower temperature for better efficiency.' : context.temperature < 15 ? 'Too cold! Increase temperature for optimal photosynthesis.' : 'Temperature is in a good range for photosynthesis.'}`
    }
    
    if (lowerQ.includes('health') || lowerQ.includes('plant')) {
      return `Your plant health is ${context.plantHealth}. Photosynthesis rate: ${context.photosynthesisRate}%, Oxygen: ${context.oxygen}%. ${context.plantHealth === 'healthy' ? 'Excellent! Your plant is thriving!' : context.plantHealth === 'average' ? 'Your plant is doing okay, but could be better. Try adjusting sunlight and CO₂.' : 'Your plant needs help. Increase sunlight and CO₂, lower temperature.'}`
    }
    
    if (lowerQ.includes('oxygen')) {
      return `Current oxygen output: ${context.oxygen}%. This is directly related to your photosynthesis rate of ${context.photosynthesisRate}%. ${context.oxygen > 70 ? 'Excellent oxygen production!' : context.oxygen > 50 ? 'Good oxygen levels.' : 'Oxygen production is low. Improve photosynthesis to increase it.'}`
    }
    
    return `Based on your current settings (Sunlight: ${context.sunlight}%, CO₂: ${context.co2}%, Temperature: ${context.temperature}°C), your photosynthesis rate is ${context.photosynthesisRate}% and oxygen output is ${context.oxygen}%. Your plant health is ${context.plantHealth}. How can I help you improve these?`
  }

  const handleQuickAction = async (action) => {
    const context = getContextInfo()
    let prompt = ''
    
    switch (action) {
      case 'suggest':
        prompt = language === 'hi' 
          ? 'मेरे लिए सर्वोत्तम स्थितियां सुझाएं'
          : 'Suggest the best conditions for optimal photosynthesis'
        break
      case 'predict':
        prompt = language === 'hi'
          ? 'मेरे पौधे के स्वास्थ्य की भविष्यवाणी करें'
          : 'Predict my plant health based on current conditions'
        break
      case 'explain':
        prompt = language === 'hi'
          ? 'मेरे परिणामों की व्याख्या करें'
          : 'Explain my current results'
        break
      case 'tips':
        prompt = language === 'hi'
          ? 'पर्यावरण सुझाव दें'
          : 'Give me environment tips'
        break
    }
    
    await handleSendMessage(prompt)
  }

  const quickActions = [
    { id: 'suggest', icon: '🌞', label: { en: 'Suggest Best Conditions', hi: 'सर्वोत्तम स्थितियां' } },
    { id: 'predict', icon: '🌿', label: { en: 'Predict Plant Health', hi: 'स्वास्थ्य भविष्यवाणी' } },
    { id: 'explain', icon: '📊', label: { en: 'Explain My Results', hi: 'परिणाम समझाएं' } },
    { id: 'tips', icon: '🌍', label: { en: 'Environment Tips', hi: 'पर्यावरण सुझाव' } },
  ]

  const t = (key) => {
    const translations = {
      en: { placeholder: 'Ask PhotoBot...', send: 'Send' },
      hi: { placeholder: 'PhotoBot से पूछें...', send: 'भेजें' },
    }
    return translations[language]?.[key] || translations.en[key]
  }

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 glass rounded-full px-6 py-4 shadow-2xl border-2 border-green-500/30 hover:bg-green-500/10 transition-all flex items-center gap-3"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            y: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          style={{
            boxShadow: '0 4px 20px rgba(34, 197, 94, 0.3)',
          }}
        >
          <span className="text-3xl">🌱</span>
          <span className="font-semibold text-lg hidden md:inline">PhotoBot</span>
        </motion.button>
      )}

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed z-50 w-96 max-w-[90vw] max-h-[80vh]"
            style={{
              left: position.x || 'calc(100% - 420px)',
              top: position.y || 'calc(100% - 600px)',
              cursor: isDragging ? 'grabbing' : 'default',
            }}
            onMouseDown={handleMouseDown}
          >
            <div className="glass rounded-2xl p-6 shadow-2xl border-2 border-green-500/30 flex flex-col h-full max-h-[80vh]">
              {/* Header */}
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-green-500/20">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <span className="text-2xl">🌱</span>
                  PhotoBot
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-2xl hover:scale-110 transition-transform text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {quickActions.map((action) => (
                  <motion.button
                    key={action.id}
                    onClick={() => handleQuickAction(action.id)}
                    className="p-2 glass rounded-lg hover:bg-green-500/20 transition-all text-sm text-left"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-lg mr-1">{action.icon}</span>
                    <span className="text-xs">{action.label[language] || action.label.en}</span>
                  </motion.button>
                ))}
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-xl p-3 ${
                        msg.role === 'user'
                          ? 'bg-green-500/20 text-white'
                          : 'bg-white/10 dark:bg-gray-800/30 text-gray-200'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-white/10 dark:bg-gray-800/30 rounded-xl p-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="flex gap-2 pt-4 border-t border-green-500/20">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                  placeholder={t('placeholder')}
                  className="flex-1 px-4 py-2 rounded-lg bg-white/10 dark:bg-gray-800/30 border border-green-500/30 focus:outline-none focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400"
                />
                <motion.button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim() || loading}
                  className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: loading ? 1 : 1.05 }}
                  whileTap={{ scale: loading ? 1 : 0.95 }}
                >
                  {t('send')}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

