import { AssetType } from '../ValueObjects/AssetType';
import { Money } from '../ValueObjects/Money';
import { HijriDate } from '../ValueObjects/HijriDate';

/**
 * Asset Entity - Represents a zakatable asset owned by a user
 */
export class Asset {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly type: AssetType,
    private _currentValue: Money,
    public readonly acquisitionDate: HijriDate,
    public readonly description: string,
    private _lastUpdated: Date,
    private _zakatPaidStatus: boolean = false
  ) {}

  get currentValue(): Money {
    return this._currentValue;
  }

  get lastUpdated(): Date {
    return this._lastUpdated;
  }

  get zakatPaidStatus(): boolean {
    return this._zakatPaidStatus;
  }

  /**
   * Update the current value of the asset
   */
  updateValue(newValue: Money): void {
    this._currentValue = newValue;
    this._lastUpdated = new Date();
  }

  /**
   * Mark zakat as paid for this asset
   */
  markZakatAsPaid(): void {
    this._zakatPaidStatus = true;
  }

  /**
   * Reset zakat paid status (for new hawl cycle)
   */
  resetZakatStatus(): void {
    this._zakatPaidStatus = false;
  }

  /**
   * Calculate the hawl completion date (one lunar year from acquisition)
   */
  getHawlCompletionDate(): HijriDate {
    return this.acquisitionDate.addLunarYear(1);
  }

  /**
   * Check if the asset has completed hawl (one lunar year)
   */
  hasCompletedHawl(currentDate: HijriDate): boolean {
    const completionDate = this.getHawlCompletionDate();
    return currentDate.isAfterOrEqual(completionDate);
  }

  /**
   * Check if the asset is zakatable (meets basic criteria)
   */
  isZakatable(): boolean {
    return this.type.isZakatable && !this._zakatPaidStatus;
  }
}
