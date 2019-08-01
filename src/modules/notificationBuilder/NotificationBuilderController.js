import models from '../../database/models';
import T from '../../utils/T';
import Notifications from '../../utils/Notifications';

const notificationTypeInclude = [
  {
    model: models.NotificationCondition,
    as: 'conditions',
    through: {
      attributes: []
    }
  },
  {
    model: models.SystemNotification,
    as: 'notifications'
  }
];

class NotificationBuilderController {
  static async getNotificationTypes(req) {
    const notificationTypes = await models.NotificationType.findAll({
      include: notificationTypeInclude,
    });
    return [200, { notificationTypes }];
  }

  static async getNotificationType(req) {
    const { params: { id } } = req;
    const notificationType = await models.NotificationType.findByPk(id, {
      include: notificationTypeInclude
    });

    return [200, { notificationType }];
  }

  static async updateConfiguration(req) {
    const {
      body: { configuration },
      params: { id }
    } = req;

    const type = await models.NotificationType.findByPk(id, {
      include: notificationTypeInclude
    });
    await type.update({
      configuration: {
        ...type.configuration,
        ...configuration
      }
    });

    await type.reload();

    await Notifications.scheduleNotifications();

    return [200, { notificationType: type }, T.notification_updated];
  }

  static async createNotification(req) {
    const {
      body: {
        id: notificationId,
        text, configuration,
        condition: notificationConditionId = null
      }, params: { id }
    } = req;


    const data = {
      text,
      id: notificationId,
      notificationTypeId: id,
      configuration,
      notificationConditionId
    };

    const find = await models.SystemNotification.findByPk(notificationId);

    let updated;
    if (find) {
      updated = true;
      const updatedConfiguration = { ...find.configuration, ...configuration };
      await find.update({ ...data, configuration: updatedConfiguration });
    } else {
      updated = false;
      await models.SystemNotification.create({
        ...data
      });
    }


    const notificationType = await models.NotificationType.findByPk(id, {
      include: notificationTypeInclude,
    });

    await Notifications.scheduleNotifications();
    return [
      updated ? 200 : 201,
      { notificationType },
      !updated ? T.notification_created : T.notification_updated];
  }

  static async deleteNotification(req) {
    const { params: { id, notificationId } } = req;

    await models.SystemNotification.destroy({
      where: {
        id: notificationId
      }
    });

    const notificationType = await models.NotificationType.findByPk(id, {
      include: notificationTypeInclude,
    });

    await Notifications.scheduleNotifications();

    return [200, { notificationType }, T.notification_deleted_successfully];
  }

  static async getNotifications(req) {
    const notifications = await models.SystemNotification.findAll({
      include: [{
        model: models.NotificationCondition,
        as: 'condition'
      }, {
        model: models.NotificationType,
        as: 'notificationType'
      }]
    });
    return [200, { notifications }];
  }
}

export default NotificationBuilderController;
