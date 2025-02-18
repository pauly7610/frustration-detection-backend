import mongoose, { Schema, Document } from 'mongoose';

export interface ISession extends Document {
  userId: string;
  startTime: Date;
  endTime?: Date;
  frustrationLevel?: number;
  interactions: Array<{
    type: string;
    timestamp: Date;
    details?: any;
  }>;
}

const SessionSchema: Schema = new Schema({
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  startTime: { 
    type: Date, 
    default: Date.now 
  },
  endTime: { 
    type: Date 
  },
  frustrationLevel: { 
    type: Number, 
    min: 0, 
    max: 10 
  },
  interactions: [{
    type: { 
      type: String, 
      required: true 
    },
    timestamp: { 
      type: Date, 
      default: Date.now 
    },
    details: { 
      type: Schema.Types.Mixed 
    }
  }]
});

export default mongoose.model<ISession>('Session', SessionSchema); 