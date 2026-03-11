import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import analysisRoutes from '../src/routes/analysisRoutes.js';
import clinicRoutes from '../src/routes/clinicRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: '*', // Allow Vercel frontend to access
  methods: ['GET', 'POST'],
}));
app.use(express.json({ limit: '1mb' }));

// Routes
app.use('/api', analysisRoutes);
app.use('/api', clinicRoutes);

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

export default app;
