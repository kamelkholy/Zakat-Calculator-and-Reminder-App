import { Request, Response } from 'express';
import MoneyAsset from '../models/MoneyAsset';
import StockAsset from '../models/StockAsset';
import PreciousMetalAsset from '../models/PreciousMetalAsset';
import User from '../models/User';
import { IMoneyAsset } from '../models/MoneyAsset';
import { IStockAsset } from '../models/StockAsset';
import { IPreciousMetalAsset } from '../models/PreciousMetalAsset';

// Constants
const ZAKAT_RATE = 0.025; // 2.5%
const GOLD_NISAB_GRAMS = 85;
const SILVER_NISAB_GRAMS = 595;

/**
 * Calculate nisab threshold
 */
const calculateNisabThreshold = async (
  method: 'GOLD' | 'SILVER',
  currency: string = 'USD'
): Promise<{ threshold: number; goldPrice?: number; silverPrice?: number }> => {
  const goldPrice = await getGoldPrice(currency);
  const silverPrice = await getSilverPrice(currency);

  const threshold = method === 'GOLD'
    ? GOLD_NISAB_GRAMS * goldPrice
    : SILVER_NISAB_GRAMS * silverPrice;

  return {
    threshold,
    goldPrice: method === 'GOLD' ? goldPrice : undefined,
    silverPrice: method === 'SILVER' ? silverPrice : undefined
  };
};

/**
 * Calculate total wealth
 */
const calculateTotalWealth = (
  moneyAssets: IMoneyAsset[],
  stockAssets: IStockAsset[],
  preciousMetalAssets: IPreciousMetalAsset[]
) => {
  const moneyTotal = moneyAssets
    .filter(asset => hasCompletedHawl(asset.acquisitionDate))
    .reduce((sum, asset) => sum + asset.amount, 0);

  const stockTotal = stockAssets
    .filter(asset => hasCompletedHawl(asset.acquisitionDate))
    .reduce((sum, asset) => sum + (asset.numberOfShares * asset.pricePerShare), 0);

  const metalTotal = preciousMetalAssets
    .filter(asset => hasCompletedHawl(asset.acquisitionDate))
    .reduce((sum, asset) => {
      const weightInGrams = convertToGrams(asset.weight, asset.weightUnit);
      const pureWeight = weightInGrams * (asset.purity / 100);
      return sum + pureWeight;
    }, 0);

  return {
    totalWealth: moneyTotal + stockTotal + metalTotal,
    breakdown: {
      moneyAssets: moneyTotal,
      stockAssets: stockTotal,
      preciousMetalAssets: metalTotal
    }
  };
};

/**
 * Check if asset has completed hawl (one lunar year)
 */
const hasCompletedHawl = (acquisitionDate: { gregorianDate?: Date }): boolean => {
  if (!acquisitionDate.gregorianDate) return false;

  const oneHijriYear = 354 * 24 * 60 * 60 * 1000; // 354 days in milliseconds
  const timeDiff = Date.now() - acquisitionDate.gregorianDate.getTime();
  return timeDiff >= oneHijriYear;
};

/**
 * Convert weight to grams
 */
const convertToGrams = (weight: number, unit: string): number => {
  switch (unit) {
    case 'OUNCES':
      return weight * 28.3495;
    case 'KILOGRAMS':
      return weight * 1000;
    default:
      return weight;
  }
};

/**
 * Get gold price (mock - replace with real API)
 */
const getGoldPrice = async (_currency: string): Promise<number> => {
  return 65; // USD per gram
};

/**
 * Get silver price (mock - replace with real API)
 */
const getSilverPrice = async (_currency: string): Promise<number> => {
  return 0.8; // USD per gram
};

/**
 * Get current nisab threshold
 */
export const getNisab = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).userId;
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const nisabResult = await calculateNisabThreshold(user.nisabMethod, user.currency);

    res.json({
      method: user.nisabMethod,
      threshold: nisabResult.threshold,
      currency: user.currency,
      goldPricePerGram: nisabResult.goldPrice,
      silverPricePerGram: nisabResult.silverPrice
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Calculate zakat for all user assets
 */
export const calculateZakat = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).userId;
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // Get all assets
    const moneyAssets = await MoneyAsset.find({ userId });
    const stockAssets = await StockAsset.find({ userId });
    const preciousMetalAssets = await PreciousMetalAsset.find({ userId });

    // Calculate total wealth
    const wealthResult = calculateTotalWealth(moneyAssets, stockAssets, preciousMetalAssets);

    // Get nisab threshold
    const nisabResult = await calculateNisabThreshold(user.nisabMethod, user.currency);

    // Calculate zakat
    const isZakatDue = wealthResult.totalWealth >= nisabResult.threshold;
    const zakatDue = isZakatDue ? wealthResult.totalWealth * ZAKAT_RATE : 0;

    res.json({
      zakatDue,
      totalWealth: wealthResult.totalWealth,
      nisabThreshold: nisabResult.threshold,
      currency: user.currency,
      isZakatDue,
      wealthBreakdown: wealthResult.breakdown,
      nisabMethod: user.nisabMethod
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Record zakat payment for an asset
 */
export const recordPayment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { type, assetId } = req.params;
    const userId = (req as any).userId;
    const { amount, hijriYear } = req.body;

    let asset;
    switch (type) {
      case 'money':
        asset = await MoneyAsset.findOne({ _id: assetId, userId });
        break;
      case 'stock':
        asset = await StockAsset.findOne({ _id: assetId, userId });
        break;
      case 'precious-metal':
        asset = await PreciousMetalAsset.findOne({ _id: assetId, userId });
        break;
      default:
        res.status(400).json({ error: 'Invalid asset type' });
        return;
    }

    if (!asset) {
      res.status(404).json({ error: 'Asset not found' });
      return;
    }

    // Add payment record
    asset.zakatPayments.push({
      hijriYear: hijriYear || new Date().getFullYear(),
      paidDate: new Date(),
      amount
    });

    await asset.save();

    res.json({
      message: 'Zakat payment recorded successfully',
      asset
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
