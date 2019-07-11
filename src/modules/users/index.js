import CRUDController from '../../utils/CRUDController';
import UserController from './UserController';

export default new CRUDController(
  'User',
  '/users',
  UserController,
);
