import MRouter, { models } from '../../utils/router';
import BaseValidator from '../../middleware/BaseValidator';
import UserValidator from '../../middleware/UserValidator';
import UserController from './UserController';
import T from '../../utils/T';

const Router = new MRouter();

Router.post('/register',
  BaseValidator.requiredFields(['email', 'password', 'name']),
  BaseValidator.uniqueFields({ email: T.email_used }, models.User),
  UserValidator.validateEmail,
  UserController.registerUser);

Router.post('/login',
  BaseValidator.requiredFields(['email', 'password']),
  UserValidator.validateEmail,
  UserController.loginUser);

Router.get('/user',
  UserValidator.authenticate,
  UserController.retrieveUser);

export default Router;
