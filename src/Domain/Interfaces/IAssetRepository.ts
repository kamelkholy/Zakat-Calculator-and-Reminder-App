import { Asset } from '../Entities/Asset';

/**
 * IAssetRepository - Repository interface for Asset persistence
 */
export interface IAssetRepository {
  /**
   * Find asset by ID
   */
  findById(id: string): Promise<Asset | null>;

  /**
   * Find all assets for a user
   */
  findByUserId(userId: string): Promise<Asset[]>;

  /**
   * Find assets by type for a user
   */
  findByUserIdAndType(userId: string, type: string): Promise<Asset[]>;

  /**
   * Save a new asset
   */
  save(asset: Asset): Promise<void>;

  /**
   * Update an existing asset
   */
  update(asset: Asset): Promise<void>;

  /**
   * Delete an asset
   */
  delete(id: string): Promise<void>;

  /**
   * Find all zakatable assets for a user
   */
  findZakatableAssetsByUserId(userId: string): Promise<Asset[]>;

  /**
   * Find assets that have completed hawl
   */
  findAssetsWithCompletedHawl(userId: string, currentDate: Date): Promise<Asset[]>;
}
