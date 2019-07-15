import MRouter from '../../utils/router';
import UserValidator from '../../middleware/UserValidator';
import ProfileController from './ProfileController';

const Router = new MRouter(
  UserValidator.authenticate,
);

Router.put('/profile',
  ProfileController.updateProfile);


Router.get('/profile',
  ProfileController.retrieveProfile
  );
export default Router;
