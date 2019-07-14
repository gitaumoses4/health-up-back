import * as bcrypt from 'bcrypt';
import BaseValidator from '../../middleware/BaseValidator';
import UserValidator from '../../middleware/UserValidator';
import models from '../../database/models';
import { SALT } from '../users/UserController';
import JWT from '../../utils/auth';

const registerUser = async ({
  body: {
    email, password, name, accountType
  }
}) => {
  const hash = await bcrypt.hash(password, SALT);
  const user = await models.User.create({
    email, name, password: hash, accountType
  });
  await user.reload();
  return { userId: user.id, verified: false };
};

const include = () => ({
  include: [
    { model: models.User, as: 'owner' },
  ]
});

const register = {
  controller: 'create',
  endpoint: '/register',
  fields: '*',
  middleware: [
    BaseValidator.requiredFields(
      ['accountType', 'name', 'email', 'password', 'registrationNumber', 'noOfEmployees']
    ),
    UserValidator.validateEmail,
    BaseValidator.uniqueFields({ email: 'The email provided is already in use', }, models.User),
    BaseValidator.uniqueFields(
      { registrationNumber: 'The company registration number is already in use' },
      models.Company
    ),
  ],
  preCreate: registerUser,
  response: ({ data: company }) => (
    [201, { token: JWT.generate(company.owner), company }, 'Company created successfully']
  ),
  create: include
};

const read = {
  read: include
};

const list = {
  list: include,
  pagination: {
    limit: 10
  }
};

export default { register, read, list };
