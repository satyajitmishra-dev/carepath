import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const normalizeEnv = (value) => {
  if (typeof value !== 'string') {
    return value;
  }

  return value.trim().replace(/^['\"]|['\"]$/g, '');
};

const firebaseConfig = {
  apiKey: normalizeEnv(import.meta.env.VITE_FIREBASE_API_KEY),
  authDomain: normalizeEnv(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN),
  projectId: normalizeEnv(import.meta.env.VITE_FIREBASE_PROJECT_ID),
  storageBucket: normalizeEnv(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET),
  messagingSenderId: normalizeEnv(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID),
  appId: normalizeEnv(import.meta.env.VITE_FIREBASE_APP_ID)
};

const requiredConfigKeys = Object.keys(firebaseConfig);
const missingKeys = requiredConfigKeys.filter((key) => !firebaseConfig[key]);

export const isFirebaseConfigured = missingKeys.length === 0;
const hasLikelyInvalidApiKey =
  isFirebaseConfigured &&
  (firebaseConfig.apiKey.length < 20 || !firebaseConfig.apiKey.startsWith('AIza'));

if (!isFirebaseConfigured) {
  console.error(
    `[Firebase] Missing config keys: ${missingKeys.join(', ')}. ` +
    'Set VITE_FIREBASE_* variables in your environment (e.g., Vercel Project Settings -> Environment Variables).'
  );
}

if (hasLikelyInvalidApiKey) {
  console.error('[Firebase] VITE_FIREBASE_API_KEY appears malformed. Check for copy/paste errors in deployment environment variables.');
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
