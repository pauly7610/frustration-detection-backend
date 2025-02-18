// src/services/frustrationAnalysisService.ts
import { TrackedInteraction, FrustrationAnalysisResult } from '../types/interaction';
import { IInteractionSignal } from '../models/database/InteractionSignal';

export class FrustrationAnalysisService {
  // Main method for analyzing frustration
  static analyzeFrustration(interaction: TrackedInteraction): FrustrationAnalysisResult {
    const signals = interaction.signals;
    
    // Scoring criteria
    const scoringMetrics = {
      rageClicks: this.calculateRageClickScore(signals),
      movementErraticity: this.calculateMovementErraticityScore(signals),
      keyboardIntensity: this.calculateKeyboardIntensityScore(signals),
      errorFrequency: this.calculateErrorFrequencyScore(signals)
    };

    // Aggregate score
    const aggregateScore = this.calculateAggregateScore(scoringMetrics);

    return {
      score: aggregateScore,
      level: this.determineFrustrationLevel(aggregateScore),
      insights: this.generateInsights(scoringMetrics)
    };
  }

  // Method for analyzing a single signal (for compatibility with existing code)
  static async analyzeSingleSignal(interaction: Partial<IInteractionSignal>): Promise<number> {
    // Simplified single signal analysis
    switch(interaction.signalType) {
      case 'click':
        return this.analyzeClickFrustration(interaction);
      case 'movement':
        return this.analyzeMovementFrustration(interaction);
      case 'keyboard':
        return this.analyzeKeyboardFrustration(interaction);
      case 'error':
        return this.analyzeErrorFrustration(interaction);
      default:
        return 0;
    }
  }

  // Detailed scoring methods
  private static calculateRageClickScore(signals: any[]): number {
    const clickSignals = signals.filter(s => s.type === 'click');
    
    // Detect rapid, repeated clicks
    const rapidClickThreshold = 300; // ms
    let rageClickCount = 0;
    
    for (let i = 1; i < clickSignals.length; i++) {
      const timeDiff = clickSignals[i].timestamp - clickSignals[i-1].timestamp;
      if (timeDiff < rapidClickThreshold) {
        rageClickCount++;
      }
    }

    return Math.min(rageClickCount / clickSignals.length, 1);
  }

  private static calculateMovementErraticityScore(signals: any[]): number {
    const movementSignals = signals.filter(s => s.type === 'movement');
    
    if (movementSignals.length < 2) return 0;

    // Calculate movement volatility
    const movements = movementSignals.map(s => ({
      x: s.details.x || 0,
      y: s.details.y || 0
    }));

    const xVariance = this.calculateVariance(movements.map(m => m.x));
    const yVariance = this.calculateVariance(movements.map(m => m.y));

    // Higher variance indicates more erratic movement
    return Math.min((xVariance + yVariance) / 1000, 1);
  }

  private static calculateKeyboardIntensityScore(signals: any[]): number {
    const keyboardSignals = signals.filter(s => s.type === 'keyboard');
    
    // Detect rapid, aggressive typing
    const rapidKeyPressThreshold = 100; // ms
    let intenseKeyPressCount = 0;

    for (let i = 1; i < keyboardSignals.length; i++) {
      const timeDiff = keyboardSignals[i].timestamp - keyboardSignals[i-1].timestamp;
      if (timeDiff < rapidKeyPressThreshold) {
        intenseKeyPressCount++;
      }
    }

    return Math.min(intenseKeyPressCount / keyboardSignals.length, 1);
  }

  private static calculateErrorFrequencyScore(signals: any[]): number {
    const errorSignals = signals.filter(s => s.type === 'error');
    
    // More errors indicate higher frustration
    return Math.min(errorSignals.length / 10, 1);
  }

  // Utility methods
  private static calculateAggregateScore(metrics: Record<string, number>): number {
    const weights = {
      rageClicks: 0.3,
      movementErraticity: 0.25,
      keyboardIntensity: 0.25,
      errorFrequency: 0.2
    };

    return Object.entries(metrics).reduce((score, [key, value]) => {
      return score + (value * (weights[key as keyof typeof weights] || 0));
    }, 0);
  }

  private static determineFrustrationLevel(score: number): 'low' | 'medium' | 'high' {
    if (score > 0.7) return 'high';
    if (score > 0.3) return 'medium';
    return 'low';
  }

  private static generateInsights(metrics: Record<string, number>): string[] {
    const insights: string[] = [];

    if (metrics.rageClicks > 0.5) {
      insights.push('Detected potential rage clicking behavior');
    }

    if (metrics.movementErraticity > 0.6) {
      insights.push('Erratic mouse movement suggests user frustration');
    }

    if (metrics.keyboardIntensity > 0.5) {
      insights.push('Intense keyboard interaction detected');
    }

    if (metrics.errorFrequency > 0.3) {
      insights.push('Multiple errors encountered during interaction');
    }

    return insights.length ? insights : ['No significant frustration indicators detected'];
  }

  // Helper statistical method
  private static calculateVariance(numbers: number[]): number {
    const mean = numbers.reduce((a, b) => a + b, 0) / numbers.length;
    const variance = numbers.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / numbers.length;
    return Math.sqrt(variance);
  }

  // Specific signal analysis methods
  private static analyzeClickFrustration(interaction: Partial<IInteractionSignal>): number {
    return 0; // Placeholder
  }

  private static analyzeMovementFrustration(interaction: Partial<IInteractionSignal>): number {
    return 0; // Placeholder
  }

  private static analyzeKeyboardFrustration(interaction: Partial<IInteractionSignal>): number {
    return 0; // Placeholder
  }

  private static analyzeErrorFrustration(interaction: Partial<IInteractionSignal>): number {
    return 0.5; // Placeholder
  }
}