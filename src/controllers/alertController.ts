import { Request, Response } from 'express';
import AlertService from '../services/alertService';

export class AlertController {
  async createAlert(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      const { sessionId, type, severity, description } = req.body;

      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const alert = await AlertService.createAlert(
        userId, 
        sessionId, 
        type, 
        severity, 
        description
      );

      res.status(201).json(alert);
    } catch (error) {
      res.status(500).json({ 
        message: error instanceof Error ? error.message : 'Alert creation failed' 
      });
    }
  }

  async getUserAlerts(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      const { resolved } = req.query;

      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const alerts = await AlertService.getAlertsByUser(
        userId, 
        resolved ? Boolean(resolved) : undefined
      );

      res.json(alerts);
    } catch (error) {
      res.status(500).json({ 
        message: error instanceof Error ? error.message : 'Fetching alerts failed' 
      });
    }
  }

  async resolveAlert(req: Request, res: Response) {
    try {
      const { alertId } = req.params;

      const alert = await AlertService.resolveAlert(alertId);

      if (!alert) {
        return res.status(404).json({ message: 'Alert not found' });
      }

      res.json(alert);
    } catch (error) {
      res.status(500).json({ 
        message: error instanceof Error ? error.message : 'Resolving alert failed' 
      });
    }
  }
}

export default new AlertController(); 