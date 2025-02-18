import { Request, Response } from 'express';
import { InteractionService } from '../services/interactionService';
import { authMiddleware } from '../middleware/authMiddleware';
import { FrustrationAnalysisService } from '../services/frustrationAnalyzer';
import { TrackedInteraction, FrustrationAnalysisResult } from '../types/interaction';

export class InteractionController {
  private interactionService: InteractionService;

  constructor() {
    this.interactionService = new InteractionService();
  }

  async recordInteraction(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      const { sessionId, signalType, details } = req.body;

      if (!userId || !sessionId) {
        return res.status(400).json({ message: 'Missing user or session ID' });
      }

      const interaction = await this.interactionService.recordInteractions({
        userId,
        sessionId,
        signals: [{ type: signalType, timestamp: Date.now(), details }]
      });

      res.status(201).json(interaction);
    } catch (error) {
      res.status(500).json({ 
        message: error instanceof Error ? error.message : 'Interaction recording failed' 
      });
    }
  }

  async getSessionInteractions(req: Request, res: Response) {
    try {
      const { sessionId } = req.params;
      const interactions = await this.interactionService.getInteractionsBySession(sessionId);
      res.json(interactions);
    } catch (error) {
      res.status(500).json({ 
        message: error instanceof Error ? error.message : 'Fetching interactions failed' 
      });
    }
  }

  async trackInteraction(req: Request, res: Response) {
    try {
      const interaction: TrackedInteraction = req.body;

      // Use the instance to call the method
      const storedSignals = await this.interactionService.recordInteractions(interaction);

      const frustrationAnalysis = FrustrationAnalysisService.analyzeFrustration(interaction);

      if (frustrationAnalysis.level === 'high') {
        await this.handleHighFrustrationCase(interaction, frustrationAnalysis);
      }

      res.status(201).json({
        message: 'Interaction tracked successfully',
        frustrationAnalysis
      });
    } catch (error) {
      console.error('Interaction tracking error', error);
      res.status(500).json({ 
        error: 'Failed to track interaction',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  private async handleHighFrustrationCase(
    interaction: TrackedInteraction, 
    analysis: FrustrationAnalysisResult
  ) {
    console.log('High frustration detected', analysis);
  }
}

export default new InteractionController();

