import MRouter from '../../utils/router';
import BaseValidator from '../../middleware/BaseValidator';
import AuthController from '../users/AuthController';
import UserValidator from '../../middleware/UserValidator';
import models from '../../database/models';

const Router = new MRouter(
);

Router.post('/register',
  BaseValidator.requiredFields(
    ['accountType', 'name', 'email', 'password', 'registrationNumber', 'noOfEmployees', 'receipt']
  ),
  UserValidator.validateEmail,
  BaseValidator.uniqueFields({ email: 'The email provided is already in use', }, models.User),
  BaseValidator.uniqueFields(
    { registrationNumber: 'The company registration number is already in use' },
    models.Company
  ),
  AuthController.registerCompany);

export default Router.Router;
