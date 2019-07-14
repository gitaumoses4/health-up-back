import CRUDController from '../../utils/CRUDController';
import models from '../../database/models';
import BaseValidator from '../../middleware/BaseValidator';
import UserValidator from '../../middleware/UserValidator';

const include = () => ({
  include: [{ model: models.User, as: 'user' }]
});

const controller = new CRUDController('Profile', '/profiles', {
  create: {
    fields: '*',
    preCreate: () => ({ userId: 1 }),
    create: include,
    middleware: [
      BaseValidator.requiredFields(['fullName'])
    ]
  },
  read: {
    read: include,
  },
  update: {
    fields: '*',
    update: include,
  }
}, {
  notFound: field => (`Profile with id ${field} does not exist`),
  defaultMiddleware: [
    UserValidator.authenticate
  ]
});

export default controller.Router.Router;
