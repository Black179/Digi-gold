"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Mail, Phone, Eye, EyeOff, Info } from 'lucide-react'

export function SimpleLoginForm() {
  const [activeTab, setActiveTab] = useState('email')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  
  // Email form states
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  
  // Phone form states
  const [phoneNumber, setPhoneNumber] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [showVerificationInput, setShowVerificationInput] = useState(false)
  
  const router = useRouter()

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      // Simple demo authentication
      if (email === 'demo@digigold.com' && password === 'demo123') {
        setSuccess('Login successful!')
        setTimeout(() => router.push('/dashboard'), 1000)
      } else if (isSignUp) {
        setSuccess('Account created! Please check your email for verification.')
        setIsSignUp(false)
      } else {
        setError('Invalid credentials. Use demo@digigold.com / demo123')
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Simulate phone verification
      if (phoneNumber && phoneNumber.length > 10) {
        setShowVerificationInput(true)
        setSuccess('Verification code sent to your phone! (Demo mode)')
      } else {
        setError('Please enter a valid phone number')
      }
    } catch (err: any) {
      setError(err.message || 'Failed to send verification code')
    } finally {
      setLoading(false)
    }
  }

  const handleVerificationCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Simulate verification
      if (verificationCode === '123456') {
        setSuccess('Phone verification successful!')
        setTimeout(() => router.push('/dashboard'), 1000)
      } else {
        setError('Invalid verification code. Use 123456 for demo')
      }
    } catch (err: any) {
      setError(err.message || 'Invalid verification code')
    } finally {
      setLoading(false)
    }
  }

  const resetPhoneForm = () => {
    setPhoneNumber('')
    setVerificationCode('')
    setShowVerificationInput(false)
    setError('')
    setSuccess('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
      <Card className="w-full max-w-md bg-gray-800/50 border-gray-700">
        <CardHeader className="text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-4 flex items-center justify-center shadow-lg">
            <span className="text-gray-900 font-serif font-black text-3xl">D</span>
          </div>
          <CardTitle className="font-serif font-black text-4xl text-white">DigiGold</CardTitle>
          <CardDescription className="text-gray-400 text-lg">
            {isSignUp ? 'Create your account' : 'Sign in to your account'}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-700">
              <TabsTrigger value="email" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-gray-900">
                <Mail className="w-4 h-4 mr-2" />
                Email
              </TabsTrigger>
              <TabsTrigger value="phone" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-gray-900">
                <Phone className="w-4 h-4 mr-2" />
                Phone
              </TabsTrigger>
            </TabsList>

            <TabsContent value="email" className="mt-6">
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                {success && (
                  <Alert>
                    <AlertDescription>{success}</AlertDescription>
                  </Alert>
                )}

                {/* Sample Credentials Info */}
                {!isSignUp && (
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Demo Credentials:</strong><br />
                      Email: <code className="bg-gray-700 px-1 rounded">demo@digigold.com</code><br />
                      Password: <code className="bg-gray-700 px-1 rounded">demo123</code>
                    </AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-300">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400 pr-10"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold py-3"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {isSignUp ? 'Creating Account...' : 'Signing In...'}
                    </>
                  ) : (
                    isSignUp ? 'Create Account' : 'Sign In'
                  )}
                </Button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-yellow-400 hover:text-yellow-300 text-sm"
                  >
                    {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                  </button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="phone" className="mt-6">
              {!showVerificationInput ? (
                <form onSubmit={handlePhoneSubmit} className="space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-300">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400"
                      placeholder="Enter your phone number"
                      required
                    />
                    <p className="text-xs text-gray-500">Enter with country code (e.g., +91 for India)</p>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-yellow-400 hover:bg-yellow-400 text-gray-900 font-bold py-3"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending Code...
                      </>
                    ) : (
                      'Send Verification Code'
                    )}
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleVerificationCodeSubmit} className="space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  
                  {success && (
                    <Alert>
                      <AlertDescription>{success}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="verificationCode" className="text-gray-300">Verification Code</Label>
                    <Input
                      id="verificationCode"
                      type="text"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400"
                      placeholder="Enter 6-digit code"
                      required
                      maxLength={6}
                    />
                    <p className="text-xs text-gray-500">Demo code: 123456</p>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold py-3"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        'Verify Code'
                      )}
                    </Button>
                    
                    <Button
                      type="button"
                      onClick={resetPhoneForm}
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-gray-700 py-3"
                    >
                      Back
                    </Button>
                  </div>
                </form>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
