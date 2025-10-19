/**
 * INotificationService - Interface for sending notifications
 */
export interface INotificationService {
  /**
   * Send push notification
   */
  sendPushNotification(
    userId: string,
    title: string,
    message: string,
    data?: Record<string, any>
  ): Promise<void>;

  /**
   * Send email notification
   */
  sendEmailNotification(
    email: string,
    subject: string,
    body: string
  ): Promise<void>;

  /**
   * Send SMS notification
   */
  sendSmsNotification(
    phoneNumber: string,
    message: string
  ): Promise<void>;

  /**
   * Schedule notification for future delivery
   */
  scheduleNotification(
    userId: string,
    title: string,
    message: string,
    scheduledTime: Date,
    data?: Record<string, any>
  ): Promise<string>; // Returns scheduled notification ID

  /**
   * Cancel scheduled notification
   */
  cancelScheduledNotification(notificationId: string): Promise<void>;
}
