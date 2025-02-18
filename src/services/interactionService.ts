import InteractionSignal, { IInteractionSignal } from '../models/database/InteractionSignal';
import { TrackedInteraction } from '../types/interaction';

export class InteractionService {
  async recordInteractions(interaction: TrackedInteraction) {
    const storedSignals = await Promise.all(
      interaction.signals.map(async (signal) => {
        const newSignal = new InteractionSignal({
          userId: interaction.userId,
          sessionId: interaction.sessionId,
          signalType: signal.type,
          timestamp: new Date(signal.timestamp),
          details: signal.details
        });

        return await newSignal.save();
      })
    );

    return storedSignals;
  }

  async getInteractionsBySession(sessionId: string): Promise<IInteractionSignal[]> {
    return await InteractionSignal.find({ sessionId }).sort({ timestamp: 1 });
  }
}


export default new InteractionService();