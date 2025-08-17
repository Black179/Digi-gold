import { Navigation } from "@/components/navigation"

export default function TradesPage() {
  const trades = [
    {
      id: 1,
      type: "BUY",
      amount: "2.5 oz",
      price: "$2,150.00",
      total: "$5,375.00",
      date: "2024-01-15",
      status: "Completed",
      goldType: "24K Gold"
    },
    {
      id: 2,
      type: "SELL",
      amount: "1.0 oz",
      price: "$2,180.00",
      total: "$2,180.00",
      date: "2024-01-14",
      status: "Completed",
      goldType: "24K Gold"
    },
    {
      id: 3,
      type: "BUY",
      amount: "5.0 oz",
      price: "$2,120.00",
      total: "$10,600.00",
      date: "2024-01-12",
      status: "Pending",
      goldType: "22K Gold"
    }
  ]

  const activeTrades = [
    {
      id: 4,
      type: "BUY",
      amount: "3.0 oz",
      targetPrice: "$2,100.00",
      status: "Active",
      timeLeft: "2h 15m"
    }
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
            <h1 className="font-serif font-black text-2xl text-white">Trades</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs text-gray-400">Total Trades</p>
              <p className="font-serif font-bold text-lg text-yellow-400">{trades.length}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 pb-20 space-y-6">
        {/* Trading Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <p className="text-gray-400 text-sm">Total Volume</p>
            <p className="text-white font-bold text-lg">$17,155.00</p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <p className="text-gray-400 text-sm">Profit/Loss</p>
            <p className="text-green-400 font-bold text-lg">+$1,245.50</p>
          </div>
        </div>

        {/* Active Trades */}
        <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
          <h3 className="text-white font-bold text-lg mb-4">Active Trades</h3>
          {activeTrades.map((trade) => (
            <div key={trade.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${trade.type === 'BUY' ? 'bg-green-400' : 'bg-red-400'}`}></div>
                <div>
                  <p className="text-white font-medium">{trade.type} {trade.amount}</p>
                  <p className="text-gray-400 text-sm">Target: {trade.targetPrice}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="status-badge status-active">{trade.status}</span>
                <p className="text-gray-400 text-xs">{trade.timeLeft}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Trade History */}
        <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
          <h3 className="text-white font-bold text-lg mb-4">Trade History</h3>
          <div className="space-y-3">
            {trades.map((trade) => (
              <div key={trade.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${trade.type === 'BUY' ? 'bg-green-400' : 'bg-red-400'}`}></div>
                  <div>
                    <p className="text-white font-medium">{trade.type} {trade.amount}</p>
                    <p className="text-gray-400 text-sm">{trade.goldType}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">{trade.total}</p>
                  <p className="text-gray-400 text-xs">{trade.date}</p>
                  <span className={`status-badge ${
                    trade.status === 'Completed' ? 'status-verified' : 'status-pending'
                  }`}>
                    {trade.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <Navigation />
    </div>
  )
}
