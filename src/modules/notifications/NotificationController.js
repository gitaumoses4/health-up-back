import models from '../../database/models';


const include = [{
  model: models.SystemNotification,
  as: 'systemNotification',
}];

class NotificationController {
  static async getAllNotifications(req) {
    const { user: { id } } = req;
    const notifications = await models.Notification.findAll({
      where: {
        recipientId: id
      },
      include,
      order: [['createdAt', 'desc']]
    });
    return [200, { notifications }];
  }

  static async getUnreadNotifications(req) {
    const { user: { id } } = req;
    const notifications = await models.Notification.findAll({
      where: {
        recipientId: id,
        status: 'unread'
      },
      include,
      order: [['createdAt', 'desc']]
    });
    return [200, { notifications }];
  }

  static async getReadNotifications(req) {
    const { user: { id } } = req;
    const notifications = await models.Notification.findAll({
      where: {
        recipientId: id,
        status: 'read'
      },
      include,
      order: [['createdAt', 'desc']]
    });
    return [200, { notifications }];
  }

  static async readNotification(req) {
    const { params: { id: notificationId } } = req;

    const notification = await models.Notification.findByPk(notificationId, {
      include
    });

    if (notification) {
      await notification.update({ status: 'read' });
    }

    await notification.reload();

    return [200, { notification }];
  }

  static async markAllAsRead(req) {
    const { user: { id } } = req;

    await models.Notification.update({ status: 'read' }, {
      where: {
        recipientId: id
      },
      include,
    });
    
    const notifications = await models.Notification.findAll({
      where: {
        recipientId: id
      },
      include,
      order: [['createdAt', 'desc']]
    });

    return [200, { notifications }];
  }

  static async setDelivered(req) {
    const { params: { id: notificationId } } = req;

    const notification = await models.Notification.findByPk(notificationId, {
      include
    });

    if (notification && notification.status === 'sent') {
      await notification.update({ status: 'unread' });
    }

    await notification.reload();

    return [200, { notification }];
  }
}

export default NotificationController;
