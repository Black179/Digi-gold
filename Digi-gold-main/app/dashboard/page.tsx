import { PriceTicker } from "@/components/price-ticker"
import { Portfolio } from "@/components/portfolio"
import { TradingPanel } from "@/components/trading-panel"
import { Navigation } from "@/components/navigation"
import { PreciousMetalsChart } from "@/components/precious-metals-chart"
// import { AuthGuard } from "@/components/auth/auth-guard"
import Link from "next/link"
import Image from "next/image"

function DashboardContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg">
              <span className="text-gray-900 font-serif font-black text-xl">D</span>
            </div>
            <h1 className="font-serif font-black text-3xl text-white">DigiGold</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs text-gray-400">Portfolio Value</p>
              <p className="font-serif font-bold text-xl text-yellow-400">₹12,84,750</p>
            </div>
            <div className="flex items-center gap-3">
              <Link 
                href="/profile"
                className="px-4 py-2 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-600 transition-colors"
              >
                Profile
              </Link>
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg">
                <span className="text-gray-900 font-bold text-sm">JD</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Gold Images */}
      <section className="px-4 py-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-yellow-600 to-yellow-400 p-8 text-center">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <h2 className="font-serif font-black text-4xl text-white mb-4">Your Gold. Your Future.</h2>
            <p className="text-white/90 text-lg mb-6">Always in Real Time.</p>
            <div className="flex justify-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <span className="text-2xl">💰</span>
                <p className="text-white font-semibold">Invest</p>
              </div>
              <div className="bg-gray-700/50 rounded-lg p-4">
                <span className="text-2xl">📈</span>
                <p className="text-white font-semibold">Trade</p>
              </div>
              <div className="bg-gray-700/50 rounded-lg p-4">
                <span className="text-2xl">🏆</span>
                <p className="text-white font-semibold">Grow</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Price Ticker */}
      <PriceTicker />

      {/* Precious Metals Chart Section */}
      <section className="px-4 py-6">
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Precious Metals Chart</h3>
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">●</span>
              <span className="text-gray-400 text-sm">Gold & Silver</span>
            </div>
          </div>
          <PreciousMetalsChart />
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 pb-20 space-y-6">
        {/* Quick Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/trades" className="group">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 border border-blue-600 hover:border-blue-500 transition-all hover:scale-105">
              <div className="text-center">
                <span className="text-4xl">💰</span>
                <h3 className="text-white font-bold text-lg mt-3 mb-2">Trades</h3>
                <p className="text-blue-100 text-sm">View your trading history</p>
              </div>
            </div>
          </Link>
          
          <Link href="/markets" className="group">
            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 border border-green-600 hover:border-green-500 transition-all hover:scale-105">
              <div className="text-center">
                <span className="text-4xl">📈</span>
                <h3 className="text-white font-bold text-lg mt-3 mb-2">Markets</h3>
                <p className="text-green-100 text-sm">Live market data</p>
              </div>
            </div>
          </Link>
          
          <Link href="/profile" className="group">
            <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 border border-purple-600 hover:border-purple-500 transition-all hover:scale-105">
              <div className="text-center">
                <span className="text-4xl">👤</span>
                <h3 className="text-white font-bold text-lg mt-3 mb-2">Profile</h3>
                <p className="text-purple-100 text-sm">Manage your account</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Portfolio Overview */}
        <Portfolio />

        {/* Trading Panel */}
        <TradingPanel />
      </main>

      {/* Bottom Navigation */}
      <Navigation />
    </div>
  )
}

export default function DashboardPage() {
  return (
    // <AuthGuard>
      <DashboardContent />
    // </AuthGuard>
  )
}

