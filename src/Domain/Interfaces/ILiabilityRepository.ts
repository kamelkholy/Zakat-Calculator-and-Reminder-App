import { Liability } from '../Entities/Liability';

/**
 * ILiabilityRepository - Repository interface for Liability persistence
 */
export interface ILiabilityRepository {
  /**
   * Find liability by ID
   */
  findById(id: string): Promise<Liability | null>;

  /**
   * Find all liabilities for a user
   */
  findByUserId(userId: string): Promise<Liability[]>;

  /**
   * Find deductible liabilities for a user
   */
  findDeductibleByUserId(userId: string): Promise<Liability[]>;

  /**
   * Save a new liability
   */
  save(liability: Liability): Promise<void>;

  /**
   * Update an existing liability
   */
  update(liability: Liability): Promise<void>;

  /**
   * Delete a liability
   */
  delete(id: string): Promise<void>;
}
