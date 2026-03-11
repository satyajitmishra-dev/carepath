import express from 'express';
import User from '../models/User.js';
import { verifyFirebaseToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Synchronize Firebase user with MongoDB
router.post('/sync', verifyFirebaseToken, async (req, res) => {
  try {
    const { uid, email, name, picture } = req.user; // from decoded token

    let user = await User.findOne({ firebaseUid: uid });

    if (!user) {
      // First time login -> Create user
      user = new User({
        firebaseUid: uid,
        email: email,
        displayName: name || '',
        photoURL: picture || '',
        lastLoginAt: Date.now(),
      });
      await user.save();
    } else {
      // Returning user -> Update last login and possible profile changes
      user.lastLoginAt = Date.now();
      if (name) user.displayName = name;
      if (picture) user.photoURL = picture;
      await user.save();
    }

    res.status(200).json({ 
      success: true, 
      user: {
        id: user._id,
        displayName: user.displayName,
        email: user.email,
        consultationsCount: user.consultationsCount
      } 
    });
  } catch (error) {
    console.error('Auth Sync Error:', error);
    res.status(500).json({ success: false, message: 'Server error syncing auth data' });
  }
});

export default router;
