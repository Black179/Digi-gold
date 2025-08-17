"use client"

import { useEffect, useState } from 'react'
import { FirebaseAuthProvider } from '@/contexts/firebase-auth-context'

interface ClientFirebaseProviderProps {
  children: React.ReactNode
}

export function ClientFirebaseProvider({ children }: ClientFirebaseProviderProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    // Return children without Firebase provider during SSR
    return <>{children}</>
  }

  return <FirebaseAuthProvider>{children}</FirebaseAuthProvider>
}
