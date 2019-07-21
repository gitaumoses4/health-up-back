import _ from 'lodash';
import { Op } from 'sequelize';
import models from '../../database/models';
import T from '../../utils/T';

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

class NotificationController {
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

  static async createNotification(req) {
    const {
      body: {
        text, time, weekDay,
        month, day, frequency,
        condition: notificationConditionId = null
      }, params: { id }
    } = req;


    const query = {
      text,
      time,
      weekDay,
      month,
      day,
      frequency,
      notificationConditionId
    };
    const [notification, created] = await models.SystemNotification.findOrCreate({
      defaults: { ...query },
      where: {
        notificationTypeId: id,
        text,
        notificationConditionId
      },
    });


    const notificationType = await models.NotificationType.findByPk(id, {
      include: notificationTypeInclude,
    });

    return [
      created ? 201 : 200,
      { notificationType },
      created ? T.notification_created : T.notification_exists];
  }
}

export default NotificationController;
