/**
 * Data Transfer Objects for Reminder Management
 */

export interface CreateReminderDto {
  userId: string;
  assetId?: string;
  type: 'HAWL_COMPLETION' | 'PRE_RAMADAN' | 'CUSTOM' | 'NISAB_THRESHOLD';
  scheduledDate: {
    year: number;
    month: number;
    day: number;
  };
  message: string;
}

export interface UpdateReminderDto {
  id: string;
  scheduledDate?: {
    year: number;
    month: number;
    day: number;
  };
  message?: string;
}

export interface ReminderResponseDto {
  id: string;
  userId: string;
  assetId: string | null;
  type: string;
  scheduledDate: {
    year: number;
    month: number;
    day: number;
  };
  status: string;
  message: string;
  createdAt: string;
  snoozedUntil?: string;
}

export interface SnoozeReminderDto {
  id: string;
  snoozeDuration: number; // in days
}

export interface ProcessRemindersDto {
  userId?: string; // If not provided, process for all users
  currentDate?: string;
}
