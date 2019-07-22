import MRouter from '../../utils/router';
import UserValidator from '../../middleware/UserValidator';
import CompanyController from './CompanyController';
import BaseValidator from '../../middleware/BaseValidator';
import T from '../../utils/T';
import models from '../../database/models';


const Router = new MRouter(UserValidator.authenticate, UserValidator.checkRoles('company'));

Router.put(
  '/company',
  CompanyController.updateProfile
);

Router.get(
  '/company',
  CompanyController.fetchCompany
);

Router.post(
  '/company/employees',
  BaseValidator.requiredFields(['name', 'email', 'password']),
  BaseValidator.uniqueFields({ email: T.email_used }, models.User),
  UserValidator.validateEmail,
  CompanyController.addEmployee
);

Router.get(
  '/company/employees',
  CompanyController.getEmployees
);

export default Router;
