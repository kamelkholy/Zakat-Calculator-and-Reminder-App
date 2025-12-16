import mongoose, { Schema, Document, Types } from 'mongoose';
import { IZakatPayment, IAcquisitionDate } from './MoneyAsset';

export interface IStockAsset extends Document {
  userId: Types.ObjectId;
  name: string;
  companyName: string;
  symbol: string;
  numberOfShares: number;
  pricePerShare: number;
  currency: string;
  acquisitionDate: IAcquisitionDate;
  lastUpdated: Date;
  zakatPayments: IZakatPayment[];
}

const stockAssetSchema = new Schema<IStockAsset>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  symbol: {
    type: String,
    required: true
  },
  numberOfShares: {
    type: Number,
    required: true
  },
  pricePerShare: {
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

stockAssetSchema.index({ userId: 1 });
stockAssetSchema.index({ symbol: 1 });

export default mongoose.model<IStockAsset>('StockAsset', stockAssetSchema);
