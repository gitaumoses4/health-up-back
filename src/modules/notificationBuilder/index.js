import MRouter from '../../utils/router';
import UserValidator from '../../middleware/UserValidator';
import { ADMINISTRATOR } from '../../utils/accountTypes';
import NotificationBuilderController from './NotificationBuilderController';

const Router = new MRouter(UserValidator.authenticate, UserValidator.checkRoles(ADMINISTRATOR));


Router.get('/notificationBuilder/types',
  NotificationBuilderController.getNotificationTypes);


Router.get('/notificationBuilder/types/:id',
  NotificationBuilderController.getNotificationType);

Router.post('/notificationBuilder/types/:id',
  NotificationBuilderController.createNotification);

Router.put('/notificationBuilder/types/:id/configuration',
  NotificationBuilderController.updateConfiguration);

Router.put('/notificationBuilder/types/:id',
  NotificationBuilderController.createNotification);

Router.delete('/notificationBuilder/types/:id/:notificationId',
  NotificationBuilderController.deleteNotification);

Router.get('/notificationBuilder',
  NotificationBuilderController.getNotifications);

export default Router;
