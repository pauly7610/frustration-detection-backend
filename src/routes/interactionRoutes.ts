import express from 'express';
import InteractionController from '../../../src/controllers/interactionController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/track', authMiddleware, InteractionController.recordInteraction);
router.get('/session/:sessionId', authMiddleware, InteractionController.getSessionInteractions);

export default router; 