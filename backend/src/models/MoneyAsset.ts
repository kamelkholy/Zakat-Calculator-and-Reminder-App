import mongoose, { Schema, Document, Types } from 'mongoose';

export type MoneyAssetType = 
  | 'CASH' 
  | 'BANK_ACCOUNT' 
  | 'BONDS' 
  | 'MUTUAL_FUNDS' 
  | 'BUSINESS_INVENTORY' 
  | 'PROPERTY' 
  | 'RECEIVABLE_DEBTS';

export interface IZakatPayment {
  hijriYear: number;
  paidDate: Date;
  amount: number;
}

export interface IAcquisitionDate {
  hijriYear: number;
  hijriMonth: number;
  hijriDay: number;
  gregorianDate: Date;
}

export interface IMoneyAsset extends Document {
  userId: Types.ObjectId;
  name: string;
  assetType: MoneyAssetType;
  amount: number;
  currency: string;
  acquisitionDate: IAcquisitionDate;
  lastUpdated: Date;
  zakatPayments: IZakatPayment[];
}

const moneyAssetSchema = new Schema<IMoneyAsset>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  assetType: {
    type: String,
    enum: ['CASH', 'BANK_ACCOUNT', 'BONDS', 'MUTUAL_FUNDS', 'BUSINESS_INVENTORY', 'PROPERTY', 'RECEIVABLE_DEBTS'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'USD'
  },
  acquisitionDate: {
    hijriYear: Number,
    hijriMonth: Number,
    hijriDay: Number,
    gregorianDate: Date
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  zakatPayments: [{
    hijriYear: Number,
    paidDate: Date,
    amount: Number
  }]
});

moneyAssetSchema.index({ userId: 1 });

export default mongoose.model<IMoneyAsset>('MoneyAsset', moneyAssetSchema);
