import * as bcrypt from 'bcrypt';
import models from '../../database/models';
import JWT from '../../utils/auth';

const SALT = 10;

export default class AuthController {
  static async createUser({
    email, password, name, accountType
  }) {
    const user = await models.User.create({
      email,
      name,
      password: await bcrypt.hash(password, SALT),
      accountType
    });

    await user.reload();
    return user;
  }

  static async registerCompany({
    body,
    body: {
      naturalBusiness, registrationNumber, noOfEmployees,
      responsibleName, receipt,
    }
  }) {
    const user = await AuthController.createUser(body);
    user.dataValues.company = await models.Company.create({
      naturalBusiness,
      registrationNumber,
      noOfEmployees,
      responsibleName,
      receipt,
      verified: false,
      userId: user.id
    });

    return [201, { token: JWT.generate(user), user }, 'Company created successfully'];
  }

  static async registerUser({ body }) {
    const user = await AuthController.createUser(body);
    return [201, { token: JWT.generate(user), user }, 'Account created successfully'];
  }

  static async loginUser({ body: { email, password } }) {
    const user = await models.User.unscoped().findOne({
      where: { email },
      include: [
        {
          model: models.Company,
          as: 'company'
        },
        {
          model: models.Profile,
          as: 'profile'
        }
      ]
    });
    if (await bcrypt.compare(password, user.password)) {
      delete user.dataValues.password;
      return [200, { token: JWT.generate(user.dataValues), user }, 'Login successful'];
    }
    return [403, undefined, 'Invalid login credentials'];
  }
}
