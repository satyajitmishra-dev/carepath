import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import analysisRoutes from './src/routes/analysisRoutes.js';
import clinicRoutes from './src/routes/clinicRoutes.js';
import authRoutes from './src/routes/authRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
if (process.env.MONGODB_URL) {
  mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('🍃 Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));
} else {
  console.warn('⚠️ MONGODB_URL not found. Running without database connection.');
}

// Middleware
app.use(cors());
app.use(express.json({ limit: '1mb' }));

// Routes
app.use('/api', analysisRoutes);
app.use('/api', clinicRoutes);
app.use('/api/auth', authRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', name: 'CarePath API', version: '1.0.0' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err.message);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

app.listen(PORT, () => {
  console.log(`🩺 CarePath API running on http://localhost:${PORT}`);
});
