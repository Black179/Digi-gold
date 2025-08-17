import { useFirebaseAuth } from '@/contexts/firebase-auth-context'

export function useFirebaseAuthState() {
  const { user, loading, signOutUser } = useFirebaseAuth()
  
  return {
    user,
    loading,
    isAuthenticated: !!user,
    signOut: signOutUser,
    userId: user?.uid,
    userEmail: user?.email,
    userPhone: user?.phoneNumber,
    isEmailVerified: user?.emailVerified || false
  }
}
