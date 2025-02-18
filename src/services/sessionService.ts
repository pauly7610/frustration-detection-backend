import Session, { ISession } from '../models/database/Session';
import { FrustrationModel } from '../models/ml/frustrationModel';
import { SignalExtractor } from '../models/ml/signalExtractor';

export class SessionService {
  private frustrationModel: FrustrationModel;
  private signalExtractor: SignalExtractor;

  constructor() {
    this.frustrationModel = new FrustrationModel();
    this.signalExtractor = new SignalExtractor();
  }

  async createSession(userId: string): Promise<ISession> {
    const session = new Session({
      userId,
      startTime: new Date(),
      interactions: []
    });

    return await session.save();
  }

  async endSession(sessionId: string, interactions: any[]): Promise<ISession> {
    const session = await Session.findById(sessionId);
    if (!session) {
      throw new Error('Session not found');
    }

    // Process interactions
    session.interactions = interactions;
    session.endTime = new Date();

    // Extract features and predict frustration level
    const processedData = this.signalExtractor.preprocessData(interactions);
    const features = this.signalExtractor.extractFeatures(processedData);
    
    try {
      session.frustrationLevel = await this.frustrationModel.predict(features);
    } catch (error) {
      console.warn('Frustration prediction failed:', error);
      session.frustrationLevel = undefined;
    }

    return await session.save();
  }

  async getSessionsByUser(userId: string): Promise<ISession[]> {
    return await Session.find({ userId }).sort({ startTime: -1 });
  }
}

export default new SessionService(); 