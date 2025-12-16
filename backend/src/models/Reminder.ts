import mongoose, { Schema, Document, Types } from 'mongoose';

export type ReminderType = 
  | 'HAWL_COMPLETION' 
  | 'PRE_RAMADAN' 
  | 'RAMADAN_MIDDLE' 
  | 'RAMADAN_LAST_TEN_DAYS' 
  | 'NISAB_REACHED' 
  | 'NISAB_APPROACHING';

export type ReminderStatus = 'PENDING' | 'SENT' | 'DISMISSED';

export interface IReminder extends Document {
  userId: Types.ObjectId;
  type: ReminderType;
  assetId?: Types.ObjectId;
  assetType?: 'MoneyAsset' | 'StockAsset' | 'PreciousMetalAsset';
  scheduledDate: Date;
  status: ReminderStatus;
  message: string;
  createdAt: Date;
}

const reminderSchema = new Schema<IReminder>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: [
      'HAWL_COMPLETION',
      'PRE_RAMADAN',
      'RAMADAN_MIDDLE',
      'RAMADAN_LAST_TEN_DAYS',
      'NISAB_REACHED',
      'NISAB_APPROACHING'
    ],
    required: true
  },
  assetId: {
    type: Schema.Types.ObjectId,
    refPath: 'assetType'
  },
  assetType: {
    type: String,
    enum: ['MoneyAsset', 'StockAsset', 'PreciousMetalAsset']
  },
  scheduledDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['PENDING', 'SENT', 'DISMISSED'],
    default: 'PENDING'
  },
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

reminderSchema.index({ userId: 1, status: 1 });
reminderSchema.index({ scheduledDate: 1 });

export default mongoose.model<IReminder>('Reminder', reminderSchema);
