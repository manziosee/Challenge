import logger from './logger';
import User from '../models/User';

export const sendBudgetNotification = async (userId: string, message: string) => {
  try {
    const user = await User.findById(userId);
    if (user) {
      // Example: Send an email or in-app notification
      logger.info(`Notification sent to user ${userId}: ${message}`);
      // Integrate with an email service like SendGrid or an in-app notification system
    }
  } catch (error) {
    logger.error(`Error sending notification: ${error}`);
  }
};