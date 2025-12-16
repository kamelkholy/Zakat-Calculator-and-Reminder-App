import { Request, Response } from 'express';
import Reminder, { IReminder } from '../models/Reminder';
import { Types } from 'mongoose';

/**
 * Get all reminders for a user
 */
export const getAllReminders = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = new Types.ObjectId((req as any).userId);
    const reminders = await Reminder.find({ userId }).sort({ scheduledDate: -1 });
    res.json(reminders);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get pending reminders
 */
export const getPendingReminders = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = new Types.ObjectId((req as any).userId);
    const reminders = await Reminder.find({
      userId,
      status: 'PENDING',
      scheduledDate: { $lte: new Date() }
    }).sort({ scheduledDate: 1 });
    res.json(reminders);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Create a hawl completion reminder
 */
export const createHawlReminder = async (
  userId: Types.ObjectId,
  assetId: Types.ObjectId,
  assetType: 'MoneyAsset' | 'StockAsset' | 'PreciousMetalAsset',
  acquisitionDate: Date
): Promise<IReminder> => {
  const oneHijriYear = 354 * 24 * 60 * 60 * 1000;
  const hawlCompletionDate = new Date(acquisitionDate.getTime() + oneHijriYear);

  const reminder = new Reminder({
    userId,
    type: 'HAWL_COMPLETION',
    assetId,
    assetType,
    scheduledDate: hawlCompletionDate,
    message: 'Your asset has completed one lunar year (hawl) and may now be eligible for zakat.'
  });

  return await reminder.save();
};

/**
 * Create Ramadan reminder
 */
export const createRamadanReminder = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = new Types.ObjectId((req as any).userId);
    const { ramadanStartDate, type } = req.body;

    if (!ramadanStartDate || !type) {
      res.status(400).json({ error: 'ramadanStartDate and type are required' });
      return;
    }

    let scheduledDate: Date;
    let message: string;

    const startDate = new Date(ramadanStartDate);

    switch (type) {
      case 'PRE_RAMADAN':
        scheduledDate = new Date(startDate.getTime() - (7 * 24 * 60 * 60 * 1000));
        message = 'Ramadan is approaching in one week. Consider calculating and preparing your zakat.';
        break;
      case 'RAMADAN_MIDDLE':
        scheduledDate = new Date(startDate.getTime() + (15 * 24 * 60 * 60 * 1000));
        message = 'Ramadan is halfway through. Have you calculated your zakat yet?';
        break;
      case 'RAMADAN_LAST_TEN_DAYS':
        scheduledDate = new Date(startDate.getTime() + (20 * 24 * 60 * 60 * 1000));
        message = 'We are in the blessed last ten days of Ramadan. Time to pay your zakat if you haven\'t already.';
        break;
      default:
        res.status(400).json({ error: 'Invalid reminder type' });
        return;
    }

    const reminder = new Reminder({
      userId,
      type,
      scheduledDate,
      message
    });

    await reminder.save();
    res.status(201).json(reminder);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Create nisab alert
 */
export const createNisabAlert = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = new Types.ObjectId((req as any).userId);
    const { type, currentWealth, nisabThreshold } = req.body;

    if (!type || currentWealth === undefined || nisabThreshold === undefined) {
      res.status(400).json({ error: 'type, currentWealth, and nisabThreshold are required' });
      return;
    }

    let message: string;

    if (type === 'NISAB_REACHED') {
      message = `Your total wealth has reached the nisab threshold (${nisabThreshold}). Your assets will become zakatable after completing one lunar year.`;
    } else {
      const percentage = ((currentWealth / nisabThreshold) * 100).toFixed(0);
      message = `Your wealth is at ${percentage}% of the nisab threshold. You're approaching zakatable wealth.`;
    }

    const reminder = new Reminder({
      userId,
      type,
      scheduledDate: new Date(),
      message
    });

    await reminder.save();
    res.status(201).json(reminder);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Mark reminder as sent
 */
export const markAsSent = async (req: Request, res: Response): Promise<void> => {
  try {
    const reminderId = new Types.ObjectId(req.params.id);
    const reminder = await Reminder.findByIdAndUpdate(
      reminderId,
      { status: 'SENT' },
      { new: true }
    );

    if (!reminder) {
      res.status(404).json({ error: 'Reminder not found' });
      return;
    }

    res.json(reminder);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Dismiss a reminder
 */
export const dismissReminder = async (req: Request, res: Response): Promise<void> => {
  try {
    const reminderId = new Types.ObjectId(req.params.id);
    const reminder = await Reminder.findByIdAndUpdate(
      reminderId,
      { status: 'DISMISSED' },
      { new: true }
    );

    if (!reminder) {
      res.status(404).json({ error: 'Reminder not found' });
      return;
    }

    res.json(reminder);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Delete a reminder
 */
export const deleteReminder = async (req: Request, res: Response): Promise<void> => {
  try {
    const reminderId = new Types.ObjectId(req.params.id);
    const reminder = await Reminder.findByIdAndDelete(reminderId);

    if (!reminder) {
      res.status(404).json({ error: 'Reminder not found' });
      return;
    }

    res.json({ message: 'Reminder deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
