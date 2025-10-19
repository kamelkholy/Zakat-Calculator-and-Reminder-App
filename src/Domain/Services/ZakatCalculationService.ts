import { Money } from '../ValueObjects/Money';
import { Asset } from '../Entities/Asset';
import { Liability } from '../Entities/Liability';
import { HijriDate } from '../ValueObjects/HijriDate';

/**
 * ZakatCalculationService - Domain service for calculating zakat obligations
 */
export class ZakatCalculationService {
  private readonly ZAKAT_RATE = 2.5; // 2.5% zakat rate

  /**
   * Calculate zakat on a single asset
   */
  calculateAssetZakat(asset: Asset): Money {
    if (!asset.isZakatable()) {
      return Money.zero(asset.currentValue.currency);
    }

    return asset.currentValue.percentage(this.ZAKAT_RATE);
  }

  /**
   * Calculate total zakatable wealth from all assets
   */
  calculateTotalZakatableWealth(
    assets: Asset[],
    liabilities: Liability[]
  ): Money {
    if (assets.length === 0) {
      throw new Error('No assets provided');
    }

    const currency = assets[0].currentValue.currency;

    // Sum all zakatable assets
    let totalWealth = Money.zero(currency);
    for (const asset of assets) {
      if (asset.isZakatable()) {
        totalWealth = totalWealth.add(asset.currentValue);
      }
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
      if (asset.isZakatable() && asset.hasCompletedHawl(currentDate)) {
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
