import MRouter from '../../utils/router';
import UserValidator from '../../middleware/UserValidator';
import NotificationController from './NotificationController';

const Router = new MRouter(UserValidator.authenticate);

Router.get('/notifications/',
  NotificationController.getAllNotifications);

Router.get('/notifications/unread',
  NotificationController.getUnreadNotifications);

Router.get('/notifications/read',
  NotificationController.getReadNotifications);

Router.put('/notifications/read/:id',
  NotificationController.readNotification);

Router.put('/notifications/read',
  NotificationController.markAllAsRead);

export default Router;
