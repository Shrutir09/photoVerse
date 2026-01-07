'use client'

import { motion } from 'framer-motion'

export default function Sliders({ sunlight, co2, temperature, onSunlightChange, onCo2Change, onTemperatureChange }) {
  return (
    <div className="glass rounded-3xl p-6 md:p-8 border-2 border-emerald-500/20 shadow-xl space-y-6 md:space-y-8">
      {/* Sunlight Slider */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl md:text-4xl">🌞</span>
            <span className="font-bold text-lg md:text-xl text-gray-800 dark:text-chalk-white">Sunlight</span>
          </div>
          <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
            {sunlight}%
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={sunlight}
          onChange={(e) => onSunlightChange(Number(e.target.value))}
          className="w-full h-4 bg-gray-200 dark:bg-chalk-border/30 rounded-full appearance-none cursor-pointer accent-yellow-500"
          style={{
            background: `linear-gradient(to right, #fbbf24 0%, #fbbf24 ${sunlight}%, #e5e7eb ${sunlight}%, #e5e7eb 100%)`
          }}
        />
      </div>

      {/* CO₂ Slider */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl md:text-4xl">🌬</span>
            <span className="font-bold text-lg md:text-xl text-gray-800 dark:text-chalk-white">CO₂ Level</span>
          </div>
          <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
            {co2}%
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={co2}
          onChange={(e) => onCo2Change(Number(e.target.value))}
          className="w-full h-4 bg-gray-200 dark:bg-chalk-border/30 rounded-full appearance-none cursor-pointer accent-blue-500"
          style={{
            background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${co2}%, #e5e7eb ${co2}%, #e5e7eb 100%)`
          }}
        />
      </div>

      {/* Temperature Slider */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl md:text-4xl">🌡️</span>
            <span className="font-bold text-lg md:text-xl text-gray-800 dark:text-chalk-white">Temperature</span>
          </div>
          <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            {temperature}°C
          </span>
        </div>
        <input
          type="range"
          min="1"
          max="100"
          value={temperature}
          onChange={(e) => onTemperatureChange(Number(e.target.value))}
          className="w-full h-4 bg-gray-200 dark:bg-chalk-border/30 rounded-full appearance-none cursor-pointer accent-red-500"
          style={{
            background: `linear-gradient(to right, #ef4444 0%, #ef4444 ${temperature}%, #e5e7eb ${temperature}%, #e5e7eb 100%)`
          }}
        />
      </div>
    </div>
  )
}
