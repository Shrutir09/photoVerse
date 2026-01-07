'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'

export default function Charts({ dataHistory }) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
        📈 Live Data Charts
      </h2>
      
      <div className="glass rounded-3xl p-6 md:p-8 border-2 border-green-500/20 shadow-xl">
        <h3 className="text-xl font-bold mb-6 text-green-700 dark:text-green-400 flex items-center gap-2">
          <span className="text-2xl">🌬</span>
          Oxygen Production Over Time
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={dataHistory} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorOxygen" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.9}/>
                <stop offset="50%" stopColor="#22c55e" stopOpacity={0.6}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#22c55e" opacity={0.2} />
            <XAxis 
              dataKey="time" 
              stroke="#16a34a" 
              style={{ fontSize: '12px', fontWeight: '600' }}
              tick={{ fill: '#16a34a' }}
            />
            <YAxis 
              stroke="#16a34a" 
              domain={[0, 100]} 
              style={{ fontSize: '12px', fontWeight: '600' }}
              tick={{ fill: '#16a34a' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(34, 197, 94, 0.95)', 
                border: '2px solid #22c55e', 
                borderRadius: '12px',
                color: '#fff',
                fontWeight: '600',
                boxShadow: '0 4px 20px rgba(34, 197, 94, 0.3)'
              }} 
            />
            <Area 
              type="monotone" 
              dataKey="oxygen" 
              stroke="#3b82f6" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorOxygen)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="glass rounded-3xl p-6 md:p-8 border-2 border-green-500/20 shadow-xl">
        <h3 className="text-xl font-bold mb-6 text-green-700 dark:text-green-400 flex items-center gap-2">
          <span className="text-2xl">🌱</span>
          Photosynthesis Rate Over Time
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={dataHistory} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRate" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22c55e" stopOpacity={1}/>
                <stop offset="100%" stopColor="#16a34a" stopOpacity={1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#22c55e" opacity={0.2} />
            <XAxis 
              dataKey="time" 
              stroke="#16a34a" 
              style={{ fontSize: '12px', fontWeight: '600' }}
              tick={{ fill: '#16a34a' }}
            />
            <YAxis 
              stroke="#16a34a" 
              domain={[0, 100]} 
              style={{ fontSize: '12px', fontWeight: '600' }}
              tick={{ fill: '#16a34a' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(34, 197, 94, 0.95)', 
                border: '2px solid #22c55e', 
                borderRadius: '12px',
                color: '#fff',
                fontWeight: '600',
                boxShadow: '0 4px 20px rgba(34, 197, 94, 0.3)'
              }} 
            />
            <Line 
              type="monotone" 
              dataKey="rate" 
              stroke="url(#colorRate)" 
              strokeWidth={4}
              dot={{ fill: '#22c55e', r: 5, strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 7, fill: '#16a34a' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
