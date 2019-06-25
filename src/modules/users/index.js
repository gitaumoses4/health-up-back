import MRouter from '../../utils/router';
import models from '../../database/models';
import BaseValidator from '../../middleware/BaseValidator';
import UserValidator from '../../middleware/UserValidator';
import AuthController from './AuthController';

const Router = new MRouter(
  BaseValidator.requiredFields(['email', 'password', 'name']),
);


Router.post(
  '/register',
  BaseValidator.uniqueFields({ email: 'The email provided is already in use' }, models.User),
  UserValidator.validateEmail,
  AuthController.registerUser
);

Router.post(
  '/login',
  BaseValidator.requiredFields(['email', 'password']),
  UserValidator.validateEmail,
  BaseValidator.modelExists('email', 'body', models.User, 'User with this email does not exist'),
  AuthController.loginUser
);

export default Router.Router;
