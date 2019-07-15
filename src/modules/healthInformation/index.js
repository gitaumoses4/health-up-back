import MRouter from '../../utils/router';
import UserValidator from '../../middleware/UserValidator';
import HealthInformationController from './HealthInformationController';

const Router = new MRouter(
  UserValidator.authenticate
);

Router.put('/healthInformation',
  HealthInformationController.createHealthInformation);

Router.get('/healthInformation',
  HealthInformationController.retrieveHealthInformation);

export default Router;
