import { Navigation } from "@/components/navigation"

export default function ProfilePage() {
  const userInfo = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    memberSince: "January 2023",
    verificationStatus: "Verified",
    kycStatus: "Completed"
  }

  const accountStats = [
    { label: "Total Investment", value: "$25,847.50", change: "+12.5%" },
    { label: "Gold Holdings", value: "12.5 oz", change: "+2.3 oz" },
    { label: "Total Trades", value: "47", change: "+8" },
    { label: "Success Rate", value: "94.2%", change: "+2.1%" }
  ]

  const preferences = [
    { label: "Email Notifications", enabled: true },
    { label: "SMS Alerts", enabled: false },
    { label: "Price Alerts", enabled: true },
    { label: "Market Updates", enabled: true },
    { label: "Trade Confirmations", enabled: true }
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
            <h1 className="font-serif font-black text-2xl text-white">Profile</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-yellow-400 text-sm font-medium">Edit</button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 pb-20 space-y-6">
        {/* Profile Header */}
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 text-center">
          <div className="w-24 h-24 rounded-full gold-gradient mx-auto mb-4 flex items-center justify-center">
            <span className="text-gray-900 font-serif font-black text-3xl">JD</span>
          </div>
          <h2 className="text-white font-bold text-xl mb-1">{userInfo.name}</h2>
          <p className="text-gray-400 text-sm mb-3">{userInfo.email}</p>
          <div className="flex items-center justify-center gap-4">
            <span className="status-badge status-verified">
              {userInfo.verificationStatus}
            </span>
            <span className="status-badge status-completed">
              {userInfo.kycStatus}
            </span>
          </div>
        </div>

        {/* Account Statistics */}
        <div className="grid grid-cols-2 gap-4">
          {accountStats.map((stat, index) => (
            <div key={index} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <p className="text-gray-400 text-sm">{stat.label}</p>
              <p className="text-white font-bold text-lg">{stat.value}</p>
              <p className="text-green-400 text-sm">{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Personal Information */}
        <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
          <h3 className="text-white font-bold text-lg mb-4">Personal Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Full Name</span>
              <span className="text-white">{userInfo.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Email</span>
              <span className="text-white">{userInfo.email}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Phone</span>
              <span className="text-white">{userInfo.phone}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Member Since</span>
              <span className="text-white">{userInfo.memberSince}</span>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
          <h3 className="text-white font-bold text-lg mb-4">Preferences</h3>
          <div className="space-y-3">
            {preferences.map((pref, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-gray-400">{pref.label}</span>
                <div className={`toggle-switch ${pref.enabled ? 'enabled' : ''}`}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Security */}
        <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
          <h3 className="text-white font-bold text-lg mb-4">Security</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors">
              <div className="flex justify-between items-center">
                <span className="text-white">Change Password</span>
                <span className="text-gray-400">→</span>
              </div>
            </button>
            <button className="w-full text-left p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors">
              <div className="flex justify-between items-center">
                <span className="text-white">Two-Factor Authentication</span>
                <span className="text-green-400 text-sm">Enabled</span>
              </div>
            </button>
            <button className="w-full text-left p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors">
              <div className="flex justify-between items-center">
                <span className="text-white">Login History</span>
                <span className="text-gray-400">→</span>
              </div>
            </button>
          </div>
        </div>

        {/* Support */}
        <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
          <h3 className="text-white font-bold text-lg mb-4">Support</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors">
              <div className="flex justify-between items-center">
                <span className="text-white">Help Center</span>
                <span className="text-gray-400">→</span>
              </div>
            </button>
            <button className="w-full text-left p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors">
              <div className="flex justify-between items-center">
                <span className="text-white">Contact Support</span>
                <span className="text-gray-400">→</span>
              </div>
            </button>
            <button className="w-full text-left p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors">
              <div className="flex justify-between items-center">
                <span className="text-white">FAQ</span>
                <span className="text-gray-400">→</span>
              </div>
            </button>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <Navigation />
    </div>
  )
}
