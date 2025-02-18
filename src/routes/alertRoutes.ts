import express from 'express';
import AlertController from '../controllers/alertController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', authMiddleware, AlertController.createAlert);
router.get('/', authMiddleware, AlertController.getUserAlerts);
router.patch('/:alertId/resolve', authMiddleware, AlertController.resolveAlert);

export default router; 