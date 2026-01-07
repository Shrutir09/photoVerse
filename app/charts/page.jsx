'use client'

import { useState, useEffect } from 'react'
import ProtectedRoute from '../components/ProtectedRoute'
import { calculateAll } from '../logic/photosynthesis'
import Charts from '../components/Charts'
import Sliders from '../components/Sliders'
import Footer from '../components/Footer'

export default function ChartsPage() {
  const [sunlight, setSunlight] = useState(50)
  const [co2, setCo2] = useState(50)
  const [temperature, setTemperature] = useState(25)
  const [dataHistory, setDataHistory] = useState([])

  useEffect(() => {
    const result = calculateAll(sunlight, co2, temperature)
    const newEntry = {
      time: new Date().toLocaleTimeString(),
      rate: result.photosynthesisRate,
      oxygen: result.oxygen,
    }
    setDataHistory((prev) => {
      const updated = [...prev, newEntry]
      return updated.slice(-20)
    })
    
    // Update PhotoBot context
    const event = new CustomEvent('photobot-context-update', {
      detail: {
        sunlight,
        co2,
        temperature,
        photosynthesisRate: result.photosynthesisRate,
        oxygen: result.oxygen,
        plantHealth: result.plantHealth || { status: 'unknown' },
      }
    })
    window.dispatchEvent(event)
  }, [sunlight, co2, temperature])

  return (
    <ProtectedRoute>
      <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-green-50 via-emerald-50 to-cyan-50 dark:bg-chalkboard-bg">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent mb-4">
            📊 Data Analytics
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Visualize photosynthesis data in real-time
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <Sliders
              sunlight={sunlight}
              co2={co2}
              temperature={temperature}
              onSunlightChange={setSunlight}
              onCo2Change={setCo2}
              onTemperatureChange={setTemperature}
            />
          </div>

          <div className="lg:col-span-3">
            {dataHistory.length > 0 && <Charts dataHistory={dataHistory} />}
          </div>
        </div>
      </div>
      <Footer />
    </div>
    </ProtectedRoute>
  )
}

