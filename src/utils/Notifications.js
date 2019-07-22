import cron from 'node-cron';
import moment from 'moment';
import models from '../database/models';
import { NORMAL_USER } from './accountTypes';

class Notifications {
  static clearTasks() {
    if (global.scheduledNotifications) {
      global.scheduledNotifications.forEach((job) => {
        job.destroy();
      });
    }
  }

  static async scheduleNotifications() {
    Notifications.clearTasks();
    const notifications = await models.SystemNotification.findAll({
      include: [{
        model: models.NotificationCondition,
        as: 'condition'
      }, {
        model: models.NotificationType,
        as: 'notificationType'
      }]
    });

    global.scheduledNotifications = notifications.map(
      Notifications.scheduleNotification
    );
  }

  static scheduleNotification(notification) {
    return cron.schedule(Notifications.createCronPatter(notification), async () => {
      // create the notification
      await Notifications.sendNotification(notification);
    }, {
      scheduled: true
    });
  }

  static async sendNotification(notification) {
    let users = await models.User.findAll({
      where: { accountType: NORMAL_USER },
      include: [{
        model: models.Profile,
        as: 'profile'
      }, {
        model: models.HealthInformation,
        as: 'healthInformation'
      }]
    });

    const { notificationType, condition } = notification;

    // filter the users that can receive this notification
    users = users.filter((user) => {
      if (!condition) {
        return true;
      }
      let fieldValue = user;
      // read user attribute
      const fields = condition.field.split('.');
      for (let i = 0; i < fields.length; i += 1) {
        fieldValue = fieldValue[fields[i]];
        if (!fieldValue) {
          break;
        }
      }
      if (fieldValue) {
        fieldValue = fieldValue[notificationType.field];
      }

      return !!fieldValue;
    });

    users.forEach(async (user) => {
      const newNotification = await models.Notification.create({
        systemNotificationId: notification.id,
        recipientId: user.id,
        status: 'pending'
      }, {
        include: [{
          model: models.SystemNotification,
          as: 'systemNotification'
        }]
      });
      await newNotification.reload();
      await Notifications.emitNotification(user.id, newNotification);
    });
  }

  static async emitNotification(userId, notification) {
    await notification.update({ status: 'unread' });
    global.io.sockets.emit(`notification-${userId}`, notification);
  }

  static createCronPatter({
    frequency, time, weekDay, month, day
  }) {
    const formatTime = moment(time, 'hh:mm:ss');
    switch (frequency) {
      case 'daily': {
        return `${formatTime.minute()} ${formatTime.hour()} * * *`;
      }
      case 'weekly': {
        return `${formatTime.minute()} ${formatTime.hour()} * * ${weekDay}`;
      }
      case 'monthly': {
        return `0 0 ${day} * *`;
      }
      case 'yearly': {
        return `0 0 ${day} ${month} *`;
      }
      default:
        return '';
    }
  }
}

export default Notifications;
