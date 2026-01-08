'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProtectedRoute from '../components/ProtectedRoute'
import { useAuth } from '../context/AuthContext'
import Footer from '../components/Footer'
import { useTranslation } from '../context/TranslationContext'
import { t } from '../utils/translations'

export default function MyPlantPage() {
  const { language } = useTranslation()
  const { user } = useAuth()
  const [checklist, setChecklist] = useState({
    planted: false,
    sunlight: false,
    watered: false,
    growthCheck: false,
  })
  const [careStreak, setCareStreak] = useState(0)
  const [lastCareDate, setLastCareDate] = useState(null)
  const [plantHealth, setPlantHealth] = useState('Wilting')
  const [motivationalMessage, setMotivationalMessage] = useState('')

  // Get today's date string
  const getTodayString = () => {
    const today = new Date()
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
  }

  // Load user's plant data and check for new day
  useEffect(() => {
    if (!user) return

    const today = getTodayString()
    const plantDataKey = `myPlant_${user.email || 'guest'}`
    const savedData = localStorage.getItem(plantDataKey)

    if (savedData) {
      try {
        const data = JSON.parse(savedData)
        
        // Check if it's a new day
        if (data.lastDate !== today) {
          // Reset checklist for new day
          setChecklist({
            planted: false,
            sunlight: false,
            watered: false,
            growthCheck: false,
          })
          
          // Check if streak should continue or reset
          if (data.lastCompletedDate) {
            const lastCompleted = new Date(data.lastCompletedDate)
            const todayDate = new Date(today)
            const daysDiff = Math.floor((todayDate - lastCompleted) / (1000 * 60 * 60 * 24))
            
            if (daysDiff === 1 && data.completedAll) {
              // Continue streak (yesterday was completed)
              setCareStreak(data.careStreak || 0)
            } else {
              // Reset streak (missed a day or more)
              setCareStreak(0)
            }
          } else {
            setCareStreak(0)
          }
          
          // Reset streak update flag for new day
          const updatedData = {
            ...data,
            lastDate: today,
            streakUpdatedToday: false,
            checklist: {
              planted: false,
              sunlight: false,
              watered: false,
              growthCheck: false,
            },
          }
          localStorage.setItem(plantDataKey, JSON.stringify(updatedData))
          setLastCareDate(today)
        } else {
          // Same day - load existing checklist
          setChecklist(data.checklist || {
            planted: false,
            sunlight: false,
            watered: false,
            growthCheck: false,
          })
          setCareStreak(data.careStreak || 0)
          setLastCareDate(data.lastDate)
        }
      } catch (e) {
        console.error('Error loading plant data:', e)
      }
    } else {
      setLastCareDate(today)
    }
  }, [user])

  // Check for new day periodically (every minute)
  useEffect(() => {
    if (!user) return

    const interval = setInterval(() => {
      const today = getTodayString()
      const plantDataKey = `myPlant_${user.email || 'guest'}`
      const savedData = localStorage.getItem(plantDataKey)
      
      if (savedData) {
        const data = JSON.parse(savedData)
        if (data.lastDate !== today) {
          // New day detected - reset checklist and update streak
          setChecklist({
            planted: false,
            sunlight: false,
            watered: false,
            growthCheck: false,
          })
          
          // Check if streak should continue or reset
          if (data.lastCompletedDate) {
            const lastCompleted = new Date(data.lastCompletedDate)
            const todayDate = new Date(today)
            const daysDiff = Math.floor((todayDate - lastCompleted) / (1000 * 60 * 60 * 24))
            
            if (daysDiff === 1 && data.completedAll) {
              setCareStreak(data.careStreak || 0)
            } else {
              setCareStreak(0)
            }
          } else {
            setCareStreak(0)
          }
          
          // Update localStorage
          const updatedData = {
            ...data,
            lastDate: today,
            streakUpdatedToday: false,
            checklist: {
              planted: false,
              sunlight: false,
              watered: false,
              growthCheck: false,
            },
          }
          localStorage.setItem(plantDataKey, JSON.stringify(updatedData))
          setLastCareDate(today)
        }
      }
    }, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [user])

  // Calculate plant health and update message
  useEffect(() => {
    const completedCount = Object.values(checklist).filter(Boolean).length
    
    let healthKey = 'wilting'
    if (completedCount === 2) healthKey = 'weak'
    else if (completedCount === 3) healthKey = 'healthy'
    else if (completedCount === 4) healthKey = 'thriving'
    
    setPlantHealth(healthKey)

    // Set motivational message
    let messageKey = 'needsCare'
    if (completedCount === 1) messageKey = 'needsAttention'
    else if (completedCount === 2) messageKey = 'gettingBetter'
    else if (completedCount === 3) messageKey = 'happy'
    else if (completedCount === 4) messageKey = 'thrivingMessage'
    
    setMotivationalMessage(t(`myPlant.${messageKey}`, language))

    // Save to localStorage (but don't update streak here - that's handled in separate effect)
    if (user) {
      const today = getTodayString()
      const plantDataKey = `myPlant_${user.email || 'guest'}`
      const savedData = localStorage.getItem(plantDataKey)
      const data = savedData ? JSON.parse(savedData) : {}
      
      const plantData = {
        ...data,
        checklist,
        lastDate: today,
        completedAll: completedCount === 4,
      }
      localStorage.setItem(plantDataKey, JSON.stringify(plantData))
    }
  }, [checklist, careStreak, user])

  // Update streak when all tasks completed
  useEffect(() => {
    const completedCount = Object.values(checklist).filter(Boolean).length
    if (completedCount === 4 && user) {
      const today = getTodayString()
      const plantDataKey = `myPlant_${user.email || 'guest'}`
      const savedData = localStorage.getItem(plantDataKey)
      
      if (savedData) {
        const data = JSON.parse(savedData)
        // Only update streak once per day
        if (data.lastDate === today && !data.streakUpdatedToday) {
          // Calculate yesterday's date
          const yesterday = new Date(today)
          yesterday.setDate(yesterday.getDate() - 1)
          const yesterdayString = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`
          
          let newStreak = 1
          
          // Check if yesterday was completed
          if (data.lastCompletedDate === yesterdayString && data.completedAll) {
            // Continue streak
            newStreak = (data.careStreak || 0) + 1
          } else if (data.lastCompletedDate) {
            // Check if more than 1 day passed
            const lastCompleted = new Date(data.lastCompletedDate)
            const todayDate = new Date(today)
            const daysDiff = Math.floor((todayDate - lastCompleted) / (1000 * 60 * 60 * 24))
            
            if (daysDiff === 1) {
              // Yesterday was completed, continue streak
              newStreak = (data.careStreak || 0) + 1
            } else {
              // More than 1 day passed, reset streak
              newStreak = 1
            }
          }
          
          setCareStreak(newStreak)
          
          // Mark streak as updated for today
          const updatedData = {
            ...data,
            checklist,
            careStreak: newStreak,
            lastDate: today,
            lastCompletedDate: today,
            completedAll: true,
            streakUpdatedToday: true,
          }
          localStorage.setItem(plantDataKey, JSON.stringify(updatedData))
        }
      } else {
        // First time completing all tasks
        setCareStreak(1)
        const plantData = {
          checklist,
          careStreak: 1,
          lastDate: today,
          lastCompletedDate: today,
          completedAll: true,
          streakUpdatedToday: true,
        }
        localStorage.setItem(plantDataKey, JSON.stringify(plantData))
      }
    } else if (completedCount < 4 && user) {
      // If not all tasks completed, mark streak as not updated today
      const today = getTodayString()
      const plantDataKey = `myPlant_${user.email || 'guest'}`
      const savedData = localStorage.getItem(plantDataKey)
      
      if (savedData) {
        const data = JSON.parse(savedData)
        if (data.lastDate === today) {
          const updatedData = {
            ...data,
            checklist,
            completedAll: false,
            streakUpdatedToday: false,
          }
          localStorage.setItem(plantDataKey, JSON.stringify(updatedData))
        }
      }
    }
  }, [checklist, user])

  // Toggle checklist item (can only check, not uncheck once checked)
  const toggleTask = (taskKey) => {
    // Don't allow unchecking once checked
    if (checklist[taskKey]) return
    
    setChecklist((prev) => {
      const newChecklist = { ...prev, [taskKey]: true }
      
      // Save immediately
      if (user) {
        const today = getTodayString()
        const plantDataKey = `myPlant_${user.email || 'guest'}`
        const savedData = localStorage.getItem(plantDataKey)
        const data = savedData ? JSON.parse(savedData) : {}
        
        const plantData = {
          ...data,
          checklist: newChecklist,
          lastDate: today,
        }
        localStorage.setItem(plantDataKey, JSON.stringify(plantData))
      }
      
      return newChecklist
    })
  }

  // Get plant emoji based on health
  const getPlantEmoji = () => {
    switch (plantHealth) {
      case 'thriving':
        return '🌳'
      case 'healthy':
        return '🌿'
      case 'weak':
        return '🌱'
      case 'wilting':
      default:
        return '🍂'
    }
  }

  // Get plant size based on health
  const getPlantSize = () => {
    switch (plantHealth) {
      case 'thriving':
        return 'text-[12rem] md:text-[16rem]'
      case 'healthy':
        return 'text-[10rem] md:text-[14rem]'
      case 'weak':
        return 'text-[8rem] md:text-[12rem]'
      case 'wilting':
      default:
        return 'text-[6rem] md:text-[10rem]'
    }
  }

  const tasks = [
    { key: 'planted', icon: '🌱', labelKey: 'myPlant.plantPlanted' },
    { key: 'sunlight', icon: '☀️', labelKey: 'myPlant.sunlightGiven' },
    { key: 'watered', icon: '💧', labelKey: 'myPlant.wateredToday' },
    { key: 'growthCheck', icon: '🌿', labelKey: 'myPlant.growthCheck' },
  ]

  return (
    <ProtectedRoute>
      <div className="min-h-screen p-6 md:p-10 bg-gradient-to-br from-green-50/90 via-emerald-50/70 to-cyan-50/80 dark:bg-chalkboard-bg">
        <div className="max-w-6xl mx-auto space-y-8 md:space-y-10">
          {/* Header */}
          <motion.div
            className="text-center mb-8 md:mb-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-green-500 bg-clip-text text-transparent mb-4 md:mb-6 font-sans">
              {t('myPlant.title', language)}
            </h1>
            <p className="text-lg md:text-xl text-gray-500 dark:text-chalk-secondary max-w-2xl mx-auto">
              {t('myPlant.subtitle', language)}
            </p>
          </motion.div>

          {/* Main Dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Left Column - Plant Visual */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="glass rounded-3xl p-8 md:p-12 bg-white/90 dark:bg-chalkboard-surface shadow-xl h-full flex flex-col items-center justify-center relative overflow-hidden">
                {/* Decorative background */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-green-400/10 to-emerald-500/10 dark:from-green-500/20 dark:to-emerald-500/20 rounded-full blur-3xl -mr-32 -mt-32" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-emerald-400/10 to-green-500/10 dark:from-emerald-500/20 dark:to-green-500/20 rounded-full blur-2xl -ml-24 -mb-24" />

                <div className="relative z-10 text-center w-full">
                  {/* Plant Visual */}
                  <motion.div
                    className={`${getPlantSize()} mb-6 md:mb-8 inline-block`}
                    animate={{
                      scale: plantHealth === 'thriving' ? [1, 1.05, 1] : [1, 1.02, 1],
                      y: plantHealth === 'thriving' ? [0, -5, 0] : [0, -2, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    style={{
                      filter: plantHealth === 'wilting' ? 'grayscale(0.5) brightness(0.7)' : 
                              plantHealth === 'weak' ? 'grayscale(0.2) brightness(0.85)' :
                              plantHealth === 'healthy' ? 'brightness(1)' : 'brightness(1.1)',
                    }}
                  >
                    {getPlantEmoji()}
                  </motion.div>

                  {/* Health Status */}
                  <motion.div
                    className="mb-4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <div className={`inline-block px-6 py-3 rounded-full font-bold text-lg md:text-xl ${
                      plantHealth === 'thriving' ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white dark:from-chalk-emerald dark:to-chalk-emerald' :
                      plantHealth === 'healthy' ? 'bg-gradient-to-r from-emerald-400 to-green-400 text-white dark:from-emerald-500 dark:to-green-500' :
                      plantHealth === 'weak' ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white' :
                      'bg-gradient-to-r from-red-400 to-orange-400 text-white'
                    }`}>
                      {t(`myPlant.${plantHealth}`, language)}
                    </div>
                  </motion.div>

                  {/* Motivational Message */}
                  <motion.p
                    className="text-xl md:text-2xl font-semibold text-gray-700 dark:text-chalk-white mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    {motivationalMessage}
                  </motion.p>

                  {/* Care Streak */}
                  {careStreak > 0 && (
                    <motion.div
                      className="inline-block px-6 py-3 bg-gradient-to-r from-orange-400 to-yellow-400 dark:from-orange-500 dark:to-yellow-500 text-white rounded-full font-bold text-lg md:text-xl shadow-lg"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      🔥 {careStreak} {t('myPlant.careStreak', language)}
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Right Column - Daily Checklist */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="glass rounded-3xl p-6 md:p-8 bg-white/90 dark:bg-chalkboard-surface shadow-xl h-full">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-chalk-white mb-6 text-center">
                  {t('myPlant.dailyCare', language)}
                </h2>

                <div className="space-y-4">
                  {tasks.map((task, index) => (
                    <motion.div
                      key={task.key}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    >
                      <motion.button
                        onClick={() => toggleTask(task.key)}
                        disabled={checklist[task.key]}
                        className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                          checklist[task.key]
                            ? 'bg-gradient-to-r from-green-500/30 to-emerald-500/30 dark:from-green-500/40 dark:to-emerald-500/40 border-green-500 dark:border-chalk-emerald shadow-md cursor-default'
                            : 'bg-gray-100 dark:bg-chalkboard-bg/50 border-gray-300 dark:border-chalk-border/30 hover:border-green-400 dark:hover:border-chalk-emerald/50 cursor-pointer'
                        }`}
                        whileHover={!checklist[task.key] ? { scale: 1.02 } : {}}
                        whileTap={!checklist[task.key] ? { scale: 0.98 } : {}}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`text-3xl md:text-4xl ${
                            checklist[task.key] ? 'opacity-100' : 'opacity-50'
                          }`}>
                            {task.icon}
                          </div>
                          <div className="flex-1">
                            <div className={`font-semibold text-base md:text-lg ${
                              checklist[task.key]
                                ? 'text-gray-800 dark:text-chalk-white'
                                : 'text-gray-600 dark:text-chalk-secondary'
                            }`}>
                              {t(task.labelKey, language)}
                            </div>
                          </div>
                          {checklist[task.key] && (
                            <motion.div
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              className="text-2xl text-green-600 dark:text-chalk-emerald"
                            >
                              ✓
                            </motion.div>
                          )}
                        </div>
                      </motion.button>
                    </motion.div>
                  ))}
                </div>

                {/* Progress Indicator */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-chalk-border/30">
                  <div className="text-center">
                    <div className="text-sm text-gray-600 dark:text-chalk-secondary mb-2">
                      {t('myPlant.todayProgress', language)}
                    </div>
                    <div className="text-3xl font-bold text-green-600 dark:text-chalk-emerald">
                      {Object.values(checklist).filter(Boolean).length} / 4
                    </div>
                    <div className="mt-3 h-3 bg-gray-200 dark:bg-chalk-border/30 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 dark:from-chalk-emerald dark:via-emerald-400 dark:to-chalk-emerald"
                        initial={{ width: 0 }}
                        animate={{ width: `${(Object.values(checklist).filter(Boolean).length / 4) * 100}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <Footer />
      </div>
    </ProtectedRoute>
  )
}

