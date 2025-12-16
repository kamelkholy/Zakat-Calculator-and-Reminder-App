import express, { Router } from 'express';
import * as zakatController from '../controllers/zakatController';

const router: Router = express.Router();

// Routes
router.get('/nisab', zakatController.getNisab);
router.post('/calculate', zakatController.calculateZakat);
router.post('/payment/:type/:assetId', zakatController.recordPayment);

export default router;
