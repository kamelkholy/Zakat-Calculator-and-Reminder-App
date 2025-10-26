/**
 * AssetType Value Object - Represents the type of zakatable asset
 */
export class AssetType {
  private static readonly ZAKATABLE_TYPES = [
    'CASH',
    'GOLD',
    'SILVER',
    'STOCKS',
    'BONDS',
    'MUTUAL_FUNDS',
    'BUSINESS_INVENTORY',
    'BUSINESS_ASSETS',
    'INVESTMENT_REAL_ESTATE',
    'RECEIVABLE_DEBTS',
  ];

  constructor(private readonly _type: string) {
    if (!this.isValidType(_type)) {
      throw new Error(`Invalid asset type: ${_type}`);
    }
  }

  get type(): string {
    return this._type;
  }

  get isZakatable(): boolean {
    return AssetType.ZAKATABLE_TYPES.includes(this._type);
  }

  get displayName(): string {
    return this._type
      .split('_')
      .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
      .join(' ');
  }

  equals(other: AssetType): boolean {
    return this._type === other._type;
  }

  toString(): string {
    return this._type;
  }

  private isValidType(type: string): boolean {
    return AssetType.ZAKATABLE_TYPES.includes(type);
  }

  // Factory methods for common asset types
  static cash(): AssetType {
    return new AssetType('CASH');
  }

  static gold(): AssetType {
    return new AssetType('GOLD');
  }

  static silver(): AssetType {
    return new AssetType('SILVER');
  }

  static stocks(): AssetType {
    return new AssetType('STOCKS');
  }

  static businessInventory(): AssetType {
    return new AssetType('BUSINESS_INVENTORY');
  }

  static investmentRealEstate(): AssetType {
    return new AssetType('INVESTMENT_REAL_ESTATE');
  }

  static receivableDebts(): AssetType {
    return new AssetType('RECEIVABLE_DEBTS');
  }

  /**
   * Get all zakatable asset types
   */
  static getAllZakatableTypes(): AssetType[] {
    return AssetType.ZAKATABLE_TYPES.map((type) => new AssetType(type));
  }

  /**
   * Create from string
   */
  static fromString(value: string): AssetType {
    return new AssetType(value.toUpperCase());
  }
}
