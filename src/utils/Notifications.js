import cron from 'node-cron';
import moment from 'moment';
import models from '../database/models';
import { NORMAL_USER } from './accountTypes';
import T from './T';
import EmailSender from '../../emails';

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
    const notificationTypes = await models.NotificationType.findAll({
      include: [{
        model: models.SystemNotification,
        as: 'notifications',
        include: [{
          model: models.NotificationCondition,
          as: 'condition'
        }]
      }, {
        model: models.NotificationCondition,
        as: 'conditions',
      }],
      order: [[{ model: models.SystemNotification, as: 'notifications' }, 'id', 'asc']]
    });

    global.scheduledNotifications = notificationTypes.reduce((acc, cur) => [
      ...acc,
      ...Notifications.processNotificationType(cur)
    ], []);
  }

  static processNotificationType(notificationType) {
    const {
      single, configuration, notifications = []
    } = notificationType;

    if (single) {
      // send all the notifications in this type
      return notifications.map(
        notification => Notifications.scheduleNotification(
          notificationType, notification.configuration, notification
        )
      );
    }
    // find the notification to send
    const nextNotification = Notifications.findNextNotification(notificationType);
    if (notifications.length) {
      // send this notification
      return [
        Notifications.scheduleNotification(
          notificationType,
          configuration,
          notifications[nextNotification]
        )
      ];
    }
    return [];
  }

  static findNextNotification(notificationType) {
    const { sentNotification, notifications = [] } = notificationType;
    if (notifications.length === 0) {
      return null;
    }
    let index = 0;
    for (let i = 0; i < notifications.length - 1; i += 1) {
      if (notifications[i].id === sentNotification) {
        index = i + 1;
      }
    }
    return index;
  }

  static scheduleNotification(notificationType, configuration, notification) {
    const { alert, single } = notificationType;
    return cron.schedule(Notifications.createCronPattern(alert, configuration), async () => {
      // create the notification
      if (alert === 'frequency' && !single) {
        await notificationType.update({ sentNotification: notification.id });
      }

      await Notifications.sendNotification(notificationType, configuration, notification);
    }, {
      scheduled: true,
      timezone: process.env.TIMEZONE
    });
  }

  static async filterUsers(notificationType, configuration, notification) {
    const allUsers = await models.User.findAll({
      where: { accountType: NORMAL_USER },
      include: [{
        model: models.Profile,
        as: 'profile'
      }, {
        model: models.HealthInformation,
        as: 'healthInformation'
      }]
    });

    return allUsers.filter(user => Notifications.evaluatePredicate(
      notificationType, user, configuration, notification
    ));
  }

  static evaluatePredicate(notificationType, user, configuration, notification) {
    const { condition } = notification;
    if (!condition) {
      return true;
    }
    let fieldValue = user;
    const fields = condition.field.key.split('.');

    for (let i = 0; i < fields.length; i += 1) {
      fieldValue = fieldValue[fields[i]];
      if (!fieldValue) {
        break;
      }
    }
    if (fieldValue) {
      fieldValue = fieldValue[notificationType.field];
    }
    if (fieldValue) {
      if (notificationType.alert === 'frequency') {
        return true;
      }
      if (fieldValue === 'dontRemember') {
        return true;
      }
      // check date
      let date = moment(fieldValue, 'YYYY-MM-DD');
      date = date.add(+configuration.rangeValue, configuration.range);

      const today = moment();

      if (date.day() === today.day()
        && date.month() === today.month()
        && date.year() === today.year()) {
        return true;
      }
    }
    return false;
  }

  static async sendNotification(notificationType, configuration, notification) {
    // filter the users that can receive this notification
    const users = await Notifications.filterUsers(notificationType, configuration, notification);

    users.forEach(async (user) => {
      const newNotification = await models.Notification.create({
        systemNotificationId: notification.id,
        text: notification.text,
        recipientId: user.id,
        status: 'pending'
      }, {
        include: [{
          model: models.SystemNotification,
          as: 'systemNotification'
        }]
      });
      await newNotification.reload();
      if (process.env.NODE_ENV !== 'test') {
        await Notifications.emitNotification(user, newNotification);
      }
    });
  }

  static async emitNotification({ id: userId, name, email }, notification) {
    await notification.update({ status: 'unread' });
    global.io.sockets.emit(`notification-${userId}`, notification);

    // create email data
    const emailData = {
      greeting: T.greeting.replace('{}', name),
      message: notification.text
    };

    await EmailSender.sendMail('health.pug', email, T.health_alert, emailData);
  }

  static createCronPattern(alert = 'frequency', configuration) {
    if (alert === 'frequency') {
      const {
        frequency, time, weekDay, month, day,
      } = configuration;
      const formatTime = moment(time, 'hh:mm');
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
    } else {
      return '0 0 0 * * *';
    }
  }
}

export default Notifications;
