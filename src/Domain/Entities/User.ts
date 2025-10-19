import { Currency } from '../ValueObjects/Currency';
import { NisabCalculationMethod } from '../ValueObjects/NisabCalculationMethod';

/**
 * User Entity - Represents a user of the Zakat Calculator app
 */
export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    private _name: string,
    private _currency: Currency,
    private _nisabMethod: NisabCalculationMethod,
    private _notificationPreferences: NotificationPreferences,
    private _createdAt: Date,
    private _lastLoginAt: Date
  ) {}

  get name(): string {
    return this._name;
  }

  get currency(): Currency {
    return this._currency;
  }

  get nisabMethod(): NisabCalculationMethod {
    return this._nisabMethod;
  }

  get notificationPreferences(): NotificationPreferences {
    return this._notificationPreferences;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get lastLoginAt(): Date {
    return this._lastLoginAt;
  }

  /**
   * Update user profile information
   */
  updateProfile(name: string, currency: Currency): void {
    this._name = name;
    this._currency = currency;
  }

  /**
   * Update nisab calculation method preference
   */
  updateNisabMethod(method: NisabCalculationMethod): void {
    this._nisabMethod = method;
  }

  /**
   * Update notification preferences
   */
  updateNotificationPreferences(preferences: NotificationPreferences): void {
    this._notificationPreferences = preferences;
  }

  /**
   * Record user login
   */
  recordLogin(): void {
    this._lastLoginAt = new Date();
  }
}

export interface NotificationPreferences {
  enablePushNotifications: boolean;
  enableEmailNotifications: boolean;
  enableSmsNotifications: boolean;
  reminderFrequency: 'weekly' | 'monthly' | 'quarterly';
  preRamadanReminder: boolean;
  hawlCompletionReminder: boolean;
  nisabThresholdAlert: boolean;
}
