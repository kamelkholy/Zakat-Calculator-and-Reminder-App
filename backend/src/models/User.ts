import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  currency: string;
  nisabMethod: 'GOLD' | 'SILVER';
  notificationPreferences: {
    hawlReminders: boolean;
    ramadanReminders: boolean;
    nisabAlerts: boolean;
  };
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  currency: {
    type: String,
    default: 'USD'
  },
  nisabMethod: {
    type: String,
    enum: ['GOLD', 'SILVER'],
    default: 'GOLD'
  },
  notificationPreferences: {
    hawlReminders: { type: Boolean, default: true },
    ramadanReminders: { type: Boolean, default: true },
    nisabAlerts: { type: Boolean, default: true }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model<IUser>('User', userSchema);
