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
 * Conversion constant: 1 troy ounce = 28.3495 grams
 */
export const OUNCE_TO_GRAMS = 28.3495;
