import { Request, Response } from 'express';
import MoneyAsset from '../models/MoneyAsset';
import StockAsset from '../models/StockAsset';
import PreciousMetalAsset from '../models/PreciousMetalAsset';
import { Types } from 'mongoose';

/**
 * Get all assets for a user
 */
export const getAllAssets = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).userId;

    const moneyAssets = await MoneyAsset.find({ userId });
    const stockAssets = await StockAsset.find({ userId });
    const preciousMetalAssets = await PreciousMetalAsset.find({ userId });

    res.json({
      moneyAssets,
      stockAssets,
      preciousMetalAssets
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Create a money asset
 */
export const createMoneyAsset = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).userId;
    const assetData = {
      ...req.body,
      userId: new Types.ObjectId(userId)
    };

    const asset = new MoneyAsset(assetData);
    await asset.save();

    res.status(201).json(asset);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Create a stock asset
 */
export const createStockAsset = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).userId;
    const assetData = {
      ...req.body,
      userId: new Types.ObjectId(userId)
    };

    const asset = new StockAsset(assetData);
    await asset.save();

    res.status(201).json(asset);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Create a precious metal asset
 */
export const createPreciousMetalAsset = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).userId;
    const assetData = {
      ...req.body,
      userId: new Types.ObjectId(userId)
    };

    const asset = new PreciousMetalAsset(assetData);
    await asset.save();

    res.status(201).json(asset);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Update an asset
 */
export const updateAsset = async (req: Request, res: Response): Promise<void> => {
  try {
    const { type, id } = req.params;
    const userId = (req as any).userId;

    let asset;
    switch (type) {
      case 'money':
        asset = await MoneyAsset.findOneAndUpdate(
          { _id: id, userId },
          { ...req.body, lastUpdated: new Date() },
          { new: true, runValidators: true }
        );
        break;
      case 'stock':
        asset = await StockAsset.findOneAndUpdate(
          { _id: id, userId },
          { ...req.body, lastUpdated: new Date() },
          { new: true, runValidators: true }
        );
        break;
      case 'precious-metal':
        asset = await PreciousMetalAsset.findOneAndUpdate(
          { _id: id, userId },
          { ...req.body, lastUpdated: new Date() },
          { new: true, runValidators: true }
        );
        break;
      default:
        res.status(400).json({ error: 'Invalid asset type' });
        return;
    }

    if (!asset) {
      res.status(404).json({ error: 'Asset not found' });
      return;
    }

    res.json(asset);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Delete an asset
 */
export const deleteAsset = async (req: Request, res: Response): Promise<void> => {
  try {
    const { type, id } = req.params;
    const userId = (req as any).userId;

    let asset;
    switch (type) {
      case 'money':
        asset = await MoneyAsset.findOneAndDelete({ _id: id, userId });
        break;
      case 'stock':
        asset = await StockAsset.findOneAndDelete({ _id: id, userId });
        break;
      case 'precious-metal':
        asset = await PreciousMetalAsset.findOneAndDelete({ _id: id, userId });
        break;
      default:
        res.status(400).json({ error: 'Invalid asset type' });
        return;
    }

    if (!asset) {
      res.status(404).json({ error: 'Asset not found' });
      return;
    }

    res.json({ message: 'Asset deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
