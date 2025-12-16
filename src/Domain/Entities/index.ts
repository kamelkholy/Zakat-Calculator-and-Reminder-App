// Independent Asset entities - each with its own table
export { MoneyAsset } from './MoneyAsset';
export { StockAsset } from './StockAsset';
export { PreciousMetalAsset } from './PreciousMetalAsset';

// ZakatPaymentRecord type (identical across all asset types)
export type { ZakatPaymentRecord } from './MoneyAsset';

// Precious metal types and enums
export { GoldKarat, SilverPurity, WeightUnit, OUNCE_TO_GRAMS } from './PreciousMetalTypes';

// Valuation method enum (if needed elsewhere)
export enum ValuationMethod {
  MARKET_APPRAISAL = 'MARKET_APPRAISAL',
  TAX_ASSESSMENT = 'TAX_ASSESSMENT',
  PROFESSIONAL_APPRAISAL = 'PROFESSIONAL_APPRAISAL',
  SELF_ESTIMATED = 'SELF_ESTIMATED',
}
