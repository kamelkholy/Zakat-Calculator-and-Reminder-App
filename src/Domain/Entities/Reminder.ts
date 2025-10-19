import { HijriDate } from '../ValueObjects/HijriDate';

/**
 * Reminder Entity - Represents a zakat reminder notification
 */
export class Reminder {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly assetId: string | null,
    public readonly type: ReminderType,
    private _scheduledDate: HijriDate,
    private _status: ReminderStatus,
    private _message: string,
    private _createdAt: Date,
    private _snoozedUntil?: Date
  ) {}

  get scheduledDate(): HijriDate {
    return this._scheduledDate;
  }

  get status(): ReminderStatus {
    return this._status;
  }

  get message(): string {
    return this._message;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get snoozedUntil(): Date | undefined {
    return this._snoozedUntil;
  }

  /**
   * Dismiss the reminder
   */
  dismiss(): void {
    this._status = ReminderStatus.Dismissed;
  }

  /**
   * Snooze the reminder until a specific date
   */
  snooze(until: Date): void {
    this._status = ReminderStatus.Snoozed;
    this._snoozedUntil = until;
  }

  /**
   * Mark the reminder as sent
   */
  markAsSent(): void {
    this._status = ReminderStatus.Sent;
  }

  /**
   * Reschedule the reminder to a new date
   */
  reschedule(newDate: HijriDate): void {
    this._scheduledDate = newDate;
    this._status = ReminderStatus.Pending;
    this._snoozedUntil = undefined;
  }

  /**
   * Check if the reminder is due to be sent
   */
  isDue(currentDate: Date): boolean {
    if (this._status !== ReminderStatus.Pending) {
      return false;
    }

    if (this._snoozedUntil && currentDate < this._snoozedUntil) {
      return false;
    }

    return true;
  }
}

export enum ReminderType {
  HawlCompletion = 'HAWL_COMPLETION',
  PreRamadan = 'PRE_RAMADAN',
  Custom = 'CUSTOM',
  NisabThreshold = 'NISAB_THRESHOLD',
}

export enum ReminderStatus {
  Pending = 'PENDING',
  Sent = 'SENT',
  Snoozed = 'SNOOZED',
  Dismissed = 'DISMISSED',
}
