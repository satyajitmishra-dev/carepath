import { Router } from 'express';
import { getClinics } from '../controllers/clinicController.js';

const router = Router();

// GET /api/clinics — Get filtered clinics
router.get('/clinics', getClinics);

export default router;
