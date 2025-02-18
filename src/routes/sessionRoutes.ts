import express from 'express';
import SessionController from '../controllers/sessionController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/start', authMiddleware, SessionController.startSession);
router.post('/end/:sessionId', authMiddleware, SessionController.endSession);
router.get('/', authMiddleware, SessionController.getUserSessions);

export default router; 