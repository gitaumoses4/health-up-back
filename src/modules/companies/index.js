import MRouter from '../../utils/router';
import UserValidator from '../../middleware/UserValidator';
import CompanyController from './CompanyController';


const Router = new MRouter(UserValidator.authenticate, UserValidator.checkRoles('company'));

Router.put(
  '/company',
  CompanyController.updateProfile
);

Router.get(
  '/company',
  CompanyController.fetchCompany
);

export default Router;
