"use client"

import { useState, useEffect } from 'react'
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  Area,
  AreaChart,
  BarChart,
  Bar
} from 'recharts'

interface ChartData {
  time: string
  goldPrice: number
  silverPrice: number
  goldVolume: number
  silverVolume: number
}

export function PreciousMetalsChart() {
  const [chartData, setChartData] = useState<ChartData[]>([])
  const [timeframe, setTimeframe] = useState('1D')
  const [loading, setLoading] = useState(true)
  const [selectedMetal, setSelectedMetal] = useState<'both' | 'gold' | 'silver'>('both')
  const [chartType, setChartType] = useState<'line' | 'area' | 'bar'>('line')

  useEffect(() => {
    generateChartData()
    const interval = setInterval(() => {
      updateLatestData()
    }, 30000)
    return () => clearInterval(interval)
  }, [timeframe])

  const generateChartData = () => {
    setLoading(true)
    const data: ChartData[] = []
    const now = new Date()
    let goldPrice = 185000
    let silverPrice = 2200
    
    const intervals = {
      '1D': { count: 24, interval: 1 },
      '1W': { count: 7, interval: 24 },
      '1M': { count: 30, interval: 24 },
      '1Y': { count: 12, interval: 24 * 30 }
    }
    
    const { count, interval } = intervals[timeframe as keyof typeof intervals]
    
    for (let i = count - 1; i >= 0; i--) {
      const time = new Date(now.getTime() - i * interval * 60 * 60 * 1000)
      
      const goldVolatility = 0.02
      const goldTrend = Math.sin(i / count * Math.PI) * 0.01
      const goldRandom = (Math.random() - 0.5) * goldVolatility
      const goldPriceChange = goldPrice * (goldTrend + goldRandom)
      goldPrice = Math.max(0, goldPrice + goldPriceChange)
      
      const silverVolatility = 0.025
      const silverTrend = Math.sin(i / count * Math.PI + 0.5) * 0.015
      const silverRandom = (Math.random() - 0.5) * silverVolatility
      const silverPriceChange = silverPrice * (silverTrend + silverRandom)
      silverPrice = Math.max(0, silverPrice + silverPriceChange)
      
      data.push({
        time: formatTime(time, timeframe),
        goldPrice: Math.round(goldPrice),
        silverPrice: Math.round(silverPrice),
        goldVolume: Math.floor(Math.random() * 500) + 50, // Gold volume in grams
        silverVolume: Math.floor(Math.random() * 2000) + 200 // Silver volume in grams
      })
    }
    
    setChartData(data)
    setLoading(false)
  }

  const updateLatestData = () => {
    if (chartData.length === 0) return
    const lastData = chartData[chartData.length - 1]
    const newData = { ...lastData }
    const goldChange = (Math.random() - 0.5) * 1000
    const silverChange = (Math.random() - 0.5) * 50
    newData.goldPrice = Math.max(0, newData.goldPrice + goldChange)
    newData.silverPrice = Math.max(0, newData.silverPrice + silverChange)
    newData.goldVolume = Math.floor(Math.random() * 500) + 50 // Gold volume in grams
    newData.silverVolume = Math.floor(Math.random() * 2000) + 200 // Silver volume in grams
    setChartData(prev => [...prev.slice(1), newData])
  }

  const formatTime = (date: Date, tf: string) => {
    if (tf === '1D') {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    } else if (tf === '1W') {
      return date.toLocaleDateString('en-US', { weekday: 'short' })
    } else if (tf === '1M') {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    } else {
      return date.toLocaleDateString('en-US', { month: 'short' })
    }
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg">
          <p className="text-white font-semibold">{label}</p>
          <div className="space-y-2 text-sm">
            <div className="border-l-4 border-yellow-400 pl-2">
              <p className="text-yellow-400 font-medium">Gold</p>
              <p className="text-yellow-400">Price: ₹{payload[0]?.payload?.goldPrice?.toLocaleString()}</p>
              <p className="text-gray-400">Volume: {payload[0]?.payload?.goldVolume?.toLocaleString()}g</p>
            </div>
            <div className="border-l-4 border-gray-400 pl-2">
              <p className="text-gray-400 font-medium">Silver</p>
              <p className="text-gray-400">Price: ₹{payload[0]?.payload?.silverPrice?.toLocaleString()}</p>
              <p className="text-gray-400">Volume: {payload[0]?.payload?.silverVolume?.toLocaleString()}g</p>
            </div>
          </div>
        </div>
      )
    }
    return null
  }

  if (loading) {
    return (
      <div className="h-80 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
      </div>
    )
  }

  const currentGoldPrice = chartData[chartData.length - 1]?.goldPrice || 0
  const currentSilverPrice = chartData[chartData.length - 1]?.silverPrice || 0
  const goldChange = currentGoldPrice - (chartData[0]?.goldPrice || 0)
  const silverChange = currentSilverPrice - (chartData[0]?.silverPrice || 0)

  const renderChart = () => {
    if (chartType === 'line') {
      return (
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="time" stroke="#9CA3AF" fontSize={12} />
          <YAxis stroke="#9CA3AF" fontSize={12} tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          {(selectedMetal === 'both' || selectedMetal === 'gold') && (
            <Line
              type="monotone"
              dataKey="goldPrice"
              stroke="#fbbf24"
              strokeWidth={3}
              dot={{ fill: '#fbbf24', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#fbbf24', strokeWidth: 2 }}
              name="Gold"
            />
          )}
          {(selectedMetal === 'both' || selectedMetal === 'silver') && (
            <Line
              type="monotone"
              dataKey="silverPrice"
              stroke="#9ca3af"
              strokeWidth={3}
              dot={{ fill: '#9ca3af', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#9ca3af', strokeWidth: 2 }}
              name="Silver"
            />
          )}
        </LineChart>
      )
    } else if (chartType === 'area') {
      return (
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#fbbf24" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="silverGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#9ca3af" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#9ca3af" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="time" stroke="#9CA3AF" fontSize={12} />
          <YAxis stroke="#9CA3AF" fontSize={12} tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          {(selectedMetal === 'both' || selectedMetal === 'gold') && (
            <Area
              type="monotone"
              dataKey="goldPrice"
              stroke="#fbbf24"
              fill="url(#goldGradient)"
              strokeWidth={3}
              name="Gold"
            />
          )}
          {(selectedMetal === 'both' || selectedMetal === 'silver') && (
            <Area
              type="monotone"
              dataKey="silverPrice"
              stroke="#9ca3af"
              fill="url(#silverGradient)"
              strokeWidth={3}
              name="Silver"
            />
          )}
        </AreaChart>
      )
    } else {
      return (
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="time" stroke="#9CA3AF" fontSize={12} />
          <YAxis stroke="#9CA3AF" fontSize={12} tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          {(selectedMetal === 'both' || selectedMetal === 'gold') && (
            <Bar dataKey="goldPrice" fill="#fbbf24" name="Gold" />
          )}
          {(selectedMetal === 'both' || selectedMetal === 'silver') && (
            <Bar dataKey="silverPrice" fill="#9ca3af" name="Silver" />
          )}
        </BarChart>
      )
    }
  }

  return (
    <div className="space-y-4">
      {/* Chart Controls */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          {['1D', '1W', '1M', '1Y'].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                timeframe === tf
                  ? 'bg-yellow-400 text-gray-900'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
        
        <div className="flex gap-4">
          <div className="text-right">
            <p className="text-sm text-gray-400">Gold Price</p>
            <p className="text-xl font-bold text-yellow-400">
              ₹{currentGoldPrice.toLocaleString()}
            </p>
            <p className={`text-xs ${goldChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {goldChange >= 0 ? '+' : ''}{goldChange.toLocaleString()}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Silver Price</p>
            <p className="text-xl font-bold text-gray-400">
              ₹{currentSilverPrice.toLocaleString()}
            </p>
            <p className={`text-xs ${silverChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {silverChange >= 0 ? '+' : ''}{silverChange.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Chart Type and Metal Selector */}
      <div className="flex gap-2">
        {/* Chart Type Selector */}
        <div className="flex gap-2">
          {[
            { key: 'line', label: 'Line Chart', icon: '📈' },
            { key: 'area', label: 'Area Chart', icon: '📊' },
            { key: 'bar', label: 'Bar Chart', icon: '📊' }
          ].map((type) => (
            <button
              key={type.key}
              onClick={() => setChartType(type.key as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                chartType === type.key
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <span className="mr-1">{type.icon}</span>
              {type.label}
            </button>
          ))}
        </div>

        {/* Metal Selector */}
        <div className="flex gap-2">
          {[
            { key: 'both', label: 'Both Metals', color: 'bg-gradient-to-r from-yellow-400 to-gray-400' },
            { key: 'gold', label: 'Gold Only', color: 'bg-yellow-400' },
            { key: 'silver', label: 'Silver Only', color: 'bg-gray-400' }
          ].map((metal) => (
            <button
              key={metal.key}
              onClick={() => setSelectedMetal(metal.key as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedMetal === metal.key
                  ? `${metal.color} text-gray-900`
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {metal.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>

      {/* Volume Chart */}
      <div className="h-32">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="time" stroke="#9CA3AF" fontSize={10} />
            <YAxis stroke="#9CA3AF" fontSize={10} tickFormatter={(value) => `${value}g`} />
            <Tooltip />
            {(selectedMetal === 'both' || selectedMetal === 'gold') && (
              <Bar dataKey="goldVolume" fill="#fbbf24" opacity={0.6} name="Gold Volume (g)" />
            )}
            {(selectedMetal === 'both' || selectedMetal === 'silver') && (
              <Bar dataKey="silverVolume" fill="#9ca3af" opacity={0.6} name="Silver Volume (g)" />
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Price Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-700/50 rounded-lg p-3 text-center">
          <p className="text-gray-400 text-sm">Gold Open</p>
          <p className="text-yellow-400 font-semibold">₹{chartData[0]?.goldPrice.toLocaleString()}</p>
        </div>
        <div className="bg-gray-700/50 rounded-lg p-3 text-center">
          <p className="text-gray-400 text-sm">Gold High</p>
          <p className="text-green-400 font-semibold">₹{Math.max(...chartData.map(d => d.goldPrice)).toLocaleString()}</p>
        </div>
        <div className="bg-gray-700/50 rounded-lg p-3 text-center">
          <p className="text-gray-400 text-sm">Silver Open</p>
          <p className="text-gray-400 font-semibold">₹{chartData[0]?.silverPrice.toLocaleString()}</p>
        </div>
        <div className="bg-gray-700/50 rounded-lg p-3 text-center">
          <p className="text-gray-400 text-sm">Silver High</p>
          <p className="text-green-400 font-semibold">₹{Math.max(...chartData.map(d => d.silverPrice)).toLocaleString()}</p>
        </div>
      </div>

      {/* Real-time indicator */}
      <div className="flex items-center justify-center gap-2 text-green-400 text-sm">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span>Live Data • Updates every 30 seconds</span>
      </div>
    </div>
  )
}
