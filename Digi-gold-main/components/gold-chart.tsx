"use client"

import { useState, useEffect } from 'react'
import { 
  ResponsiveContainer, 
  ComposedChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  Area,
  Bar
} from 'recharts'

interface ChartData {
  time: string
  open: number
  high: number
  low: number
  close: number
  volume: number
}

export function GoldChart() {
  const [chartData, setChartData] = useState<ChartData[]>([])
  const [timeframe, setTimeframe] = useState('1D')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    generateChartData()
  }, [timeframe])

  const generateChartData = () => {
    setLoading(true)
    
    // Generate realistic gold price data based on timeframe
    const data: ChartData[] = []
    const now = new Date()
    let basePrice = 185000 // Base price in INR
    
    const intervals = {
      '1D': { count: 24, interval: 1 }, // 1 hour intervals
      '1W': { count: 7, interval: 24 }, // 1 day intervals
      '1M': { count: 30, interval: 24 }, // 1 day intervals
      '1Y': { count: 12, interval: 24 * 30 } // 1 month intervals
    }
    
    const { count, interval } = intervals[timeframe as keyof typeof intervals]
    
    for (let i = count - 1; i >= 0; i--) {
      const time = new Date(now.getTime() - i * interval * 60 * 60 * 1000)
      
      // Generate realistic price movements
      const volatility = 0.02 // 2% volatility
      const trend = Math.sin(i / count * Math.PI) * 0.01 // Slight trend
      const random = (Math.random() - 0.5) * volatility
      
      const priceChange = basePrice * (trend + random)
      const open = basePrice
      const close = basePrice + priceChange
      const high = Math.max(open, close) + Math.random() * basePrice * 0.01
      const low = Math.min(open, close) - Math.random() * basePrice * 0.01
      const volume = Math.floor(Math.random() * 1000) + 200
      
      data.push({
        time: formatTime(time, timeframe),
        open: Math.round(open),
        high: Math.round(high),
        low: Math.round(low),
        close: Math.round(close),
        volume
      })
      
      basePrice = close
    }
    
    setChartData(data)
    setLoading(false)
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
      const data = payload[0].payload
      return (
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg">
          <p className="text-white font-semibold">{label}</p>
          <div className="space-y-1 text-sm">
            <p className="text-green-400">Open: ₹{data.open.toLocaleString()}</p>
            <p className="text-blue-400">High: ₹{data.high.toLocaleString()}</p>
            <p className="text-red-400">Low: ₹{data.low.toLocaleString()}</p>
            <p className="text-yellow-400">Close: ₹{data.close.toLocaleString()}</p>
            <p className="text-gray-400">Volume: {data.volume.toLocaleString()}</p>
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
        
        <div className="text-right">
          <p className="text-sm text-gray-400">Current Price</p>
          <p className="text-2xl font-bold text-yellow-400">
            ₹{chartData[chartData.length - 1]?.close.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData}>
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#fbbf24" stopOpacity={0}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="time" 
              stroke="#9CA3AF"
              fontSize={12}
            />
            <YAxis 
              stroke="#9CA3AF"
              fontSize={12}
              tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            
            {/* Candlestick-like bars */}
            <Bar 
              dataKey="high" 
              fill="transparent" 
              stroke="#10B981" 
              strokeWidth={1}
              radius={[2, 2, 0, 0]}
            />
            <Bar 
              dataKey="low" 
              fill="transparent" 
              stroke="#EF4444" 
              strokeWidth={1}
              radius={[0, 0, 2, 2]}
            />
            
            {/* Price line */}
            <Line
              type="monotone"
              dataKey="close"
              stroke="#fbbf24"
              strokeWidth={3}
              dot={{ fill: '#fbbf24', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#fbbf24', strokeWidth: 2 }}
            />
            
            {/* Area fill */}
            <Area
              type="monotone"
              dataKey="close"
              fill="url(#areaGradient)"
              stroke="transparent"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Price Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-700/50 rounded-lg p-3 text-center">
          <p className="text-gray-400 text-sm">Open</p>
          <p className="text-white font-semibold">₹{chartData[0]?.open.toLocaleString()}</p>
        </div>
        <div className="bg-gray-700/50 rounded-lg p-3 text-center">
          <p className="text-gray-400 text-sm">High</p>
          <p className="text-green-400 font-semibold">₹{Math.max(...chartData.map(d => d.high)).toLocaleString()}</p>
        </div>
        <div className="bg-gray-700/50 rounded-lg p-3 text-center">
          <p className="text-gray-400 text-sm">Low</p>
          <p className="text-red-400 font-semibold">₹{Math.min(...chartData.map(d => d.low)).toLocaleString()}</p>
        </div>
        <div className="bg-gray-700/50 rounded-lg p-3 text-center">
          <p className="text-gray-400 text-sm">Change</p>
          <p className={`font-semibold ${
            (chartData[chartData.length - 1]?.close || 0) > (chartData[0]?.open || 0) 
              ? 'text-green-400' 
              : 'text-red-400'
          }`}>
            {((chartData[chartData.length - 1]?.close || 0) - (chartData[0]?.open || 0)).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  )
}
