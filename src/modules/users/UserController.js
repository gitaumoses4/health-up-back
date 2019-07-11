import * as bcrypt from 'bcrypt';
import models from '../../database/models';
import BaseValidator from '../../middleware/BaseValidator';
import UserValidator from '../../middleware/UserValidator';
import JWT from '../../utils/auth';

export const SALT = 10;

const include = () => ({
  include: [
    { model: models.Company, as: 'company' },
    { model: models.Profile, as: 'profile' },
    { model: models.HealthInformation, as: 'healthInformation' }
  ]
});

const register = {
  middleware: [
    BaseValidator.requiredFields(['email', 'password', 'name']),
    BaseValidator.uniqueFields({ email: 'The email provided is already in use' }, models.User),
    UserValidator.validateEmail,
  ],
  method: 'post',
  endpoint: '/register',
  controller: 'create',
  fields: ['email', 'password', 'name', 'email', 'accountType'],
  preCreate: async ({ body: { password } }) => ({ password: await bcrypt.hash(password, SALT) }),
  response: ({
    status, data: user, message
  }) => (
    [status, { token: JWT.generate(user), user }, message]
  ),
};

const login = {
  middleware: [
    BaseValidator.requiredFields(['email', 'password']),
    UserValidator.validateEmail,
  ],
  endpoint: '/login',
  controller: 'read',
  method: 'post',
  unscoped: true,
  field: { name: 'email', location: 'body', type: 'string' },
  read: include,
  response: async ({
    req, data,
  }) => {
    if (await bcrypt.compare(req.body.password, data.password)) {
      const user = data;
      delete user.password;
      return [200, { token: JWT.generate(data), user }, 'Login successful'];
    }
    return [403, undefined, 'Invalid login credentials'];
  }
};

export default { login, register };
