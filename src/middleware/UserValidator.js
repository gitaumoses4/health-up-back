import JWT from '../utils/auth';
import models from '../database/models';
import T from '../utils/T';

export default class UserValidator {
  static validateEmail(req) {
    const { body: { email } } = req;
    if (email) {
      req.checkBody('email', 'Please enter a valid email')
        .isEmail();
    }
  }

  static async authenticate(req) {
    const auth = req.headers.authorization;

    const token = auth ? auth.split(' ') : [];

    if (token.length !== 2 || token[0].toLowerCase() !== 'bearer') {
      return [401, undefined, 'Authorization token not provided'];
    }

    try {
      const authToken = token[1];
      const decoded = await JWT.verify(authToken);
      req.userToken = authToken;

      req.user = await models.User.findByPk(decoded.id, {
        include: [{
          model: models.Company,
          as: 'company'
        }]
      });
      if (!req.user) {
        return [404, undefined, 'User not found'];
      }
    } catch (error) {
      return [401, undefined, 'Invalid authorization token'];
    }
  }

  static checkRoles(roles, message) {
    const response = [401, undefined, message || 'You are not authorized to perform this action'];
    return async (req) => {
      const { user: { accountType } } = req;
      if (roles) {
        if (roles.constructor === String) {
          if (roles !== accountType) {
            return response;
          }
        } else if (roles.constructor === Array) {
          if (!roles.includes(accountType)) {
            return response;
          }
        } else {
          return response;
        }
      }
    };
  }

  static checkVerified(req) {
    const { user: { company: { verified } } } = req;
    if (!verified) {
      return [403, undefined, T.account_not_verified];
    }
  }
}
