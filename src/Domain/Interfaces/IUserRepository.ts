import { User } from '../Entities/User';

/**
 * IUserRepository - Repository interface for User persistence
 */
export interface IUserRepository {
  /**
   * Find user by ID
   */
  findById(id: string): Promise<User | null>;

  /**
   * Find user by email
   */
  findByEmail(email: string): Promise<User | null>;

  /**
   * Save a new user
   */
  save(user: User): Promise<void>;

  /**
   * Update an existing user
   */
  update(user: User): Promise<void>;

  /**
   * Delete a user
   */
  delete(id: string): Promise<void>;

  /**
   * Check if email exists
   */
  emailExists(email: string): Promise<boolean>;
}
