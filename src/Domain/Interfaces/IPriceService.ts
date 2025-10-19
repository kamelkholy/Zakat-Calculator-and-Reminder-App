import { Money } from '../ValueObjects/Money';

/**
 * IPriceService - Interface for fetching market prices
 */
export interface IPriceService {
  /**
   * Get current gold price per gram
   */
  getGoldPrice(currency: string): Promise<Money>;

  /**
   * Get current silver price per gram
   */
  getSilverPrice(currency: string): Promise<Money>;

  /**
   * Get cryptocurrency price
   */
  getCryptoPrice(symbol: string, currency: string): Promise<Money>;

  /**
   * Get currency conversion rate
   */
  getConversionRate(fromCurrency: string, toCurrency: string): Promise<number>;

  /**
   * Get stock price
   */
  getStockPrice(symbol: string, currency: string): Promise<Money>;
}
