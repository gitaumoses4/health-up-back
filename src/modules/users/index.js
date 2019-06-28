import * as bcrypt from 'bcrypt';
import MRouter from '../../utils/router';
import models from '../../database/models';
import BaseValidator from '../../middleware/BaseValidator';
import UserValidator from '../../middleware/UserValidator';
import AuthController from './AuthController';
import CRUDController from '../../utils/CRUDController';
import JWT from '../../utils/auth';

const SALT = 10;

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


export default new CRUDController('User', '/users', {
  register: {
    middleware: [
      BaseValidator.requiredFields(['email', 'password', 'name']),
      BaseValidator.uniqueFields({ email: 'The email provided is already in use' }, models.User),
      UserValidator.validateEmail,
    ],
    method: 'post',
    endpoint: 'register',
    controller: 'create',
    fields: ['email', 'password', 'name', 'email', 'accountType'],
    preCreate: async ({ body: { password } }) => ({ password: await bcrypt.hash(password, SALT) }),
    response: ({ user }) => ({ token: JWT.generate(user), user }),
  },
  // login: {
  //   middleware: [
  //     BaseValidator.requiredFields(['email', 'password']),
  //     UserValidator.validateEmail,
  //   ],
  //   field: {
  //     name: 'email',
  //     location: 'body'
  //   }
  // }
}, {
});
