import models from '../../database/models';

class NotificationController {
  static async getNotificationTypes(req) {
    const notificationTypes = await models.NotificationType.findAll();
    return [200, { notificationTypes }];
  }
}

export default NotificationController;
