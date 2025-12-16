import { Money } from '../ValueObjects/Money';
import { HijriDate } from '../ValueObjects/HijriDate';
import { GoldKarat, SilverPurity, WeightUnit, OUNCE_TO_GRAMS } from './PreciousMetalTypes';

/**
 * Represents zakat payment record for a specific Hijri year
 */
export interface ZakatPaymentRecord {
  hijriYear: number;
  paidDate: Date;
}

/**
 * PreciousMetalAsset - For gold and silver
 * Tracks weight with karat/purity specifications
 * Value should be calculated using current market prices from external API
 * Independent entity with its own table
 */
export class PreciousMetalAsset {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly acquisitionDate: HijriDate,
    public readonly name: string,
    public readonly metalType: 'GOLD' | 'SILVER',
    public weight: number,
    public weightUnit: WeightUnit,
    public karat?: GoldKarat,
    public silverPurity?: SilverPurity,
    public lastUpdated: Date = new Date(),
    public zakatPaymentHistory: ZakatPaymentRecord[] = []
  ) {
    this.validatePuritySpecification(metalType);
  }

  get purity(): number {
    return this.karat ?? this.silverPurity ?? 100;
  }

  // Weight Conversion
  getWeightInGrams(): number {
    return this.weightUnit === WeightUnit.GRAMS
      ? this.weight
      : this.weight * OUNCE_TO_GRAMS;
  }

  // Weight Management
  updateWeight(newWeight: number, weightUnit: WeightUnit): void {
    this.weight = newWeight;
    this.weightUnit = weightUnit;
    this.lastUpdated = new Date();
  }

  // Value calculation using external market price
  // Note: This method requires current market price to be passed in
  calculateValue(pricePerGram: Money): Money {
    const totalWeight = this.getWeightInGrams();
    const pureWeight = (totalWeight * this.purity) / 100;
    return new Money(
      pureWeight * pricePerGram.amount,
      pricePerGram.currency
    );
  }

  getZakatableValue(pricePerGram: Money): Money {
    return this.calculateValue(pricePerGram);
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

  // Private Validation
  private validatePuritySpecification(metalType: 'GOLD' | 'SILVER'): void {
    const isGold = metalType === 'GOLD';
    const isSilver = metalType === 'SILVER';

    if (isGold && this.karat === undefined) {
      throw new Error('Gold karat must be specified for gold assets');
    }

    if (isSilver && this.silverPurity === undefined) {
      throw new Error('Silver purity must be specified for silver assets');
    }

    if (isGold && this.silverPurity !== undefined) {
      throw new Error('Cannot specify silver purity for gold asset');
    }

    if (isSilver && this.karat !== undefined) {
      throw new Error('Cannot specify gold karat for silver asset');
    }
  }

  private validateZakatNotAlreadyPaid(hijriYear: number): void {
    if (this.isZakatPaidForYear(hijriYear)) {
      throw new Error(`Zakat already paid for Hijri year ${hijriYear}`);
    }
  }
}
