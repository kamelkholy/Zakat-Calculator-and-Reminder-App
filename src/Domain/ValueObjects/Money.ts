/**
 * Money Value Object - Represents a monetary value with currency
 */
export class Money {
  private readonly _amount: number;
  private readonly _currency: string;

  constructor(amount: number, currency: string) {
    if (amount < 0) {
      throw new Error('Amount cannot be negative');
    }
    this._amount = amount;
    this._currency = currency.toUpperCase();
  }

  get amount(): number {
    return this._amount;
  }

  get currency(): string {
    return this._currency;
  }

  /**
   * Add two Money objects (must be same currency)
   */
  add(other: Money): Money {
    this.ensureSameCurrency(other);
    return new Money(this._amount + other._amount, this._currency);
  }

  /**
   * Subtract two Money objects (must be same currency)
   */
  subtract(other: Money): Money {
    this.ensureSameCurrency(other);
    const result = this._amount - other._amount;
    if (result < 0) {
      throw new Error('Result cannot be negative');
    }
    return new Money(result, this._currency);
  }

  /**
   * Multiply money by a factor
   */
  multiply(factor: number): Money {
    if (factor < 0) {
      throw new Error('Factor cannot be negative');
    }
    return new Money(this._amount * factor, this._currency);
  }

  /**
   * Calculate percentage of money
   */
  percentage(percent: number): Money {
    if (percent < 0 || percent > 100) {
      throw new Error('Percentage must be between 0 and 100');
    }
    return new Money((this._amount * percent) / 100, this._currency);
  }

  /**
   * Compare if this money is greater than another
   */
  isGreaterThan(other: Money): boolean {
    this.ensureSameCurrency(other);
    return this._amount > other._amount;
  }

  /**
   * Compare if this money is greater than or equal to another
   */
  isGreaterThanOrEqual(other: Money): boolean {
    this.ensureSameCurrency(other);
    return this._amount >= other._amount;
  }

  /**
   * Compare if this money is equal to another
   */
  equals(other: Money): boolean {
    return this._amount === other._amount && this._currency === other._currency;
  }

  /**
   * Convert to string representation
   */
  toString(): string {
    return `${this._currency} ${this._amount.toFixed(2)}`;
  }

  private ensureSameCurrency(other: Money): void {
    if (this._currency !== other._currency) {
      throw new Error(`Currency mismatch: ${this._currency} vs ${other._currency}`);
    }
  }

  /**
   * Create Money from string format "USD 100.00"
   */
  static fromString(value: string): Money {
    const parts = value.trim().split(' ');
    if (parts.length !== 2) {
      throw new Error('Invalid money format. Expected "CURRENCY AMOUNT"');
    }
    return new Money(parseFloat(parts[1]), parts[0]);
  }

  /**
   * Zero money value
   */
  static zero(currency: string): Money {
    return new Money(0, currency);
  }
}
