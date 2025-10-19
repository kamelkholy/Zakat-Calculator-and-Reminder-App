import { Reminder, ReminderType, ReminderStatus } from '../Entities/Reminder';
import { Asset } from '../Entities/Asset';
import { HijriDate } from '../ValueObjects/HijriDate';
import { User } from '../Entities/User';

/**
 * ReminderService - Domain service for managing zakat reminders
 */
export class ReminderService {
  /**
   * Create a hawl completion reminder for an asset
   */
  createHawlCompletionReminder(
    userId: string,
    asset: Asset,
    remindDaysBefore: number = 7
  ): Reminder {
    const hawlCompletionDate = asset.getHawlCompletionDate();
    const reminderDate = this.subtractDays(hawlCompletionDate, remindDaysBefore);

    const message = `Your ${asset.description} will complete its hawl on ${hawlCompletionDate.toString()}. Zakat may be due.`;

    return new Reminder(
      this.generateId(),
      userId,
      asset.id,
      ReminderType.HawlCompletion,
      reminderDate,
      ReminderStatus.Pending,
      message,
      new Date()
    );
  }

  /**
   * Create a pre-Ramadan reminder
   */
  createPreRamadanReminder(
    userId: string,
    ramadanStartDate: HijriDate,
    remindDaysBefore: number = 14
  ): Reminder {
    const reminderDate = this.subtractDays(ramadanStartDate, remindDaysBefore);

    const message = `Ramadan is approaching. Consider calculating and paying your zakat during this blessed month.`;

    return new Reminder(
      this.generateId(),
      userId,
      null,
      ReminderType.PreRamadan,
      reminderDate,
      ReminderStatus.Pending,
      message,
      new Date()
    );
  }

  /**
   * Create a custom reminder
   */
  createCustomReminder(
    userId: string,
    scheduledDate: HijriDate,
    message: string,
    assetId?: string
  ): Reminder {
    return new Reminder(
      this.generateId(),
      userId,
      assetId || null,
      ReminderType.Custom,
      scheduledDate,
      ReminderStatus.Pending,
      message,
      new Date()
    );
  }

  /**
   * Create a nisab threshold alert
   */
  createNisabThresholdAlert(
    userId: string,
    message: string
  ): Reminder {
    const currentDate = HijriDate.today();

    return new Reminder(
      this.generateId(),
      userId,
      null,
      ReminderType.NisabThreshold,
      currentDate,
      ReminderStatus.Pending,
      message,
      new Date()
    );
  }

  /**
   * Process reminders for a user based on their preferences
   */
  processUserReminders(
    user: User,
    assets: Asset[],
    currentDate: HijriDate
  ): Reminder[] {
    const reminders: Reminder[] = [];

    if (user.notificationPreferences.hawlCompletionReminder) {
      for (const asset of assets) {
        if (asset.isZakatable() && !asset.zakatPaidStatus) {
          const hawlDate = asset.getHawlCompletionDate();
          const daysUntil = this.calculateDaysUntil(currentDate, hawlDate);

          // Create reminder 7 days before hawl completion
          if (daysUntil <= 7 && daysUntil > 0) {
            reminders.push(this.createHawlCompletionReminder(user.id, asset));
          }
        }
      }
    }

    return reminders;
  }

  /**
   * Schedule recurring reminders based on frequency
   */
  scheduleRecurringReminders(
    userId: string,
    frequency: 'weekly' | 'monthly' | 'quarterly',
    startDate: HijriDate
  ): Reminder[] {
    const reminders: Reminder[] = [];
    const message = 'Reminder to review your zakat obligations.';

    let reminderDate = startDate;
    for (let i = 0; i < 4; i++) {
      // Create 4 reminders
      reminders.push(
        this.createCustomReminder(userId, reminderDate, message)
      );

      // Calculate next reminder date based on frequency
      switch (frequency) {
        case 'weekly':
          reminderDate = reminderDate.addLunarMonths(0); // Approximate weekly
          break;
        case 'monthly':
          reminderDate = reminderDate.addLunarMonths(1);
          break;
        case 'quarterly':
          reminderDate = reminderDate.addLunarMonths(3);
          break;
      }
    }

    return reminders;
  }

  private subtractDays(date: HijriDate, days: number): HijriDate {
    // Simplified - in production use proper calendar calculation
    const newDay = date.day - days;
    if (newDay > 0) {
      return new HijriDate(date.year, date.month, newDay);
    }
    // Handle month/year rollback
    const newMonth = date.month - 1 > 0 ? date.month - 1 : 12;
    const newYear = date.month - 1 > 0 ? date.year : date.year - 1;
    return new HijriDate(newYear, newMonth, 29 + newDay);
  }

  private calculateDaysUntil(from: HijriDate, to: HijriDate): number {
    // Simplified calculation
    const yearDiff = to.year - from.year;
    const monthDiff = to.month - from.month;
    const dayDiff = to.day - from.day;
    return yearDiff * 354 + monthDiff * 29.5 + dayDiff;
  }

  private generateId(): string {
    return `reminder-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
