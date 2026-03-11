import { Router } from 'express';
import { analyzeSymptoms } from '../controllers/analysisController.js';

const router = Router();

// POST /api/analyze — Analyze symptoms using Claude AI
router.post('/analyze', analyzeSymptoms);

export default router;
