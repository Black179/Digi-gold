"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  signInWithEmailAndPassword, 
  signInWithPhoneNumber, 
  RecaptchaVerifier,
  PhoneAuthProvider,
  sendEmailVerification,
  createUserWithEmailAndPassword
} from 'firebase/auth'
import { auth, createRecaptchaVerifier } from '@/lib/firebase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Mail, Phone, Eye, EyeOff, Info } from 'lucide-react'

export function FirebaseLoginForm() {
  const [activeTab, setActiveTab] = useState('email')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [recaptchaVerifier, setRecaptchaVerifier] = useState<RecaptchaVerifier | null>(null)
  const [isFirebaseReady, setIsFirebaseReady] = useState(false)
  
  // Email form states
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  
  // Phone form states
  const [phoneNumber, setPhoneNumber] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [verificationId, setVerificationId] = useState('')
  const [showVerificationInput, setShowVerificationInput] = useState(false)
  
  const router = useRouter()

  useEffect(() => {
    // Check if Firebase is ready
    if (auth) {
      setIsFirebaseReady(true)
    }
  }, [])

  useEffect(() => {
    // Initialize reCAPTCHA when component mounts and Firebase is ready
    if (activeTab === 'phone' && isFirebaseReady) {
      try {
        const verifier = createRecaptchaVerifier('recaptcha-container')
        setRecaptchaVerifier(verifier)
      } catch (error) {
        console.error('Error creating reCAPTCHA verifier:', error)
        setError('reCAPTCHA initialization failed. Please refresh the page.')
      }
    }
  }, [activeTab, isFirebaseReady])

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isFirebaseReady) {
      setError('Firebase is not ready. Please wait a moment and try again.')
      return
    }
    
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      if (isSignUp) {
        // Create new user
        const userCredential = await createUserWithEmailAndPassword(auth!, email, password)
        await sendEmailVerification(userCredential.user)
        setSuccess('Account created! Please check your email for verification.')
        setIsSignUp(false)
      } else {
        // Sign in existing user
        await signInWithEmailAndPassword(auth!, email, password)
        setSuccess('Login successful!')
        setTimeout(() => router.push('/dashboard'), 1000)
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isFirebaseReady) {
      setError('Firebase is not ready. Please wait a moment and try again.')
      return
    }
    
    setLoading(true)
    setError('')

    try {
      if (!recaptchaVerifier) {
        throw new Error('reCAPTCHA not initialized')
      }

      const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`
      const confirmationResult = await signInWithPhoneNumber(auth!, formattedPhone, recaptchaVerifier)
      
      setVerificationId(confirmationResult.verificationId)
      setShowVerificationInput(true)
      setSuccess('Verification code sent to your phone!')
    } catch (err: any) {
      setError(err.message || 'Failed to send verification code')
    } finally {
      setLoading(false)
    }
  }

  const handleVerificationCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isFirebaseReady) {
      setError('Firebase is not ready. Please wait a moment and try again.')
      return
    }
    
    setLoading(true)
    setError('')

    try {
      const credential = PhoneAuthProvider.credential(verificationId, verificationCode)
      await signInWithPhoneNumber(auth!, phoneNumber, recaptchaVerifier!)
      setSuccess('Phone verification successful!')
      setTimeout(() => router.push('/dashboard'), 1000)
    } catch (err: any) {
      setError(err.message || 'Invalid verification code')
    } finally {
      setLoading(false)
    }
  }

  const resetPhoneForm = () => {
    setPhoneNumber('')
    setVerificationCode('')
    setVerificationId('')
    setShowVerificationInput(false)
    setError('')
    setSuccess('')
  }

  if (!isFirebaseReady) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
        <Card className="w-full max-w-md bg-gray-800/50 border-gray-700">
          <CardContent className="text-center py-8">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-yellow-400" />
            <p className="text-gray-300">Initializing Firebase...</p>
          </CardContent>
        </Card>
      </div>
    )
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
              <div id="recaptcha-container"></div>
              
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
