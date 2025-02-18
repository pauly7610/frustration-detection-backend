import { Request, Response } from 'express';
import AuthService from '../services/authService';

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;
      const user = await AuthService.register(username, email, password);
      res.status(201).json({ 
        message: 'User registered successfully', 
        userId: user._id 
      });
    } catch (error) {
      res.status(400).json({ 
        message: error instanceof Error ? error.message : 'Registration failed' 
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const token = await AuthService.login(email, password);
      res.json({ token });
    } catch (error) {
      res.status(401).json({ 
        message: error instanceof Error ? error.message : 'Login failed' 
      });
    }
  }
}

export default new AuthController(); 