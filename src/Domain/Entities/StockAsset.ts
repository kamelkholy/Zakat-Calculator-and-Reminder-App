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
 * StockAsset - For stock/share holdings
 * Tracks shares quantity, price, and symbol with automatic value calculation
 * Independent entity with its own table
 */
export class StockAsset {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public numberOfShares: number,
    public readonly acquisitionDate: HijriDate,
    public readonly name: string,
    public readonly companyName: string,
    private _pricePerShare: Money,
    private _symbol: string,
    public lastUpdated: Date = new Date(),
    public zakatPaymentHistory: ZakatPaymentRecord[] = []
  ) {}

  // Getters
  get pricePerShare(): Money {
    return this._pricePerShare;
  }

  get symbol(): string {
    return this._symbol;
  }

  // Stock Management
  updateStockPrice(newPricePerShare: Money): void {
    this._pricePerShare = newPricePerShare;
  }

  updateShares(newNumberOfShares: number): void {
    this.numberOfShares = newNumberOfShares;
  }

  updateValue(newValue: Money): void {
    // Calculate number of shares based on new value and current price
    this.numberOfShares = newValue.amount / this._pricePerShare.amount;
    this.lastUpdated = new Date();
  }

  getZakatableValue(): Money {
    return new Money(
      this.numberOfShares * this._pricePerShare.amount,
      this._pricePerShare.currency
    );
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
  private validateZakatNotAlreadyPaid(hijriYear: number): void {
    if (this.isZakatPaidForYear(hijriYear)) {
      throw new Error(`Zakat already paid for Hijri year ${hijriYear}`);
    }
  }
}
