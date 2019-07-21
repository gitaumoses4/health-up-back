import MRouter from '../../utils/router';
import UserValidator from '../../middleware/UserValidator';
import { ADMINISTRATOR } from '../../utils/accountTypes';
import NotificationController from './NotificationController';

const Router = new MRouter(UserValidator.authenticate, UserValidator.checkRoles(ADMINISTRATOR));


Router.get('/notifications/types',
  NotificationController.getNotificationTypes);


Router.get('/notifications/types/:id',
  NotificationController.getNotificationType);

Router.post('/notifications/types/:id',
  NotificationController.createNotification);
export default Router;
