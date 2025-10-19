/**
 * HijriDate Value Object - Represents a date in the Islamic (Hijri) calendar
 */
export class HijriDate {
  constructor(
    public readonly year: number,
    public readonly month: number, // 1-12
    public readonly day: number // 1-29/30
  ) {
    this.validate();
  }

  private validate(): void {
    if (this.month < 1 || this.month > 12) {
      throw new Error('Month must be between 1 and 12');
    }
    if (this.day < 1 || this.day > 30) {
      throw new Error('Day must be between 1 and 30');
    }
    if (this.year < 1) {
      throw new Error('Year must be positive');
    }
  }

  /**
   * Add lunar years to this date
   */
  addLunarYear(years: number): HijriDate {
    return new HijriDate(this.year + years, this.month, this.day);
  }

  /**
   * Add lunar months to this date
   */
  addLunarMonths(months: number): HijriDate {
    const totalMonths = this.month + months;
    const newYear = this.year + Math.floor((totalMonths - 1) / 12);
    const newMonth = ((totalMonths - 1) % 12) + 1;
    return new HijriDate(newYear, newMonth, this.day);
  }

  /**
   * Check if this date is after another date
   */
  isAfter(other: HijriDate): boolean {
    if (this.year > other.year) return true;
    if (this.year < other.year) return false;
    if (this.month > other.month) return true;
    if (this.month < other.month) return false;
    return this.day > other.day;
  }

  /**
   * Check if this date is after or equal to another date
   */
  isAfterOrEqual(other: HijriDate): boolean {
    return this.isAfter(other) || this.equals(other);
  }

  /**
   * Check if this date is before another date
   */
  isBefore(other: HijriDate): boolean {
    return !this.isAfterOrEqual(other);
  }

  /**
   * Check if two dates are equal
   */
  equals(other: HijriDate): boolean {
    return (
      this.year === other.year &&
      this.month === other.month &&
      this.day === other.day
    );
  }

  /**
   * Convert to string in ISO-like format
   */
  toString(): string {
    const monthStr = this.month.toString().padStart(2, '0');
    const dayStr = this.day.toString().padStart(2, '0');
    return `${this.year}-${monthStr}-${dayStr}H`;
  }

  /**
   * Get month name in Arabic
   */
  getMonthName(): string {
    const months = [
      'Muharram',
      'Safar',
      'Rabi al-Awwal',
      'Rabi al-Thani',
      'Jumada al-Awwal',
      'Jumada al-Thani',
      'Rajab',
      'Shaban',
      'Ramadan',
      'Shawwal',
      'Dhul Qadah',
      'Dhul Hijjah',
    ];
    return months[this.month - 1];
  }

  /**
   * Create HijriDate from string format "1446-03-15H"
   */
  static fromString(value: string): HijriDate {
    const match = value.match(/^(\d+)-(\d{2})-(\d{2})H$/);
    if (!match) {
      throw new Error('Invalid Hijri date format. Expected "YYYY-MM-DDH"');
    }
    return new HijriDate(
      parseInt(match[1]),
      parseInt(match[2]),
      parseInt(match[3])
    );
  }

  /**
   * Get current Hijri date (approximate conversion from Gregorian)
   * Note: In production, use a proper Hijri calendar API
   */
  static today(): HijriDate {
    // Simplified conversion - should use proper API in production
    const gregorianDate = new Date();
    const gregorianYear = gregorianDate.getFullYear();
    const hijriYear = Math.floor((gregorianYear - 622) * 1.030684);
    const month = gregorianDate.getMonth() + 1;
    const day = gregorianDate.getDate();
    return new HijriDate(hijriYear, month, day);
  }
}
