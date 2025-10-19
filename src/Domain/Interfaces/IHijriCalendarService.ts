import { HijriDate } from '../ValueObjects/HijriDate';

/**
 * IHijriCalendarService - Interface for Hijri calendar operations
 */
export interface IHijriCalendarService {
  /**
   * Get current Hijri date
   */
  getCurrentHijriDate(): Promise<HijriDate>;

  /**
   * Convert Gregorian date to Hijri
   */
  convertToHijri(gregorianDate: Date): Promise<HijriDate>;

  /**
   * Convert Hijri date to Gregorian
   */
  convertToGregorian(hijriDate: HijriDate): Promise<Date>;

  /**
   * Get Ramadan start date for a given Hijri year
   */
  getRamadanStartDate(hijriYear: number): Promise<HijriDate>;

  /**
   * Calculate days between two Hijri dates
   */
  daysBetween(startDate: HijriDate, endDate: HijriDate): Promise<number>;
}
