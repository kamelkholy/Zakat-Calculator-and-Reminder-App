import { Asset } from '../Entities/Asset';
import { Liability } from '../Entities/Liability';
import { User } from '../Entities/User';
import { Money } from '../ValueObjects/Money';

/**
 * UserPortfolio Aggregate - Represents a user's complete financial portfolio
 * This is the aggregate root for managing assets, liabilities, and user data
 */
export class UserPortfolio {
  private _assets: Map<string, Asset>;
  private _liabilities: Map<string, Liability>;

  constructor(
    private readonly _user: User,
    assets: Asset[] = [],
    liabilities: Liability[] = []
  ) {
    this._assets = new Map(assets.map((a) => [a.id, a]));
    this._liabilities = new Map(liabilities.map((l) => [l.id, l]));
  }

  get user(): User {
    return this._user;
  }

  get assets(): Asset[] {
    return Array.from(this._assets.values());
  }

  get liabilities(): Liability[] {
    return Array.from(this._liabilities.values());
  }

  /**
   * Add a new asset to the portfolio
   */
  addAsset(asset: Asset): void {
    if (asset.userId !== this._user.id) {
      throw new Error('Asset does not belong to this user');
    }
    if (this._assets.has(asset.id)) {
      throw new Error('Asset already exists in portfolio');
    }
    this._assets.set(asset.id, asset);
  }

  /**
   * Remove an asset from the portfolio
   */
  removeAsset(assetId: string): void {
    if (!this._assets.has(assetId)) {
      throw new Error('Asset not found in portfolio');
    }
    this._assets.delete(assetId);
  }

  /**
   * Update an existing asset
   */
  updateAsset(assetId: string, newValue: Money): void {
    const asset = this._assets.get(assetId);
    if (!asset) {
      throw new Error('Asset not found in portfolio');
    }
    asset.updateValue(newValue);
  }

  /**
   * Get a specific asset by ID
   */
  getAsset(assetId: string): Asset | undefined {
    return this._assets.get(assetId);
  }

  /**
   * Add a new liability to the portfolio
   */
  addLiability(liability: Liability): void {
    if (liability.userId !== this._user.id) {
      throw new Error('Liability does not belong to this user');
    }
    if (this._liabilities.has(liability.id)) {
      throw new Error('Liability already exists in portfolio');
    }
    this._liabilities.set(liability.id, liability);
  }

  /**
   * Remove a liability from the portfolio
   */
  removeLiability(liabilityId: string): void {
    if (!this._liabilities.has(liabilityId)) {
      throw new Error('Liability not found in portfolio');
    }
    this._liabilities.delete(liabilityId);
  }

  /**
   * Update an existing liability
   */
  updateLiability(liabilityId: string, newAmount: Money): void {
    const liability = this._liabilities.get(liabilityId);
    if (!liability) {
      throw new Error('Liability not found in portfolio');
    }
    liability.updateAmount(newAmount);
  }

  /**
   * Get a specific liability by ID
   */
  getLiability(liabilityId: string): Liability | undefined {
    return this._liabilities.get(liabilityId);
  }

  /**
   * Calculate total asset value
   */
  calculateTotalAssetValue(): Money {
    if (this._assets.size === 0) {
      return Money.zero(this._user.currency.code);
    }

    let total = Money.zero(this._user.currency.code);
    for (const asset of this._assets.values()) {
      total = total.add(asset.currentValue);
    }
    return total;
  }

  /**
   * Calculate total liability amount
   */
  calculateTotalLiabilities(): Money {
    if (this._liabilities.size === 0) {
      return Money.zero(this._user.currency.code);
    }

    let total = Money.zero(this._user.currency.code);
    for (const liability of this._liabilities.values()) {
      total = total.add(liability.amount);
    }
    return total;
  }

  /**
   * Calculate net wealth (assets - liabilities)
   */
  calculateNetWealth(): Money {
    const totalAssets = this.calculateTotalAssetValue();
    const totalLiabilities = this.calculateTotalLiabilities();
    return totalAssets.subtract(totalLiabilities);
  }

  /**
   * Get all zakatable assets
   */
  getZakatableAssets(): Asset[] {
    return this.assets.filter((asset) => asset.isZakatable());
  }

  /**
   * Get assets by type
   */
  getAssetsByType(type: string): Asset[] {
    return this.assets.filter((asset) => asset.type.type === type);
  }

  /**
   * Mark all eligible assets' zakat as paid
   */
  markAllZakatAsPaid(): void {
    for (const asset of this._assets.values()) {
      if (asset.isZakatable()) {
        asset.markZakatAsPaid();
      }
    }
  }

  /**
   * Reset zakat status for all assets (for new hawl cycle)
   */
  resetAllZakatStatus(): void {
    for (const asset of this._assets.values()) {
      asset.resetZakatStatus();
    }
  }
}
