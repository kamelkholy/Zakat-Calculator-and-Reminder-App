/**
 * Currency Value Object - Represents a currency code (ISO 4217)
 */
export class Currency {
  private static readonly SUPPORTED_CURRENCIES = [
    'USD', // US Dollar
    'EUR', // Euro
    'GBP', // British Pound
    'SAR', // Saudi Riyal
    'AED', // UAE Dirham
    'EGP', // Egyptian Pound
    'TRY', // Turkish Lira
    'MYR', // Malaysian Ringgit
    'IDR', // Indonesian Rupiah
    'PKR', // Pakistani Rupee
    'BDT', // Bangladeshi Taka
    'INR', // Indian Rupee
    'CAD', // Canadian Dollar
    'AUD', // Australian Dollar
  ];

  constructor(private readonly _code: string) {
    const upperCode = _code.toUpperCase();
    if (!Currency.SUPPORTED_CURRENCIES.includes(upperCode)) {
      throw new Error(`Unsupported currency: ${_code}`);
    }
    this._code = upperCode;
  }

  get code(): string {
    return this._code;
  }

  get symbol(): string {
    const symbols: Record<string, string> = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      SAR: 'ر.س',
      AED: 'د.إ',
      EGP: 'ج.م',
      TRY: '₺',
      MYR: 'RM',
      IDR: 'Rp',
      PKR: '₨',
      BDT: '৳',
      INR: '₹',
      CAD: 'C$',
      AUD: 'A$',
    };
    return symbols[this._code] || this._code;
  }

  equals(other: Currency): boolean {
    return this._code === other._code;
  }

  toString(): string {
    return this._code;
  }

  /**
   * Check if this is a major currency
   */
  isMajorCurrency(): boolean {
    return ['USD', 'EUR', 'GBP'].includes(this._code);
  }

  /**
   * Check if this is an Islamic country currency
   */
  isIslamicCurrency(): boolean {
    return ['SAR', 'AED', 'EGP', 'TRY', 'MYR', 'IDR', 'PKR', 'BDT'].includes(
      this._code
    );
  }

  /**
   * Get all supported currencies
   */
  static getAllSupported(): Currency[] {
    return Currency.SUPPORTED_CURRENCIES.map((code) => new Currency(code));
  }

  /**
   * Create from string
   */
  static fromString(code: string): Currency {
    return new Currency(code);
  }

  // Factory methods for common currencies
  static usd(): Currency {
    return new Currency('USD');
  }

  static sar(): Currency {
    return new Currency('SAR');
  }

  static aed(): Currency {
    return new Currency('AED');
  }

  static eur(): Currency {
    return new Currency('EUR');
  }
}
