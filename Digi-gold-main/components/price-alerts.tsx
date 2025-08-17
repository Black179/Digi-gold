"use client"

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/auth-context'

interface PriceAlert {
  id: string
  goldType: string
  targetPrice: number
  condition: 'above' | 'below'
  isActive: boolean
  createdAt: Date
}

export function PriceAlerts() {
  const { user, token } = useAuth()
  const [alerts, setAlerts] = useState<PriceAlert[]>([])
  const [newAlert, setNewAlert] = useState({
    goldType: '24K Gold',
    targetPrice: '',
    condition: 'above' as const
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user && token) {
      fetchAlerts()
    }
  }, [user, token])

  const fetchAlerts = async () => {
    try {
      const response = await fetch('/api/alerts', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        setAlerts(data)
      }
    } catch (error) {
      console.error('Error fetching alerts:', error)
    }
  }

  const createAlert = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newAlert.targetPrice) return

    setLoading(true)
    try {
      const response = await fetch('/api/alerts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          goldType: newAlert.goldType,
          targetPrice: parseFloat(newAlert.targetPrice),
          condition: newAlert.condition
        })
      })

      if (response.ok) {
        setNewAlert({
          goldType: '24K Gold',
          targetPrice: '',
          condition: 'above'
        })
        fetchAlerts()
      }
    } catch (error) {
      console.error('Error creating alert:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleAlert = async (alertId: string) => {
    try {
      const response = await fetch(`/api/alerts/${alertId}/toggle`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        fetchAlerts()
      }
    } catch (error) {
      console.error('Error toggling alert:', error)
    }
  }

  const deleteAlert = async (alertId: string) => {
    try {
      const response = await fetch(`/api/alerts/${alertId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        fetchAlerts()
      }
    } catch (error) {
      console.error('Error deleting alert:', error)
    }
  }

  if (!user) {
    return (
      <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
        <p className="text-gray-400 text-center">Please login to set price alerts</p>
      </div>
    )
  }

  return (
    <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
      <h3 className="text-white font-bold text-lg mb-4">Price Alerts</h3>
      
      {/* Create New Alert */}
      <form onSubmit={createAlert} className="mb-6 p-4 bg-gray-700/50 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <select
            value={newAlert.goldType}
            onChange={(e) => setNewAlert({ ...newAlert, goldType: e.target.value })}
            className="px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white"
          >
            <option value="24K Gold">24K Gold</option>
            <option value="22K Gold">22K Gold</option>
            <option value="18K Gold">18K Gold</option>
            <option value="14K Gold">14K Gold</option>
          </select>
          
          <select
            value={newAlert.condition}
            onChange={(e) => setNewAlert({ ...newAlert, condition: e.target.value as 'above' | 'below' })}
            className="px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white"
          >
            <option value="above">Above</option>
            <option value="below">Below</option>
          </select>
          
          <input
            type="number"
            placeholder="Target Price"
            value={newAlert.targetPrice}
            onChange={(e) => setNewAlert({ ...newAlert, targetPrice: e.target.value })}
            className="px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400"
            step="0.01"
            min="0"
          />
          
          <button
            type="submit"
            disabled={loading || !newAlert.targetPrice}
            className="px-4 py-2 bg-yellow-400 text-gray-900 font-medium rounded-lg hover:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Set Alert'}
          </button>
        </div>
      </form>

      {/* Alerts List */}
      <div className="space-y-3">
        {alerts.length === 0 ? (
          <p className="text-gray-400 text-center py-4">No price alerts set</p>
        ) : (
          alerts.map((alert) => (
            <div key={alert.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${alert.isActive ? 'bg-green-400' : 'bg-gray-500'}`}></div>
                <div>
                  <p className="text-white font-medium">
                    {alert.goldType} {alert.condition} ${alert.targetPrice}
                  </p>
                  <p className="text-gray-400 text-xs">
                    Created: {new Date(alert.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleAlert(alert.id)}
                  className={`px-3 py-1 rounded text-xs font-medium ${
                    alert.isActive 
                      ? 'bg-yellow-400 text-gray-900' 
                      : 'bg-gray-600 text-white'
                  }`}
                >
                  {alert.isActive ? 'Active' : 'Inactive'}
                </button>
                
                <button
                  onClick={() => deleteAlert(alert.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded text-xs font-medium hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
