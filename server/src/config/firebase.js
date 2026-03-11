import admin from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config();

// Initialize Firebase Admin if not already initialized
try {
  if (!admin.apps.length) {
    if (process.env.FIREBASE_PROJECT_ID) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        }),
      });
      console.log('Firebase Admin Initialized in configuration');
    }
  }
} catch (error) {
  console.error('Firebase Admin Init Error:', error);
}

export default admin;
