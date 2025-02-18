import express from 'express';
import AuthController from '../controllers/authController';
import { validateRegistration } from '../middleware/validationMiddleware';

const router = express.Router();

router.post('/register', validateRegistration, AuthController.register);
router.post('/login', AuthController.login);

export default router; 