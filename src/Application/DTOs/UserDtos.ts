/**
 * Data Transfer Objects for User Management
 */

export interface CreateUserDto {
  email: string;
  name: string;
  password: string;
  currency: string;
  nisabMethod: 'GOLD' | 'SILVER';
}

export interface UpdateUserDto {
  id: string;
  name?: string;
  currency?: string;
  nisabMethod?: 'GOLD' | 'SILVER';
}

export interface UpdateNotificationPreferencesDto {
  userId: string;
  enablePushNotifications?: boolean;
  enableEmailNotifications?: boolean;
  enableSmsNotifications?: boolean;
  reminderFrequency?: 'weekly' | 'monthly' | 'quarterly';
  preRamadanReminder?: boolean;
  hawlCompletionReminder?: boolean;
  nisabThresholdAlert?: boolean;
}

export interface UserResponseDto {
  id: string;
  email: string;
  name: string;
  currency: string;
  nisabMethod: string;
  notificationPreferences: {
    enablePushNotifications: boolean;
    enableEmailNotifications: boolean;
    enableSmsNotifications: boolean;
    reminderFrequency: string;
    preRamadanReminder: boolean;
    hawlCompletionReminder: boolean;
    nisabThresholdAlert: boolean;
  };
  createdAt: string;
  lastLoginAt: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface LoginResponseDto {
  user: UserResponseDto;
  token: string;
  refreshToken: string;
}
