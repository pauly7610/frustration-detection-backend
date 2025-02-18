import mongoose, { Schema, Document } from 'mongoose';

export interface IAlert extends Document {
  userId: string;
  sessionId: string;
  type: string;
  severity: number;
  description: string;
  timestamp: Date;
  resolved: boolean;
}

const AlertSchema: Schema = new Schema({
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  sessionId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Session', 
    required: true 
  },
  type: { 
    type: String, 
    required: true 
  },
  severity: { 
    type: Number, 
    required: true, 
    min: 1, 
    max: 10 
  },
  description: { 
    type: String 
  },
  timestamp: { 
    type: Date, 
    default: Date.now 
  },
  resolved: { 
    type: Boolean, 
    default: false 
  }
});

export default mongoose.model<IAlert>('Alert', AlertSchema); 