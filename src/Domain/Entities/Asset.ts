import { AssetType } from '../ValueObjects/AssetType';
import { Money } from '../ValueObjects/Money';
import { HijriDate } from '../ValueObjects/HijriDate';

/**
 * Represents zakat payment record for a specific Hijri year
 */
export interface ZakatPaymentRecord {
  hijriYear: number;
  paidDate: Date;
  amount: Money;
}

/**
 * Gold karat types with their purity percentages
 */
export enum GoldKarat {
  K24 = 100,    // 24 karat - 99.9% pure
  K22 = 91.67,  // 22 karat - 91.67% pure
  K21 = 87.5,   // 21 karat - 87.5% pure
  K18 = 75,     // 18 karat - 75% pure
  K14 = 58.33,  // 14 karat - 58.33% pure
  K10 = 41.67,  // 10 karat - 41.67% pure
}

/**
 * Silver purity types
 */
export enum SilverPurity {
  FINE = 99.9,      // Fine silver - 99.9% pure
  STERLING = 92.5,  // Sterling silver - 92.5% pure
  BRITANNIA = 95.84, // Britannia silver - 95.84% pure
  COIN = 90,        // Coin silver - 90% pure
}

/**
 * Weight unit enumeration
 */
export enum WeightUnit {
  GRAMS = 'GRAMS',
  OUNCES = 'OUNCES',
}

/**
 * Property valuation method enumeration
 */
export enum ValuationMethod {
  MARKET_APPRAISAL = 'MARKET_APPRAISAL',
  TAX_ASSESSMENT = 'TAX_ASSESSMENT',
  PROFESSIONAL_APPRAISAL = 'PROFESSIONAL_APPRAISAL',
  SELF_ESTIMATED = 'SELF_ESTIMATED',
}

/**
 * Conversion constant: 1 troy ounce = 28.3495 grams
 */
const OUNCE_TO_GRAMS = 28.3495;

/**
 * Revaluation period in days (1 year)
 */
const REVALUATION_PERIOD_DAYS = 365;

/**
 * Base Asset Entity - Abstract class for all zakatable assets
 * Implements common zakat tracking and hawl calculation logic
 */
export abstract class Asset {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly type: AssetType,
    protected _currentValue: Money,
    public readonly acquisitionDate: HijriDate,
    public readonly description: string,
    protected _lastUpdated: Date,
    protected _zakatPaymentHistory: ZakatPaymentRecord[] = []
  ) {}

  // Getters
  get currentValue(): Money {
    return this._currentValue;
  }

  get lastUpdated(): Date {
    return this._lastUpdated;
  }

  get zakatPaymentHistory(): ZakatPaymentRecord[] {
    return [...this._zakatPaymentHistory];
  }

  // Value Management
  protected updateValue(newValue: Money): void {
    this._currentValue = newValue;
    this._lastUpdated = new Date();
  }

  // Zakat Payment Tracking
  markZakatAsPaid(hijriYear: number, amount: Money, paidDate: Date = new Date()): void {
    this.validateZakatNotAlreadyPaid(hijriYear);
    
    this._zakatPaymentHistory.push({
      hijriYear,
      paidDate,
      amount,
    });
  }

  isZakatPaidForYear(hijriYear: number): boolean {
    return this._zakatPaymentHistory.some(
      record => record.hijriYear === hijriYear
    );
  }

  getZakatPaymentForYear(hijriYear: number): ZakatPaymentRecord | undefined {
    return this._zakatPaymentHistory.find(
      record => record.hijriYear === hijriYear
    );
  }

  resetZakatStatusForYear(hijriYear: number): void {
    this._zakatPaymentHistory = this._zakatPaymentHistory.filter(
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
      this.type.isZakatable &&
      this.hasCompletedHawl(currentDate) &&
      !this.isZakatPaidForYear(hijriYear)
    );
  }

  isZakatable(): boolean {
    return this.type.isZakatable;
  }

  // Private Helpers
  private validateZakatNotAlreadyPaid(hijriYear: number): void {
    if (this.isZakatPaidForYear(hijriYear)) {
      throw new Error(`Zakat already paid for Hijri year ${hijriYear}`);
    }
  }

  // Abstract Methods
  abstract getZakatableValue(): Money;
}

/**
 * MoneyAsset - For cash, bank accounts, and other money-valued assets
 * Direct monetary value with straightforward valuation
 */
export class MoneyAsset extends Asset {
  private static readonly VALID_TYPES = [
    'CASH',
    'BONDS',
    'MUTUAL_FUNDS',
    'BUSINESS_INVENTORY',
    'BUSINESS_ASSETS',
    'RECEIVABLE_DEBTS',
  ];

  constructor(
    id: string,
    userId: string,
    type: AssetType,
    currentValue: Money,
    acquisitionDate: HijriDate,
    description: string,
    lastUpdated: Date = new Date(),
    zakatPaymentHistory: ZakatPaymentRecord[] = []
  ) {
    super(id, userId, type, currentValue, acquisitionDate, description, lastUpdated, zakatPaymentHistory);
    this.validateAssetType(type);
  }

  getZakatableValue(): Money {
    return this._currentValue;
  }

  private validateAssetType(type: AssetType): void {
    if (!MoneyAsset.VALID_TYPES.includes(type.type)) {
      throw new Error(`Invalid type for MoneyAsset: ${type.type}. Expected one of: ${MoneyAsset.VALID_TYPES.join(', ')}`);
    }
  }
}

/**
 * StockAsset - For stock/share holdings
 * Tracks shares quantity, price, and symbol with automatic value calculation
 */
export class StockAsset extends Asset {
  constructor(
    id: string,
    userId: string,
    currentValue: Money,
    acquisitionDate: HijriDate,
    description: string,
    private _numberOfShares: number,
    private _pricePerShare: Money,
    private _symbol: string,
    lastUpdated: Date = new Date(),
    zakatPaymentHistory: ZakatPaymentRecord[] = []
  ) {
    super(
      id,
      userId,
      AssetType.stocks(),
      currentValue,
      acquisitionDate,
      description,
      lastUpdated,
      zakatPaymentHistory
    );
  }

  // Getters
  get numberOfShares(): number {
    return this._numberOfShares;
  }

  get pricePerShare(): Money {
    return this._pricePerShare;
  }

  get symbol(): string {
    return this._symbol;
  }

  // Stock Management
  updateStockPrice(newPricePerShare: Money): void {
    this._pricePerShare = newPricePerShare;
    this.recalculateTotalValue();
  }

  updateShares(newNumberOfShares: number): void {
    this._numberOfShares = newNumberOfShares;
    this.recalculateTotalValue();
  }

  getZakatableValue(): Money {
    return this._currentValue;
  }

  // Private Helpers
  private recalculateTotalValue(): void {
    const totalValue = new Money(
      this._numberOfShares * this._pricePerShare.amount,
      this._pricePerShare.currency
    );
    this.updateValue(totalValue);
  }
}

/**
 * PreciousMetalAsset - For gold and silver
 * Tracks weight with karat/purity specifications and market-based valuation
 */
export class PreciousMetalAsset extends Asset {
  constructor(
    id: string,
    userId: string,
    type: AssetType,
    currentValue: Money,
    acquisitionDate: HijriDate,
    description: string,
    private _weight: number,
    private _weightUnit: WeightUnit,
    private _karat?: GoldKarat,
    private _silverPurity?: SilverPurity,
    lastUpdated: Date = new Date(),
    zakatPaymentHistory: ZakatPaymentRecord[] = []
  ) {
    super(id, userId, type, currentValue, acquisitionDate, description, lastUpdated, zakatPaymentHistory);
    this.validatePreciousMetalType(type);
    this.validatePuritySpecification(type);
  }

  // Getters
  get weight(): number {
    return this._weight;
  }

  get weightUnit(): WeightUnit {
    return this._weightUnit;
  }

  get karat(): GoldKarat | undefined {
    return this._karat;
  }

  get silverPurity(): SilverPurity | undefined {
    return this._silverPurity;
  }

  get purity(): number {
    return this._karat ?? this._silverPurity ?? 100;
  }

  // Weight Conversion
  getWeightInGrams(): number {
    return this._weightUnit === WeightUnit.GRAMS
      ? this._weight
      : this._weight * OUNCE_TO_GRAMS;
  }

  // Market Price Update
  updateValueFromMarketPrice(pricePerGram: Money): void {
    const totalWeight = this.getWeightInGrams();
    const totalValue = new Money(
      totalWeight * pricePerGram.amount,
      pricePerGram.currency
    );
    this.updateValue(totalValue);
  }

  getZakatableValue(): Money {
    return this._currentValue;
  }

  // Private Validation
  private validatePreciousMetalType(type: AssetType): void {
    if (!['GOLD', 'SILVER'].includes(type.type)) {
      throw new Error(`Invalid type for PreciousMetalAsset: ${type.type}. Expected GOLD or SILVER.`);
    }
  }

  private validatePuritySpecification(type: AssetType): void {
    const isGold = type.type === 'GOLD';
    const isSilver = type.type === 'SILVER';

    if (isGold && this._karat === undefined) {
      throw new Error('Gold karat must be specified for gold assets');
    }

    if (isSilver && this._silverPurity === undefined) {
      throw new Error('Silver purity must be specified for silver assets');
    }

    if (isGold && this._silverPurity !== undefined) {
      throw new Error('Cannot specify silver purity for gold asset');
    }

    if (isSilver && this._karat !== undefined) {
      throw new Error('Cannot specify gold karat for silver asset');
    }
  }
}

/**
 * PropertyAsset - For investment real estate
 * Requires periodic valuation with tracking of appraisal method and date
 */
export class PropertyAsset extends Asset {
  constructor(
    id: string,
    userId: string,
    currentValue: Money,
    acquisitionDate: HijriDate,
    description: string,
    private _address: string,
    private _lastValuationDate: Date,
    private _valuationMethod: ValuationMethod,
    lastUpdated: Date = new Date(),
    zakatPaymentHistory: ZakatPaymentRecord[] = []
  ) {
    super(
      id,
      userId,
      AssetType.investmentRealEstate(),
      currentValue,
      acquisitionDate,
      description,
      lastUpdated,
      zakatPaymentHistory
    );
  }

  // Getters
  get address(): string {
    return this._address;
  }

  get lastValuationDate(): Date {
    return this._lastValuationDate;
  }

  get valuationMethod(): ValuationMethod {
    return this._valuationMethod;
  }

  // Valuation Management
  needsRevaluation(): boolean {
    const daysSinceValuation = this.getDaysSinceValuation();
    return daysSinceValuation > REVALUATION_PERIOD_DAYS;
  }

  updateValuation(
    newValue: Money,
    valuationMethod: ValuationMethod,
    valuationDate: Date = new Date()
  ): void {
    this._lastValuationDate = valuationDate;
    this._valuationMethod = valuationMethod;
    this.updateValue(newValue);
  }

  getZakatableValue(): Money {
    if (this.needsRevaluation()) {
      console.warn(
        `Property ${this.id} needs revaluation. Last valuation: ${this._lastValuationDate.toDateString()}`
      );
    }
    return this._currentValue;
  }

  // Private Helpers
  private getDaysSinceValuation(): number {
    const currentTime = new Date().getTime();
    const valuationTime = this._lastValuationDate.getTime();
    const timeDiff = currentTime - valuationTime;
    return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  }
}
