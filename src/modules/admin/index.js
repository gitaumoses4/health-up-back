import MRouter from '../../utils/router';
import UserValidator from '../../middleware/UserValidator';
import models from '../../database/models';
import { ADMINISTRATOR } from '../../utils/accountTypes';
import AdminController from './AdminController';
import BaseValidator from '../../middleware/BaseValidator';
import T from '../../utils/T';

const Router = new MRouter(UserValidator.authenticate, UserValidator.checkRoles(ADMINISTRATOR));


Router.get('/companies',
  AdminController.listCompanies);

Router.get('/companies/:id',
  AdminController.getCompany);

Router.put('/companies/:id/verify',
  AdminController.verifyCompany);

Router.get('/ambulances',
  AdminController.listAmbulances);

Router.post('/ambulances',
  BaseValidator.requiredFields(['name', 'email', 'password']),
  UserValidator.validateEmail,
  BaseValidator.uniqueFields({ email: T.email_used }, models.User),
  AdminController.createAmbulanceMan);

export default Router;
