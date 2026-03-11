import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const requiredConfigKeys = Object.keys(firebaseConfig);
const missingKeys = requiredConfigKeys.filter((key) => !firebaseConfig[key]);

export const isFirebaseConfigured = missingKeys.length === 0;

if (!isFirebaseConfigured) {
  console.error(
    `[Firebase] Missing config keys: ${missingKeys.join(', ')}. ` +
    'Set VITE_FIREBASE_* variables in your environment (e.g., Vercel Project Settings -> Environment Variables).'
  );
}

let app = null;
let auth = null;
let googleProvider = null;

if (isFirebaseConfigured) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  googleProvider = new GoogleAuthProvider();

  googleProvider.setCustomParameters({
    prompt: 'select_account'
  });
}

export { app, auth, googleProvider };
