import CRUDController from '../../utils/CRUDController';
import models from '../../database/models';
import BaseValidator from '../../middleware/BaseValidator';

const controller = new CRUDController('Profile', '', {
  create: {
    fields: '*',
    preCreate: () => ({ userId: 1 }),
    create: () => ({
      include: [
        {
          model: models.User,
          as: 'user'
        }
      ]
    }),
    middleware: [
      BaseValidator.requiredFields(['fullName'])
    ]
  },
  read: {
    read: () => ({
      include: [
        {
          model: models.User,
          as: 'user'
        }
      ]
    }),
  },
  list: {
    pagination: {
      limit: 10
    }
  }
});
export default controller.Router.Router;
