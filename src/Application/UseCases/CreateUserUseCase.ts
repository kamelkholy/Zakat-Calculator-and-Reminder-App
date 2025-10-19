import { IUserRepository } from '../../Domain/Interfaces/IUserRepository';
import { User, NotificationPreferences } from '../../Domain/Entities/User';
import { Currency } from '../../Domain/ValueObjects/Currency';
import { NisabCalculationMethod } from '../../Domain/ValueObjects/NisabCalculationMethod';
import { CreateUserDto, UserResponseDto } from '../DTOs/UserDtos';

/**
 * CreateUserUseCase - Use case for creating a new user
 */
export class CreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(dto: CreateUserDto): Promise<UserResponseDto> {
    // Check if email already exists
    const emailExists = await this.userRepository.emailExists(dto.email);
    if (emailExists) {
      throw new Error('Email already registered');
    }

    // Create value objects
    const currency = Currency.fromString(dto.currency);
    const nisabMethod = NisabCalculationMethod.fromString(dto.nisabMethod);

    // Default notification preferences
    const notificationPreferences: NotificationPreferences = {
      enablePushNotifications: true,
      enableEmailNotifications: true,
      enableSmsNotifications: false,
      reminderFrequency: 'monthly',
      preRamadanReminder: true,
      hawlCompletionReminder: true,
      nisabThresholdAlert: true,
    };

    // Create entity
    const user = new User(
      this.generateId(),
      dto.email,
      dto.name,
      currency,
      nisabMethod,
      notificationPreferences,
      new Date(),
      new Date()
    );

    // In production, hash the password before storing
    // await this.passwordHasher.hash(dto.password);

    // Persist
    await this.userRepository.save(user);

    // Return DTO
    return this.mapToResponseDto(user);
  }

  private generateId(): string {
    return `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private mapToResponseDto(user: User): UserResponseDto {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      currency: user.currency.code,
      nisabMethod: user.nisabMethod.method,
      notificationPreferences: {
        enablePushNotifications: user.notificationPreferences.enablePushNotifications,
        enableEmailNotifications: user.notificationPreferences.enableEmailNotifications,
        enableSmsNotifications: user.notificationPreferences.enableSmsNotifications,
        reminderFrequency: user.notificationPreferences.reminderFrequency,
        preRamadanReminder: user.notificationPreferences.preRamadanReminder,
        hawlCompletionReminder: user.notificationPreferences.hawlCompletionReminder,
        nisabThresholdAlert: user.notificationPreferences.nisabThresholdAlert,
      },
      createdAt: user.createdAt.toISOString(),
      lastLoginAt: user.lastLoginAt.toISOString(),
    };
  }
}
