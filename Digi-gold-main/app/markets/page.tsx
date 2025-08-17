import { Navigation } from "@/components/navigation"
import { RealTimeTicker } from "@/components/real-time-ticker"
import { PriceAlerts } from "@/components/price-alerts"

export default function MarketsPage() {
  const marketData = [
    {
      id: 1,
      type: "24K Gold",
      price: "$2,180.50",
      change: "+2.45%",
      changeType: "positive",
      volume: "1,245 oz",
      trend: "↗️"
    },
    {
      id: 2,
      type: "22K Gold",
      price: "$2,045.75",
      change: "+1.87%",
      changeType: "positive",
      volume: "892 oz",
      trend: "↗️"
    },
    {
      id: 3,
      type: "18K Gold",
      price: "$1,635.25",
      change: "-0.32%",
      changeType: "negative",
      volume: "567 oz",
      trend: "↘️"
    },
    {
      id: 4,
      type: "14K Gold",
      price: "$1,272.80",
      change: "+0.95%",
      changeType: "positive",
      volume: "423 oz",
      trend: "↗️"
    }
  ]

  const marketTrends = [
    { period: "1H", change: "+0.12%" },
    { period: "24H", change: "+2.45%" },
    { period: "7D", change: "+5.67%" },
    { period: "30D", change: "+12.34%" },
    { period: "1Y", change: "+28.91%" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center">
              <span className="text-gray-900 font-serif font-black text-lg">D</span>
            </div>
            <h1 className="font-serif font-black text-2xl text-white">Markets</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs text-gray-400">Market Status</p>
              <p className="text-green-400 text-sm font-medium">● LIVE</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 pb-20 space-y-6">
        {/* Real-Time Gold Prices */}
        <RealTimeTicker />

        {/* Market Overview */}
        <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
          <h3 className="text-white font-bold text-lg mb-4">Market Overview</h3>
          <div className="grid grid-cols-5 gap-2">
            {marketTrends.map((trend) => (
              <div key={trend.period} className="text-center">
                <p className="text-gray-400 text-xs">{trend.period}</p>
                <p className="text-green-400 font-medium">{trend.change}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Gold Types */}
        <div className="space-y-3">
          {marketData.map((item) => (
            <div key={item.id} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg gold-gradient flex items-center justify-center">
                    <span className="text-gray-900 font-bold text-lg">G</span>
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg">{item.type}</p>
                    <p className="text-gray-400 text-sm">Volume: {item.volume}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold text-xl">{item.price}</p>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${
                      item.changeType === 'positive' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {item.change}
                    </span>
                    <span className="text-2xl">{item.trend}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Market News */}
        <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
          <h3 className="text-white font-bold text-lg mb-4">Market News</h3>
          <div className="space-y-3">
            <div className="p-3 bg-gray-700/50 rounded-lg">
              <p className="text-white font-medium text-sm">Gold prices reach new highs amid economic uncertainty</p>
              <p className="text-gray-400 text-xs mt-1">2 hours ago • Reuters</p>
            </div>
            <div className="p-3 bg-gray-700/50 rounded-lg">
              <p className="text-white font-medium text-sm">Central banks continue gold accumulation trend</p>
              <p className="text-gray-400 text-xs mt-1">5 hours ago • Bloomberg</p>
            </div>
            <div className="p-3 bg-gray-700/50 rounded-lg">
              <p className="text-white font-medium text-sm">Gold demand surges in Asian markets</p>
              <p className="text-gray-400 text-xs mt-1">1 day ago • CNBC</p>
            </div>
          </div>
        </div>

        {/* Price Alerts */}
        <PriceAlerts />

        {/* Trading Volume */}
        <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
          <h3 className="text-white font-bold text-lg mb-4">Trading Volume</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">24K Gold</span>
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-400 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <span className="text-white text-sm">85%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">22K Gold</span>
              <div className="flex items-center gap-2">
                <div className="w-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-400 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <span className="text-white text-sm">65%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">18K Gold</span>
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-400 rounded-full" style={{ width: '45%' }}></div>
                </div>
                <span className="text-white text-sm">45%</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <Navigation />
    </div>
  )
}
