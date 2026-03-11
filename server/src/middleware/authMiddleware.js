import admin from '../config/firebase.js';

/**
 * Middleware to verify a Firebase ID Token.
 * Attaches the decoded user to req.user.
 */
export const verifyFirebaseToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized. No token provided.' });
    }

    const token = authHeader.split('Bearer ')[1];
    
    // In hackathon dev environments without Firebase Config, pass through
    if (!admin.apps.length) {
      console.warn('⚠️ Firebase Admin not initialized. Skipping token verification in DEV.');
      req.user = { uid: 'dev-user', email: 'dev@carepath.ai' };
      return next();
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Firebase Token Verification Error:', error);
    return res.status(401).json({ message: 'Unauthorized. Invalid or expired token.' });
  }
};
