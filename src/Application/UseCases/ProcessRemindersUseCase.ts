import { IReminderRepository } from '../../Domain/Interfaces/IReminderRepository';
import { IAssetRepository } from '../../Domain/Interfaces/IAssetRepository';
import { IUserRepository } from '../../Domain/Interfaces/IUserRepository';
import { INotificationService } from '../../Domain/Interfaces/INotificationService';
import { ReminderService } from '../../Domain/Services/ReminderService';
import { HijriDate } from '../../Domain/ValueObjects/HijriDate';
import { ProcessRemindersDto } from '../DTOs/ReminderDtos';

/**
 * ProcessRemindersUseCase - Use case for processing due reminders and sending notifications
 */
export class ProcessRemindersUseCase {
  constructor(
    private readonly reminderRepository: IReminderRepository,
    private readonly assetRepository: IAssetRepository,
    private readonly userRepository: IUserRepository,
    private readonly notificationService: INotificationService,
    private readonly reminderService: ReminderService
  ) {}

  async execute(dto: ProcessRemindersDto): Promise<{ processed: number; sent: number }> {
    const currentDate = dto.currentDate
      ? new Date(dto.currentDate)
      : new Date();

    // Get due reminders
    const dueReminders = await this.reminderRepository.findDueReminders(currentDate);

    let processed = 0;
    let sent = 0;

    for (const reminder of dueReminders) {
      try {
        // Filter by userId if specified
        if (dto.userId && reminder.userId !== dto.userId) {
          continue;
        }

        processed++;

        // Get user to check notification preferences
        const user = await this.userRepository.findById(reminder.userId);
        if (!user) {
          continue;
        }

        // Send notification based on user preferences
        if (user.notificationPreferences.enablePushNotifications) {
          await this.notificationService.sendPushNotification(
            user.id,
            'Zakat Reminder',
            reminder.message,
            {
              reminderId: reminder.id,
              assetId: reminder.assetId,
              type: reminder.type,
            }
          );
          sent++;
        }

        if (user.notificationPreferences.enableEmailNotifications) {
          await this.notificationService.sendEmailNotification(
            user.email,
            'Zakat Reminder',
            reminder.message
          );
        }

        // Mark reminder as sent
        reminder.markAsSent();
        await this.reminderRepository.update(reminder);
      } catch (error) {
        console.error(`Failed to process reminder ${reminder.id}:`, error);
        // Continue processing other reminders
      }
    }

    return { processed, sent };
  }
}
