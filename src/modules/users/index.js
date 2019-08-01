import { Op } from 'sequelize';
import MRouter, { models } from '../../utils/router';
import BaseValidator from '../../middleware/BaseValidator';
import UserValidator from '../../middleware/UserValidator';
import UserController from './UserController';
import T from '../../utils/T';
import { ADMINISTRATOR, AMBULANCE_MAN, COMPANY } from '../../utils/accountTypes';
import ProfileController from '../profiles/ProfileController';

const Router = new MRouter();

Router.post('/register',
  BaseValidator.requiredFields([ 'email', 'password', 'name']),
  BaseValidator.uniqueFields({ email: T.email_used }, models.User),
  UserValidator.validateEmail,
  ProfileController.validateIdNumber,
  UserController.registerUser);

Router.post('/login',
  BaseValidator.requiredFields(['userId', 'password']),
  UserValidator.validateUserId,
  UserController.loginUser);

Router.post('/login/ambulance',
  BaseValidator.requiredFields(['userId', 'password']),
  BaseValidator.modelExists(
    ({ body: { userId } }) => ({
      [Op.or]: {
        email: userId,
        ambulanceId: userId,
      },
      accountType: AMBULANCE_MAN
    }),
    models.User,
    T.ambulance_does_not_exist
  ),
  UserController.loginAmbulance);

Router.get('/user',
  UserValidator.authenticate,
  UserController.retrieveUser);

Router.put('/updatePassword',
  UserValidator.authenticate,
  UserController.updatePassword);

Router.get('/users/:id',
  UserValidator.authenticate,
  UserValidator.checkRoles([COMPANY, ADMINISTRATOR, AMBULANCE_MAN]),
  UserController.getUserProfile);

Router.get('/users',
  UserValidator.authenticate,
  UserValidator.checkRoles([COMPANY, ADMINISTRATOR, AMBULANCE_MAN]),
  UserController.searchUsers);

Router.post('/users/forgotPassword',
  UserValidator.validateUserId,
  UserController.forgotPassword);

Router.put('/users/resetPassword',
  BaseValidator.requiredFields(['password']),
  UserController.resetPassword);

export default Router;
