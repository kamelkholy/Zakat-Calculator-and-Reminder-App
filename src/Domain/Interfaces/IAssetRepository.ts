import { MoneyAsset, StockAsset, PreciousMetalAsset } from '../Entities';

/**
 * Union type for all asset types
 */
export type Asset = MoneyAsset | StockAsset | PreciousMetalAsset;

/**
 * Base repository interface with common operations
 */
export interface IBaseAssetRepository<T extends Asset> {
  /**
   * Find asset by ID
   */
  findById(id: string): Promise<T | null>;

  /**
   * Find all assets for a user
   */
  findByUserId(userId: string): Promise<T[]>;

  /**
   * Save a new asset
   */
  save(asset: T): Promise<void>;

  /**
   * Update an existing asset
   */
  update(asset: T): Promise<void>;

  /**
   * Delete an asset
   */
  delete(id: string): Promise<void>;

  /**
   * Find assets that have completed hawl
   */
  findAssetsWithCompletedHawl(userId: string, currentDate: Date): Promise<T[]>;
}

/**
 * Repository interface for MoneyAsset persistence (separate table)
 */
export interface IMoneyAssetRepository extends IBaseAssetRepository<MoneyAsset> {
  /**
   * Find money assets by asset type (CASH, BONDS, PROPERTY, etc.)
   */
  findByUserIdAndType(userId: string, assetType: string): Promise<MoneyAsset[]>;
}

/**
 * Repository interface for StockAsset persistence (separate table)
 */
export interface IStockAssetRepository extends IBaseAssetRepository<StockAsset> {
  /**
   * Find stock assets by company name
   */
  findByCompanyName(userId: string, companyName: string): Promise<StockAsset[]>;

  /**
   * Find stock assets by symbol
   */
  findBySymbol(userId: string, symbol: string): Promise<StockAsset[]>;
}

/**
 * Repository interface for PreciousMetalAsset persistence (separate table)
 */
export interface IPreciousMetalAssetRepository extends IBaseAssetRepository<PreciousMetalAsset> {
  /**
   * Find precious metal assets by metal type (GOLD or SILVER)
   */
  findByMetalType(userId: string, metalType: 'GOLD' | 'SILVER'): Promise<PreciousMetalAsset[]>;
}

/**
 * Unified repository interface - provides access to all asset repositories
 * This allows use cases to work with all asset types through a single interface
 */
export interface IAssetRepository {
  moneyAssets: IMoneyAssetRepository;
  stockAssets: IStockAssetRepository;
  preciousMetalAssets: IPreciousMetalAssetRepository;

  /**
   * Find all assets (of all types) for a user
   */
  findAllAssetsByUserId(userId: string): Promise<Asset[]>;

  /**
   * Find all assets that have completed hawl
   */
  findAllAssetsWithCompletedHawl(userId: string, currentDate: Date): Promise<Asset[]>;
}
