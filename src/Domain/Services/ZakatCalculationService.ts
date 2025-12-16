import { Money } from '../ValueObjects/Money';
import { MoneyAsset, StockAsset, PreciousMetalAsset } from '../Entities';
import { Liability } from '../Entities/Liability';
import { HijriDate } from '../ValueObjects/HijriDate';

/**
 * Union type for all asset types
 */
export type Asset = MoneyAsset | StockAsset | PreciousMetalAsset;

/**
 * ZakatCalculationService - Domain service for calculating zakat obligations
 */
export class ZakatCalculationService {
  private readonly ZAKAT_RATE = 2.5; // 2.5% zakat rate

  /**
   * Calculate zakat on a single asset
   */
  calculateAssetZakat(asset: Asset, pricePerGram?: Money): Money {
    let zakatableValue: Money;
    
    if (asset instanceof PreciousMetalAsset) {
      if (!pricePerGram) {
        throw new Error('Price per gram is required for precious metal assets');
      }
      zakatableValue = asset.getZakatableValue(pricePerGram);
    } else {
      zakatableValue = asset.getZakatableValue();
    }
    
    return zakatableValue.percentage(this.ZAKAT_RATE);
  }

  /**
   * Calculate total zakatable wealth from all assets
   * Note: PreciousMetalAssets are excluded as they require current market price
   */
  calculateTotalZakatableWealth(
    assets: Asset[],
    liabilities: Liability[]
  ): Money {
    if (assets.length === 0) {
      throw new Error('No assets provided');
    }

    // Find first non-precious-metal asset to get currency
    const firstNonMetalAsset = assets.find(
      a => a instanceof MoneyAsset || a instanceof StockAsset
    );
    
    if (!firstNonMetalAsset) {
      throw new Error('At least one MoneyAsset or StockAsset is required to determine currency');
    }

    const currency = (firstNonMetalAsset instanceof MoneyAsset 
      ? firstNonMetalAsset.currentValue 
      : firstNonMetalAsset.pricePerShare).currency;

    // Sum all zakatable assets
    let totalWealth = Money.zero(currency);
    for (const asset of assets) {
      let assetValue: Money;
      if (asset instanceof MoneyAsset) {
        assetValue = asset.getZakatableValue();
      } else if (asset instanceof StockAsset) {
        assetValue = asset.getZakatableValue();
      } else {
        // PreciousMetalAsset - skip if no price available
        // Should be calculated separately with market price
        continue;
      }
      totalWealth = totalWealth.add(assetValue);
    }

    // Deduct deductible liabilities
    for (const liability of liabilities) {
      if (liability.isDeductible()) {
        totalWealth = totalWealth.subtract(liability.amount);
      }
    }

    return totalWealth;
  }

  /**
   * Calculate total zakat due on all assets
   */
  calculateTotalZakat(
    assets: Asset[],
    liabilities: Liability[],
    nisabThreshold: Money,
    currentDate: HijriDate
  ): ZakatCalculationResult {
    const totalWealth = this.calculateTotalZakatableWealth(assets, liabilities);

    // Check if total wealth meets nisab
    if (!totalWealth.isGreaterThanOrEqual(nisabThreshold)) {
      return {
        totalWealth,
        nisabThreshold,
        isAboveNisab: false,
        zakatDue: Money.zero(totalWealth.currency),
        eligibleAssets: [],
        ineligibleAssets: assets,
      };
    }

    // Separate eligible and ineligible assets
    const eligibleAssets: Asset[] = [];
    const ineligibleAssets: Asset[] = [];

    for (const asset of assets) {
      if (asset.hasCompletedHawl(currentDate)) {
        eligibleAssets.push(asset);
      } else {
        ineligibleAssets.push(asset);
      }
    }

    // Calculate total zakat
    const zakatDue = totalWealth.percentage(this.ZAKAT_RATE);

    return {
      totalWealth,
      nisabThreshold,
      isAboveNisab: true,
      zakatDue,
      eligibleAssets,
      ineligibleAssets,
    };
  }

  /**
   * Calculate nisab threshold based on current market price
   */
  calculateNisab(
    pricePerGram: Money,
    gramsRequired: number
  ): Money {
    return pricePerGram.multiply(gramsRequired);
  }

  /**
   * Calculate days remaining until hawl completion
   */
  calculateDaysUntilHawl(
    acquisitionDate: HijriDate,
    currentDate: HijriDate
  ): number {
    const hawlCompletionDate = acquisitionDate.addLunarYear(1);
    
    if (currentDate.isAfterOrEqual(hawlCompletionDate)) {
      return 0;
    }

    // Approximate calculation - a lunar year is about 354 days
    const yearDiff = hawlCompletionDate.year - currentDate.year;
    const monthDiff = hawlCompletionDate.month - currentDate.month;
    const dayDiff = hawlCompletionDate.day - currentDate.day;

    return yearDiff * 354 + monthDiff * 29.5 + dayDiff;
  }
}

export interface ZakatCalculationResult {
  totalWealth: Money;
  nisabThreshold: Money;
  isAboveNisab: boolean;
  zakatDue: Money;
  eligibleAssets: Asset[];
  ineligibleAssets: Asset[];
}
