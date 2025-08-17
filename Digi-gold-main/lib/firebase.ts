import { initializeApp, getApps, FirebaseApp } from 'firebase/app'
import { getAuth, PhoneAuthProvider, RecaptchaVerifier, Auth } from 'firebase/auth'

// Your Firebase configuration
// Replace these with your actual Firebase project credentials
// You can also use environment variables for better security
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyChSBz_-j08xbjThZ6pp9S7Rlg7qVtawRo",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "digigold07-09.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "digigold07-09",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "digigold07-09.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "YOUR_MESSAGING_SENDER_ID",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:813119426233:android:cac3e28c6c4415143ad568"
}

// Initialize Firebase only on the client side
let app: FirebaseApp | undefined
let auth: Auth | undefined
let phoneProvider: PhoneAuthProvider | undefined

if (typeof window !== 'undefined') {
  // Only initialize Firebase in the browser
  if (!getApps().length) {
    app = initializeApp(firebaseConfig)
  } else {
    app = getApps()[0]
  }
  
  // Initialize Firebase Authentication
  auth = getAuth(app)
  
  // Phone Auth Provider
  phoneProvider = new PhoneAuthProvider(auth)
}

// Recaptcha Verifier for phone authentication
export const createRecaptchaVerifier = (containerId: string) => {
  if (typeof window === 'undefined' || !auth) {
    throw new Error('Firebase Auth is not available in this environment')
  }
  
  return new RecaptchaVerifier(auth, containerId, {
    size: 'invisible',
    callback: () => {
      console.log('reCAPTCHA solved')
    }
  })
}

export { auth, phoneProvider }
export default app
