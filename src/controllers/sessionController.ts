import { Request, Response } from 'express';
import SessionService from '../services/sessionService';

export class SessionController {
  async startSession(req: Request, res: Response) {
    try {
      const userId = req.user?.id; // Assuming authMiddleware adds user to request
      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const session = await SessionService.createSession(userId);
      res.status(201).json(session);
    } catch (error) {
      res.status(500).json({ 
        message: error instanceof Error ? error.message : 'Session creation failed' 
      });
    }
  }

  async endSession(req: Request, res: Response) {
    try {
      const { sessionId } = req.params;
      const { interactions } = req.body;

      const session = await SessionService.endSession(sessionId, interactions);
      res.json(session);
    } catch (error) {
      res.status(500).json({ 
        message: error instanceof Error ? error.message : 'Session end failed' 
      });
    }
  }

  async getUserSessions(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const sessions = await SessionService.getSessionsByUser(userId);
      res.json(sessions);
    } catch (error) {
      res.status(500).json({ 
        message: error instanceof Error ? error.message : 'Fetching sessions failed' 
      });
    }
  }
}

export default new SessionController(); 