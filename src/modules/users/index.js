import CRUDController from '../../utils/CRUDController';
import UserController from './UserController';

const profile = {
  model: 'Profile',
  endpoint: '/profile',
  field: {
    name: 'userId',
    location: 'params',
    type: 'integer'
  },
  relation: 'one',
  options: {

  },
  config: {

  }
};

export default new CRUDController(
  'User',
  '/users',
  UserController,
  {
    children: {
      controllers: [profile],
      field: {

      },
    }
  }
);
