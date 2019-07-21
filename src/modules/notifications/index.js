import MRouter from '../../utils/router';
import UserValidator from '../../middleware/UserValidator';
import { ADMINISTRATOR } from '../../utils/accountTypes';
import NotificationController from './NotificationController';

const Router = new MRouter(UserValidator.authenticate, UserValidator.checkRoles(ADMINISTRATOR));


Router.get('/notifications/types',
  NotificationController.getNotificationTypes);

export default Router;
