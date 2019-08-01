import * as bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import _ from 'lodash';
import models from '../../database/models';
import JWT from '../../utils/auth';
import T from '../../utils/T';
import { NORMAL_USER } from '../../utils/accountTypes';
import BaseValidator from '../../middleware/BaseValidator';

export const SALT = 10;
const include = [
  { model: models.Company, as: 'company' },
  { model: models.Profile, as: 'profile' },
  { model: models.HealthInformation, as: 'healthInformation' }
];

class UserController {
  static async createUserAccount(req) {
    const {
      password, name, email, idNumber, accountType = NORMAL_USER, ambulanceId
    } = req.body;

    const encryptedPassword = await bcrypt.hash(password, SALT);

    const user = await models.User.create({
      email,
      name,
      password: encryptedPassword,
      idNumber,
      accountType,
      ambulanceId
    });

    if (accountType === NORMAL_USER) {
      await models.Profile.create({
        idNumber,
        userId: user.id
      });
    }
    return user;
  }

  static async registerUser(req) {
    const { body: { accountType = NORMAL_USER } } = req;
    const user = await UserController.createUserAccount(req);
    if (accountType === 'company') {
      const {
        naturalBusiness, registrationNumber, noOfEmployees, responsibleName, receipt
      } = req.body;

      await models.Company.create({
        naturalBusiness,
        registrationNumber,
        noOfEmployees,
        responsibleName,
        receipt,
        userId: user.id
      });
    }

    await user.reload();

    return [201, { token: JWT.generate(user) }, T.registration_successful];
  }

  static async loginAmbulance(req) {
    const { userId, password } = req.body;

    const user = await models.User.unscoped().findOne({
      where: {
        [Op.or]: {
          email: userId,
          ambulanceId: userId
        }
      }
    });

    return UserController.completeLogin(user, password);
  }

  static async completeLogin(authenticatedUser, password) {
    const user = authenticatedUser;
    if (user && await bcrypt.compare(password, user.password)) {
      delete user.dataValues.password;
      return [200, { token: JWT.generate(user), user }, T.login_successful];
    }
    return [403, undefined, T.invalid_login_credentials];
  }

  static async loginUser(req) {
    const { userId, password } = req.body;
    return UserController.completeLogin(user, password);
  }


  static async retrieveUser(req) {
    const { user: { id } } = req;

    const user = await models.User.findOne({ where: { id }, include });

    return [200, { user }];
  }

  static async getUserProfile(req) {
    const { params: { id } } = req;

    const user = await models.User.findOne({ where: { id }, include });
    if (!user) {
      return [404, undefined, T.user_does_not_exist];
    }

    return [200, { user }];
  }

  static async updatePassword(req) {
    const { user, body: { password } } = req;

    await user.update({ password: await bcrypt.hash(password, SALT) });

    return [200, { user }, T.password_updated];
  }

  static async searchUsers(req) {
    const { query: { search } } = req;
    const users = await models.User.findAll({
      where: {
        ...BaseValidator.createSearchFields(['email', 'name'], search),
        accountType: NORMAL_USER
      }
    });

    return [200, { users }];
  }
}

export default UserController;
