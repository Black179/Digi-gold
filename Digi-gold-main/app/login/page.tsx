import { SimpleLoginForm } from '@/components/auth/simple-login-form'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background Gold Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-yellow-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-yellow-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-yellow-400/10 rounded-full blur-3xl"></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 text-center pt-20 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-serif font-black text-6xl md:text-7xl text-white mb-6">
            DigiGold
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Your Gold. Your Future. Always in Real Time.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <span className="text-3xl">💰</span>
              <p className="text-white font-semibold mt-2">Invest</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <span className="text-3xl">📈</span>
              <p className="text-white font-semibold mt-2">Trade</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <span className="text-3xl">🏆</span>
              <p className="text-white font-semibold mt-2">Grow</p>
            </div>
          </div>
        </div>
      </div>

      {/* Login Form */}
      <div className="relative z-10">
        <SimpleLoginForm />
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center pb-8 px-4">
        <p className="text-gray-500 text-sm">
          © 2024 DigiGold. Premium Digital Gold Investment Platform.
        </p>
      </div>
    </div>
  )
}
