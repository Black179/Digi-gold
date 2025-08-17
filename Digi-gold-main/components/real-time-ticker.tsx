"use client"

import { useState, useEffect } from 'react'
import { subscribeToGoldPriceUpdates } from '@/lib/gold-api'

interface GoldPrice {
  goldType: string
  price: number
  change: number
  changePercent: number
  volume: number
  timestamp: Date
  currency: string
}

export function RealTimeTicker() {
  const [prices, setPrices] = useState<GoldPrice[]>([])
  const [isLive, setIsLive] = useState(true)

  useEffect(() => {
    // Initial fetch
    fetchPrices()

    // Subscribe to real-time updates
    const unsubscribe = subscribeToGoldPriceUpdates((newPrices) => {
      setPrices(newPrices)
    }, 5000) // Update every 5 seconds

    return () => unsubscribe()
  }, [])

  const fetchPrices = async () => {
    try {
      const response = await fetch('/api/markets')
      if (response.ok) {
        const data = await response.json()
        setPrices(data)
      }
    } catch (error) {
      console.error('Error fetching prices:', error)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(price)
  }

  const formatChange = (change: number) => {
    const sign = change >= 0 ? '+' : ''
    return `${sign}${change.toFixed(2)}`
  }

  const formatChangePercent = (changePercent: number) => {
    const sign = changePercent >= 0 ? '+' : ''
    return `${sign}${changePercent.toFixed(2)}%`
  }

  return (
    <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-bold text-lg">Live Gold Prices</h3>
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-green-400' : 'bg-red-400'}`}></div>
          <span className={`text-sm ${isLive ? 'text-green-400' : 'text-red-400'}`}>
            {isLive ? 'LIVE' : 'OFFLINE'}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {prices.map((price) => (
          <div key={price.goldType} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div>
                <p className="text-white font-medium">{price.goldType}</p>
                <p className="text-gray-400 text-sm">Volume: {price.volume.toLocaleString()}g</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white font-bold text-lg">{formatPrice(price.price)}</p>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-medium ${
                  price.change >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {formatChange(price.change)}
                </span>
                <span className={`text-xs ${
                  price.changePercent >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {formatChangePercent(price.changePercent)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <p className="text-gray-400 text-xs">
          Last updated: {prices[0]?.timestamp ? new Date(prices[0].timestamp).toLocaleTimeString() : 'N/A'}
        </p>
        <p className="text-gray-400 text-xs">
          Updates every 5 seconds • Data from live sources
        </p>
      </div>
    </div>
  )
}
