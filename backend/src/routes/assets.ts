import express, { Request, Response, NextFunction, Router } from 'express';
import * as assetController from '../controllers/assetController';

const router: Router = express.Router();

// Middleware to verify user (mock - replace with real auth)
const authMiddleware = (req: Request, _res: Response, next: NextFunction): void => {
  // Mock user ID - in production, extract from JWT token
  (req as any).userId = req.headers['user-id'] || '507f1f77bcf86cd799439011';
  next();
};

router.use(authMiddleware);

// Routes
router.get('/', assetController.getAllAssets);
router.post('/money', assetController.createMoneyAsset);
router.post('/stock', assetController.createStockAsset);
router.post('/precious-metal', assetController.createPreciousMetalAsset);
router.put('/:type/:id', assetController.updateAsset);
router.delete('/:type/:id', assetController.deleteAsset);

export default router;
