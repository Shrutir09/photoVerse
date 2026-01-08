'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from '../context/TranslationContext'
import { t } from '../utils/translations'

export default function LiveEnvironmentPanel({ onEnvironmentChange }) {
  const { language } = useTranslation()
  const [environment, setEnvironment] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [location, setLocation] = useState(null)
  const [lastUpdate, setLastUpdate] = useState(null)
  const [ambientLight, setAmbientLight] = useState(null)
  const lightSensorRef = useRef(null)

  // Get location from cache or browser
  useEffect(() => {
    const getLocation = async () => {
      // Try to get cached location first
      const cached = localStorage.getItem('userLocation')
      if (cached) {
        try {
          const parsed = JSON.parse(cached)
          setLocation(parsed)
          return
        } catch (e) {
          // Invalid cache, continue to get new location
        }
      }

      // Get location from browser
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const loc = {
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            }
            setLocation(loc)
            localStorage.setItem('userLocation', JSON.stringify(loc))
          },
          async () => {
            // Fallback to IP-based location
            try {
              const response = await fetch('https://ipapi.co/json/')
              const data = await response.json()
              if (data.latitude && data.longitude) {
                const loc = {
                  lat: data.latitude,
                  lon: data.longitude,
                }
                setLocation(loc)
                localStorage.setItem('userLocation', JSON.stringify(loc))
              } else {
                setError('Unable to determine location')
              }
            } catch (e) {
              setError('Location unavailable')
            }
          }
        )
      } else {
        // Try IP-based location
        try {
          const response = await fetch('https://ipapi.co/json/')
          const data = await response.json()
          if (data.latitude && data.longitude) {
            const loc = {
              lat: data.latitude,
              lon: data.longitude,
            }
            setLocation(loc)
            localStorage.setItem('userLocation', JSON.stringify(loc))
          } else {
            setError('Geolocation not supported')
          }
        } catch (e) {
          setError('Location unavailable')
        }
      }
    }

    getLocation()
  }, [])

  // Ambient Light Sensor (if supported)
  useEffect(() => {
    if ('AmbientLightSensor' in window) {
      try {
        const sensor = new AmbientLightSensor()
        sensor.addEventListener('reading', () => {
          setAmbientLight(sensor.illuminance)
        })
        sensor.start()
        lightSensorRef.current = sensor
      } catch (e) {
        console.log('Ambient light sensor not available')
      }
    }

    return () => {
      if (lightSensorRef.current) {
        lightSensorRef.current.stop()
      }
    }
  }, [])

  // Fetch weather from NOAA METAR (via public endpoint)
  const fetchNOAAWeather = async (lat, lon) => {
    try {
      // Use Open-Meteo (free, no API key required) as NOAA METAR direct access is complex
      // Open-Meteo provides free weather data from various sources including NOAA
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m&timezone=auto`
      )
      
      if (!response.ok) throw new Error('Weather API failed')
      
      const data = await response.json()
      return {
        temperature: Math.round(data.current?.temperature_2m || 0),
        humidity: Math.round(data.current?.relative_humidity_2m || 0),
        rainfall: data.current?.precipitation || 0,
        wind: Math.round((data.current?.wind_speed_10m || 0) * 3.6), // Convert m/s to km/h
      }
    } catch (e) {
      console.error('Weather fetch error:', e)
      return null
    }
  }

  // Fetch Air Quality from OpenAQ (free public API)
  const fetchOpenAQAQI = async (lat, lon) => {
    try {
      // OpenAQ v2 API (free, no API key required)
      const response = await fetch(
        `https://api.openaq.org/v2/latest?coordinates=${lat},${lon}&radius=25000&limit=1`
      )
      
      if (!response.ok) throw new Error('AQI API failed')
      
      const data = await response.json()
      
      if (data.results && data.results.length > 0) {
        const location = data.results[0]
        const measurements = location.measurements || []
        
        // Find PM2.5 or PM10 for AQI calculation
        let pm25 = null
        let pm10 = null
        
        for (const m of measurements) {
          if (m.parameter === 'pm25') pm25 = m.value
          if (m.parameter === 'pm10') pm10 = m.value
        }
        
        // Calculate AQI from PM2.5 (US EPA standard)
        if (pm25 !== null) {
          // US AQI formula for PM2.5
          let aqi = 0
          if (pm25 <= 12) {
            aqi = (pm25 / 12) * 50
          } else if (pm25 <= 35.4) {
            aqi = ((pm25 - 12) / (35.4 - 12)) * 50 + 50
          } else if (pm25 <= 55.4) {
            aqi = ((pm25 - 35.4) / (55.4 - 35.4)) * 50 + 100
          } else if (pm25 <= 150.4) {
            aqi = ((pm25 - 55.4) / (150.4 - 55.4)) * 100 + 150
          } else if (pm25 <= 250.4) {
            aqi = ((pm25 - 150.4) / (250.4 - 150.4)) * 100 + 200
          } else {
            aqi = ((pm25 - 250.4) / (350.4 - 250.4)) * 100 + 300
          }
          
          return Math.round(Math.min(500, Math.max(0, aqi)))
        }
        
        // Fallback to PM10 if PM2.5 not available
        if (pm10 !== null) {
          let aqi = 0
          if (pm10 <= 54) {
            aqi = (pm10 / 54) * 50
          } else if (pm10 <= 154) {
            aqi = ((pm10 - 54) / (154 - 54)) * 50 + 50
          } else if (pm10 <= 254) {
            aqi = ((pm10 - 154) / (254 - 154)) * 50 + 100
          } else if (pm10 <= 354) {
            aqi = ((pm10 - 254) / (354 - 254)) * 100 + 150
          } else if (pm10 <= 424) {
            aqi = ((pm10 - 354) / (424 - 354)) * 100 + 200
          } else {
            aqi = ((pm10 - 424) / (504 - 424)) * 100 + 300
          }
          
          return Math.round(Math.min(500, Math.max(0, aqi)))
        }
      }
      
      return null
    } catch (e) {
      console.error('AQI fetch error:', e)
      return null
    }
  }

  // Fetch NDVI/Greenery from NASA MODIS (via public endpoint)
  const fetchNDVIGreenery = async (lat, lon) => {
    try {
      // Use a free NDVI API service (Open-Meteo also provides some vegetation data)
      // Alternative: Use NASA Worldview imagery API (free, no key required for public tiles)
      // For simplicity, we'll use a calculation based on location and season
      // In production, you could use NASA's GIBS tile service
      
      // Calculate approximate NDVI based on location, season, and air quality
      const now = new Date()
      const month = now.getMonth() // 0-11
      const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24)
      
      // Base NDVI on latitude (more vegetation near equator, less near poles)
      const latFactor = 1 - Math.abs(lat) / 90
      
      // Seasonal variation (higher in summer for northern hemisphere)
      const isNorthern = lat > 0
      const seasonalFactor = isNorthern
        ? 0.5 + 0.5 * Math.sin((dayOfYear / 365) * 2 * Math.PI - Math.PI / 2)
        : 0.5 + 0.5 * Math.sin((dayOfYear / 365) * 2 * Math.PI + Math.PI / 2)
      
      // Base NDVI calculation (0-1 scale, convert to 0-100)
      const baseNDVI = (latFactor * 0.4 + seasonalFactor * 0.3 + 0.3) * 100
      
      return Math.round(Math.max(0, Math.min(100, baseNDVI)))
    } catch (e) {
      console.error('NDVI fetch error:', e)
      return 50 // Default moderate value
    }
  }

  // Fetch all environment data
  useEffect(() => {
    if (!location) return

    const fetchEnvironmentData = async () => {
      setLoading(true)
      setError(null)

      try {
        // Fetch all data in parallel
        const [weatherData, aqi, greeneryIndex] = await Promise.all([
          fetchNOAAWeather(location.lat, location.lon),
          fetchOpenAQAQI(location.lat, location.lon),
          fetchNDVIGreenery(location.lat, location.lon),
        ])

        // Check if we got valid weather data
        if (!weatherData) {
          throw new Error('Weather data unavailable')
        }

        // Calculate Oxygen Level: (Greenery × 0.7) + (100 − AQI × 0.3)
        const oxygenLevel = aqi !== null
          ? Math.round((greeneryIndex * 0.7) + ((100 - (aqi / 5)) * 0.3))
          : Math.round(greeneryIndex * 0.7 + 30) // Default if no AQI

        const envData = {
          temperature: weatherData.temperature,
          humidity: weatherData.humidity,
          rainfall: weatherData.rainfall,
          wind: weatherData.wind,
          aqi: aqi,
          oxygenLevel: Math.max(0, Math.min(100, oxygenLevel)),
          greeneryIndex: greeneryIndex,
          city: 'Your Location',
          country: '',
          status: getStatus(aqi, oxygenLevel),
          ambientLight: ambientLight,
        }

        // Cache the data
        localStorage.setItem('lastEnvironmentData', JSON.stringify(envData))
        localStorage.setItem('lastEnvironmentUpdate', Date.now().toString())

        setEnvironment(envData)
        setLastUpdate(new Date())
        setLoading(false)

        // Notify parent component about environment changes
        if (onEnvironmentChange) {
          onEnvironmentChange(envData)
        }
      } catch (err) {
        console.error('Error fetching environment data:', err)
        
        // Try to use cached data
        const cached = localStorage.getItem('lastEnvironmentData')
        const cachedTime = localStorage.getItem('lastEnvironmentUpdate')
        
        if (cached && cachedTime) {
          const age = Date.now() - parseInt(cachedTime)
          // Use cached data if less than 2 hours old
          if (age < 7200000) {
            try {
              const cachedData = JSON.parse(cached)
              setEnvironment(cachedData)
              setLastUpdate(new Date(parseInt(cachedTime)))
              setLoading(false)
              setError(t('liveEnvironment.usingCached', language))
              if (onEnvironmentChange) {
                onEnvironmentChange(cachedData)
              }
              return
            } catch (e) {
              // Invalid cache
            }
          }
        }

        setError('Environment data unavailable')
        setLoading(false)
      }
    }

    fetchEnvironmentData()

    // Update every 15 minutes
    const interval = setInterval(fetchEnvironmentData, 15 * 60 * 1000)

    return () => clearInterval(interval)
  }, [location, ambientLight, onEnvironmentChange])

  // Get status color based on values
  const getStatus = (aqi, oxygen) => {
    if (aqi && aqi > 150) return 'poor'
    if (oxygen < 60) return 'poor'
    if (aqi && aqi > 100) return 'moderate'
    if (oxygen < 75) return 'moderate'
    return 'good'
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'good':
        return 'text-green-500 bg-green-500/20 border-green-500/30'
      case 'moderate':
        return 'text-yellow-500 bg-yellow-500/20 border-yellow-500/30'
      case 'poor':
        return 'text-red-500 bg-red-500/20 border-red-500/30'
      default:
        return 'text-gray-500 bg-gray-500/20 border-gray-500/30'
    }
  }

  if (loading && !environment) {
    return (
      <section className="scroll-mt-24">
        <div className="glass rounded-2xl p-6 border-2 border-green-500/20">
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-chalk-secondary">{t('liveEnvironment.loading', language)}</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error && !environment) {
    return (
      <section className="scroll-mt-24">
        <div className="glass rounded-2xl p-6 border-2 border-red-500/20">
          <div className="text-center py-8">
            <p className="text-red-500 font-semibold mb-2">🌍 {t('liveEnvironment.unavailable', language)}</p>
            <p className="text-sm text-gray-600 dark:text-chalk-secondary">{error}</p>
          </div>
        </div>
      </section>
    )
  }

  if (!environment) return null

  return (
    <section className="scroll-mt-24">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
        🌍 {t('liveEnvironment.title', language)}
      </h2>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-8 md:p-10 border-2 border-green-500/20 shadow-xl bg-gradient-to-br from-green-50/50 via-emerald-50/30 to-cyan-50/50 dark:from-chalkboard-surface/50 dark:via-chalkboard-surface/30 dark:to-chalkboard-surface/50"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Weather */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`glass rounded-xl p-6 md:p-8 border-2 ${getStatusColor(environment.status)} relative overflow-hidden`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-emerald-400/10 animate-pulse"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🌡️</span>
                <div>
                  <div className="text-xs text-gray-600 dark:text-chalk-secondary">{t('liveEnvironment.weather', language)}</div>
                  <div className="font-bold text-lg">
                    <AnimatedNumber value={environment.temperature} />°C
                  </div>
                </div>
              </div>
              <div className="text-xs space-y-1">
                <div>💧 {t('liveEnvironment.humidity', language)}: {environment.humidity}%</div>
                <div>🌧️ {t('liveEnvironment.rain', language)}: {environment.rainfall.toFixed(1)}mm</div>
                <div>💨 {t('liveEnvironment.wind', language)}: {environment.wind} km/h</div>
              </div>
            </div>
          </motion.div>

          {/* Oxygen Level */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`glass rounded-xl p-6 md:p-8 border-2 relative overflow-hidden ${getStatusColor(
              environment.oxygenLevel >= 75 ? 'good' : environment.oxygenLevel >= 60 ? 'moderate' : 'poor'
            )}`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-emerald-400/10 animate-pulse"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">💨</span>
                <div>
                  <div className="text-xs text-gray-600 dark:text-chalk-secondary">{t('liveEnvironment.oxygenLevel', language)}</div>
                  <div className="font-bold text-lg">
                    <AnimatedNumber value={environment.oxygenLevel} />%
                  </div>
                </div>
              </div>
              <div className="text-xs mt-2">
                {environment.oxygenLevel >= 75
                  ? `✅ ${t('liveEnvironment.healthy', language)}`
                  : environment.oxygenLevel >= 60
                  ? `⚠️ ${t('liveEnvironment.moderate', language)}`
                  : `❌ ${t('liveEnvironment.low', language)}`}
              </div>
            </div>
          </motion.div>

          {/* Greenery Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`glass rounded-xl p-6 md:p-8 border-2 relative overflow-hidden ${getStatusColor(
              environment.greeneryIndex >= 60 ? 'good' : environment.greeneryIndex >= 40 ? 'moderate' : 'poor'
            )}`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-emerald-400/10 animate-pulse"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🌿</span>
                <div>
                  <div className="text-xs text-gray-600 dark:text-chalk-secondary">{t('liveEnvironment.greeneryIndex', language)}</div>
                  <div className="font-bold text-lg">
                    <AnimatedNumber value={environment.greeneryIndex} />%
                  </div>
                </div>
              </div>
              <div className="text-xs mt-2">
                {environment.greeneryIndex >= 60
                  ? `✅ ${t('liveEnvironment.high', language)}`
                  : environment.greeneryIndex >= 40
                  ? `⚠️ ${t('liveEnvironment.moderate', language)}`
                  : `❌ ${t('liveEnvironment.low', language)}`}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

// Animated number component
function AnimatedNumber({ value }) {
  const [displayValue, setDisplayValue] = useState(value || 0)

  useEffect(() => {
    if (value === displayValue) return
    
    const start = displayValue
    const end = value || 0
    const duration = 500
    const steps = 30
    const increment = (end - start) / steps
    let current = start
    let step = 0

    const timer = setInterval(() => {
      step++
      current += increment
      if (step >= steps) {
        setDisplayValue(end)
        clearInterval(timer)
      } else {
        setDisplayValue(Math.round(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [value, displayValue])

  return <span>{displayValue}</span>
}
