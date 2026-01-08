'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { useTranslation } from '../context/TranslationContext'
import { t } from '../utils/translations'

export default function Charts({ dataHistory, currentData, sunlight, co2, temperature }) {
  const { language } = useTranslation()
  const [isAnimating, setIsAnimating] = useState(true)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setIsAnimating(true)
    const timer = setTimeout(() => setIsAnimating(false), 1000)
    return () => clearTimeout(timer)
  }, [dataHistory.length])

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }
    checkDarkMode()
    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })
    return () => observer.disconnect()
  }, [])

  const currentOxygen = currentData?.oxygen || 0
  const currentRate = currentData?.rate || 0

  return (
    <div className="space-y-5 md:space-y-6">
      {/* Oxygen Production Chart */}
      <motion.div
        className="glass rounded-xl p-5 md:p-6 bg-white/90 dark:bg-chalkboard-surface shadow-sm hover:shadow-md transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header with value indicator */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-3">
          <div className="flex items-start gap-2.5 min-w-0 flex-1">
            <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-lg flex-shrink-0 mt-0.5">
              🌬
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-chalk-white leading-tight">
                {t('charts.oxygenProduction', language)}
              </h3>
              <p className="text-xs text-gray-500 dark:text-chalk-secondary mt-0.5 leading-relaxed">
                {t('charts.oxygenProduction', language)}
              </p>
            </div>
          </div>
          <div className="flex-shrink-0">
            <div className="px-3 py-1.5 bg-gray-50 dark:bg-chalkboard-bg/50 rounded-lg border border-gray-200 dark:border-chalk-border/30">
              <div className="text-[10px] text-gray-400 dark:text-chalk-secondary mb-0.5">{t('charts.current', language)}</div>
              <div className="text-lg font-semibold text-gray-700 dark:text-chalk-white">
                {currentOxygen.toFixed(1)}%
              </div>
            </div>
          </div>
        </div>

        <div className="w-full" style={{ height: '240px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart 
              data={dataHistory} 
              margin={{ top: 8, right: 12, left: 0, bottom: 8 }}
            >
              <defs>
                <linearGradient id="colorOxygen" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.15}/>
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="2 2" 
                stroke="currentColor" 
                opacity={0.08}
                className="text-gray-300 dark:text-chalk-border/40"
              />
              <XAxis 
                dataKey="time" 
                stroke="currentColor"
                className="text-gray-400 dark:text-chalk-secondary/60"
                style={{ fontSize: '10px' }}
                tick={{ fill: 'currentColor' }}
                tickLine={false}
              />
              <YAxis 
                stroke="currentColor"
                className="text-gray-400 dark:text-chalk-secondary/60"
                domain={[0, 100]} 
                style={{ fontSize: '10px' }}
                tick={{ fill: 'currentColor' }}
                tickLine={false}
                width={35}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.98)',
                  border: '1px solid #e5e7eb', 
                  borderRadius: '8px',
                  color: '#374151',
                  fontSize: '12px',
                  padding: '8px 12px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                }}
                labelStyle={{ color: '#6b7280', fontSize: '11px', marginBottom: '4px' }}
                wrapperStyle={{ zIndex: 1000 }}
              />
              <Area 
                type="monotone" 
                dataKey="oxygen" 
                stroke="#3b82f6" 
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorOxygen)"
                animationDuration={600}
                animationEasing="ease-out"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Photosynthesis Rate Chart */}
      <motion.div
        className="glass rounded-xl p-5 md:p-6 bg-white/90 dark:bg-chalkboard-surface shadow-sm hover:shadow-md transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {/* Header with value indicator */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-3">
          <div className="flex items-start gap-2.5 min-w-0 flex-1">
            <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-500/20 flex items-center justify-center text-lg flex-shrink-0 mt-0.5">
              🌱
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-chalk-white leading-tight">
                {t('charts.photosynthesisRate', language)}
              </h3>
              <p className="text-xs text-gray-500 dark:text-chalk-secondary mt-0.5 leading-relaxed">
                {language === 'hi' ? 'प्रकाश संश्लेषण प्रक्रिया की दक्षता' : 'Efficiency of the photosynthesis process'}
              </p>
            </div>
          </div>
          <div className="flex-shrink-0">
            <div className="px-3 py-1.5 bg-gray-50 dark:bg-chalkboard-bg/50 rounded-lg border border-gray-200 dark:border-chalk-border/30">
              <div className="text-[10px] text-gray-400 dark:text-chalk-secondary mb-0.5">{t('charts.current', language)}</div>
              <div className="text-lg font-semibold text-gray-700 dark:text-chalk-white">
                {currentRate.toFixed(1)}%
              </div>
            </div>
          </div>
        </div>

        <div className="w-full" style={{ height: '240px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={dataHistory} 
              margin={{ top: 8, right: 12, left: 0, bottom: 8 }}
            >
              <defs>
                <linearGradient id="colorRate" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity={0.12}/>
                  <stop offset="100%" stopColor="#22c55e" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="2 2" 
                stroke="currentColor" 
                opacity={0.08}
                className="text-gray-300 dark:text-chalk-border/40"
              />
              <XAxis 
                dataKey="time" 
                stroke="currentColor"
                className="text-gray-400 dark:text-chalk-secondary/60"
                style={{ fontSize: '10px' }}
                tick={{ fill: 'currentColor' }}
                tickLine={false}
              />
              <YAxis 
                stroke="currentColor"
                className="text-gray-400 dark:text-chalk-secondary/60"
                domain={[0, 100]} 
                style={{ fontSize: '10px' }}
                tick={{ fill: 'currentColor' }}
                tickLine={false}
                width={35}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: isDark ? 'rgba(22, 61, 51, 0.98)' : 'rgba(255, 255, 255, 0.98)',
                  border: isDark ? '1px solid rgba(47, 111, 90, 0.5)' : '1px solid #e5e7eb', 
                  borderRadius: '8px',
                  color: isDark ? '#E6F5EE' : '#374151',
                  fontSize: '12px',
                  padding: '8px 12px',
                  boxShadow: isDark ? '0 2px 8px rgba(0, 0, 0, 0.5)' : '0 2px 8px rgba(0, 0, 0, 0.1)'
                }}
                labelStyle={{ color: isDark ? '#B7D9CB' : '#6b7280', fontSize: '11px', marginBottom: '4px' }}
                wrapperStyle={{ zIndex: 1000 }}
              />
              <Area 
                type="monotone" 
                dataKey="rate" 
                stroke="#22c55e" 
                strokeWidth={2}
                fill="url(#colorRate)"
                fillOpacity={1}
                animationDuration={600}
                animationEasing="ease-out"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  )
}
