import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth, googleProvider, isFirebaseConfigured } from '../../config/firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import api from '../../services/api';
import toast from 'react-hot-toast';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,
  guestConsultations: parseInt(localStorage.getItem('guestConsultations') || '0', 10),
};

// Google Login Thunk
export const loginWithGoogle = createAsyncThunk(
  'auth/loginWithGoogle',
  async (_, { rejectWithValue }) => {
    try {
      if (!isFirebaseConfigured || !auth || !googleProvider) {
        const message = 'Firebase is not configured for this deployment. Please set VITE_FIREBASE_* environment variables.';
        toast.error(message);
        return rejectWithValue(message);
      }

      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const idToken = await user.getIdToken();

      // Sync with backend to create the user in MongoDB
      try {
        await api.post('/auth/sync', {}, {
          headers: {
            Authorization: `Bearer ${idToken}`
          }
        });
      } catch (e) {
        console.error('Failed to sync auth with backend', e);
      }

      return {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        token: idToken,
      };
    } catch (error) {
      toast.error('Failed to sign in. Please try again.');
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      if (!auth) {
        return null;
      }

      await signOut(auth);
      return null;
    } catch (error) {
      toast.error('Failed to sign out.');
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      // Called primarily by the onAuthStateChanged listener
      if (action.payload) {
        state.user = action.payload;
        state.isAuthenticated = true;
      } else {
        state.user = null;
        state.isAuthenticated = false;
      }
      state.loading = false;
    },
    setAuthLoading: (state, action) => {
      state.loading = action.payload;
    },
    incrementGuestConsultation: (state) => {
      state.guestConsultations += 1;
      localStorage.setItem('guestConsultations', state.guestConsultations.toString());
    },
    resetGuestConsultations: (state) => {
      state.guestConsultations = 0;
      localStorage.setItem('guestConsultations', '0');
    }
  },
  extraReducers: (builder) => {
    builder
      // Google Login
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        toast.success(`Welcome back to your healthcare journey, ${action.payload.displayName.split(' ')[0]}! 🌿`, {
          icon: '✨',
          style: {
            background: '#0A140F',
            color: '#E8F8F2',
            border: '1px solid rgba(80, 200, 120, 0.2)',
          },
        });
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        toast('Logged out successfully', {
          icon: '👋',
          style: {
            background: '#0A140F',
            color: '#E8F8F2',
            border: '1px solid rgba(80, 200, 120, 0.2)',
          },
        });
      });
  },
});

export const { setUser, setAuthLoading, incrementGuestConsultation, resetGuestConsultations } = authSlice.actions;

export default authSlice.reducer;
