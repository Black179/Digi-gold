# Firebase Setup Guide for DigiGold App

## Prerequisites
- A Google account
- Node.js and npm installed

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter a project name (e.g., "digi-gold-app")
4. Choose whether to enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Authentication

1. In your Firebase project dashboard, click on "Authentication" in the left sidebar
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Enable the following providers:

### Email/Password Authentication
- Click on "Email/Password"
- Toggle "Enable" to ON
- Toggle "Email link (passwordless sign-in)" if you want passwordless login
- Click "Save"

### Phone Authentication
- Click on "Phone"
- Toggle "Enable" to ON
- Add your test phone numbers if you're in development
- Click "Save"

## Step 3: Get Firebase Configuration

1. In your Firebase project dashboard, click on the gear icon (⚙️) next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click on the web app icon (</>)
5. Register your app with a nickname (e.g., "digi-gold-web")
6. Copy the configuration object that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
}
```

## Step 4: Update Configuration in Your App

1. Open `lib/firebase.ts`
2. Replace the placeholder values with your actual Firebase configuration:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "YOUR_ACTUAL_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_ACTUAL_PROJECT_ID",
  storageBucket: "YOUR_ACTUAL_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_ACTUAL_MESSAGING_SENDER_ID",
  appId: "YOUR_ACTUAL_APP_ID"
}
```

## Step 5: Configure reCAPTCHA (Required for Phone Auth)

1. In Firebase Console, go to Authentication > Settings
2. Scroll down to "reCAPTCHA Enterprise" section
3. Click "Enable reCAPTCHA Enterprise"
4. Follow the setup instructions to configure reCAPTCHA

## Step 6: Test Your Setup

1. Start your development server: `npm run dev`
2. Navigate to `/login`
3. Try both email and phone authentication methods

## Security Rules

### Email/Password Authentication
- Users can sign up with email and password
- Email verification is automatically sent
- Password requirements: minimum 6 characters

### Phone Authentication
- Users can sign in with phone number
- SMS verification code is sent
- reCAPTCHA verification prevents abuse

## Environment Variables (Optional but Recommended)

Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

Then update `lib/firebase.ts`:

```typescript
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
}
```

## Troubleshooting

### Common Issues:

1. **"reCAPTCHA not initialized"**
   - Make sure reCAPTCHA Enterprise is enabled in Firebase
   - Check that the container ID matches

2. **"Phone number format invalid"**
   - Ensure phone numbers include country code (e.g., +91 for India)
   - Check Firebase console for allowed phone number formats

3. **"API key not valid"**
   - Verify your Firebase configuration
   - Check that the API key is correct
   - Ensure your domain is whitelisted in Firebase

4. **"Quota exceeded"**
   - Phone authentication has daily limits
   - Consider upgrading to a paid plan for production use

## Production Considerations

1. **Domain Restrictions**: Add your production domain to Firebase authorized domains
2. **Rate Limiting**: Implement rate limiting for authentication attempts
3. **Error Handling**: Add comprehensive error handling for production
4. **Monitoring**: Enable Firebase Analytics and Crashlytics
5. **Security**: Regularly review Firebase security rules and authentication logs

## Support

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Authentication Guide](https://firebase.google.com/docs/auth)
- [Firebase Console](https://console.firebase.google.com/)
