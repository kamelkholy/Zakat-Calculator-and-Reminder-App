import { Reminder, ReminderStatus, ReminderType } from '../Entities/Reminder';

/**
 * IReminderRepository - Repository interface for Reminder persistence
 */
export interface IReminderRepository {
  /**
   * Find reminder by ID
   */
  findById(id: string): Promise<Reminder | null>;

  /**
   * Find all reminders for a user
   */
  findByUserId(userId: string): Promise<Reminder[]>;

  /**
   * Find reminders by status
   */
  findByUserIdAndStatus(userId: string, status: ReminderStatus): Promise<Reminder[]>;

  /**
   * Find reminders by type
   */
  findByUserIdAndType(userId: string, type: ReminderType): Promise<Reminder[]>;

  /**
   * Find due reminders (ready to be sent)
   */
  findDueReminders(currentDate: Date): Promise<Reminder[]>;

  /**
   * Save a new reminder
   */
  save(reminder: Reminder): Promise<void>;

  /**
   * Update an existing reminder
   */
  update(reminder: Reminder): Promise<void>;

  /**
   * Delete a reminder
   */
  delete(id: string): Promise<void>;

  /**
   * Delete all reminders for a user
   */
  deleteByUserId(userId: string): Promise<void>;

  /**
   * Delete all reminders for an asset
   */
  deleteByAssetId(assetId: string): Promise<void>;
}
