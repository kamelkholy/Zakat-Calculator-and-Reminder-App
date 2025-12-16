import { Money } from '../ValueObjects/Money';
import { HijriDate } from '../ValueObjects/HijriDate';

/**
 * Represents zakat payment record for a specific Hijri year
 */
export interface ZakatPaymentRecord {
  hijriYear: number;
  paidDate: Date;
}

/**
 * MoneyAsset - For cash, bank accounts, property, and other money-valued assets
 * Direct monetary value with straightforward valuation
 * Independent entity with its own table
 */
export class MoneyAsset {
  private static readonly VALID_TYPES = [
    'CASH',
    'BONDS',
    'MUTUAL_FUNDS',
    'BUSINESS_INVENTORY',
    'BUSINESS_ASSETS',
    'RECEIVABLE_DEBTS',
    'PROPERTY',
  ];

  constructor(
    public readonly id: string,
    public readonly userId: string,
    public currentValue: Money,
    public readonly acquisitionDate: HijriDate,
    public readonly name: string,
    public readonly assetType: string,
    public lastUpdated: Date = new Date(),
    public zakatPaymentHistory: ZakatPaymentRecord[] = []
  ) {
    this.validateAssetType(assetType);
  }

  // Value Management
  updateValue(newValue: Money): void {
    this.currentValue = newValue;
    this.lastUpdated = new Date();
  }

  getZakatableValue(): Money {
    return this.currentValue;
  }

  // Zakat Payment Tracking
  recordZakatPayment(hijriYear: number, paidDate: Date = new Date()): void {
    this.validateZakatNotAlreadyPaid(hijriYear);
    
    this.zakatPaymentHistory.push({
      hijriYear,
      paidDate,
    });
  }

  isZakatPaidForYear(hijriYear: number): boolean {
    return this.zakatPaymentHistory.some(
      record => record.hijriYear === hijriYear
    );
  }

  getZakatPaymentForYear(hijriYear: number): ZakatPaymentRecord | undefined {
    return this.zakatPaymentHistory.find(
      record => record.hijriYear === hijriYear
    );
  }

  resetZakatStatusForYear(hijriYear: number): void {
    this.zakatPaymentHistory = this.zakatPaymentHistory.filter(
      record => record.hijriYear !== hijriYear
    );
  }

  // Hawl Calculation
  getHawlCompletionDate(): HijriDate {
    return this.acquisitionDate.addLunarYear(1);
  }

  hasCompletedHawl(currentDate: HijriDate): boolean {
    return currentDate.isAfterOrEqual(this.getHawlCompletionDate());
  }

  // Zakatable Status
  isZakatableForYear(hijriYear: number, currentDate: HijriDate): boolean {
    return (
      this.hasCompletedHawl(currentDate) &&
      !this.isZakatPaidForYear(hijriYear)
    );
  }

  // Private Helpers
  private validateAssetType(assetType: string): void {
    if (!MoneyAsset.VALID_TYPES.includes(assetType)) {
      throw new Error(`Invalid type for MoneyAsset: ${assetType}. Expected one of: ${MoneyAsset.VALID_TYPES.join(', ')}`);
    }
  }

  private validateZakatNotAlreadyPaid(hijriYear: number): void {
    if (this.isZakatPaidForYear(hijriYear)) {
      throw new Error(`Zakat already paid for Hijri year ${hijriYear}`);
    }
  }
}
