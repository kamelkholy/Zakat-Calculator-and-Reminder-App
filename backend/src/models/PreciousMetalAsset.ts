import mongoose, { Schema, Document, Types } from 'mongoose';
import { IZakatPayment, IAcquisitionDate } from './MoneyAsset';

export type MetalType = 'GOLD' | 'SILVER';
export type WeightUnit = 'GRAMS' | 'OUNCES' | 'KILOGRAMS';

export interface IPreciousMetalAsset extends Document {
  userId: Types.ObjectId;
  name: string;
  metalType: MetalType;
  weight: number;
  weightUnit: WeightUnit;
  purity: number;
  acquisitionDate: IAcquisitionDate;
  lastUpdated: Date;
  zakatPayments: IZakatPayment[];
}

const preciousMetalAssetSchema = new Schema<IPreciousMetalAsset>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  metalType: {
    type: String,
    enum: ['GOLD', 'SILVER'],
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  weightUnit: {
    type: String,
    enum: ['GRAMS', 'OUNCES', 'KILOGRAMS'],
    default: 'GRAMS'
  },
  purity: {
    type: Number,
    required: true,
    min: 0,
    max: 100
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

preciousMetalAssetSchema.index({ userId: 1 });
preciousMetalAssetSchema.index({ metalType: 1 });

export default mongoose.model<IPreciousMetalAsset>('PreciousMetalAsset', preciousMetalAssetSchema);
