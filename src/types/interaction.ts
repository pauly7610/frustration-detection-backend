export type InteractionSignalType = 
  | 'click' 
  | 'movement' 
  | 'keyboard' 
  | 'error'
  | 'scroll'
  | 'focus'
  | 'blur'
  | 'hover'
  | 'drag'
  | 'drop'
  | 'resize'
  | 'scroll'
  | 'focus'
  | 'signalType';

export interface InteractionDetails {
  x?: number;
  y?: number;
  target?: string;
  key?: string;
  message?: string;
  duration?: number;
  [key: string]: any;
}

export interface InteractionSignal {
  type: InteractionSignalType;
  timestamp: number;
  details: InteractionDetails;
}

export interface TrackedInteraction {
  userId: string;
  sessionId: string;
  signals: InteractionSignal[];
}

export interface FrustrationAnalysisResult {
  score: number;
  level: 'low' | 'medium' | 'high';
  insights: string[];
} 