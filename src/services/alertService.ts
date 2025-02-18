import Alert, { IAlert } from '../models/database/Alert';

export class AlertService {
  async createAlert(
    userId: string, 
    sessionId: string, 
    type: string, 
    severity: number, 
    description?: string
  ): Promise<IAlert> {
    const alert = new Alert({
      userId,
      sessionId,
      type,
      severity,
      description,
      timestamp: new Date(),
      resolved: false
    });

    return await alert.save();
  }

  async getAlertsByUser(userId: string, resolved?: boolean): Promise<IAlert[]> {
    const query = resolved !== undefined 
      ? { userId, resolved } 
      : { userId };

    return await Alert.find(query)
      .sort({ timestamp: -1 })
      .populate('sessionId');
  }

  async resolveAlert(alertId: string): Promise<IAlert | null> {
    return await Alert.findByIdAndUpdate(
      alertId, 
      { resolved: true }, 
      { new: true }
    );
  }
}

export default new AlertService(); 