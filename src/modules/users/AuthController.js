import * as bcrypt from 'bcrypt';
import models from '../../database/models';
import JWT from '../../utils/auth';

const SALT = 10;

export default class AuthController {
  static async registerUser(req) {
    const {
      body: {
        email, password, name, accountType
      }
    } = req;

    const user = await models.User.create({
      email,
      name,
      password: await bcrypt.hash(password, SALT),
      accountType
    });

    await user.reload();

    return [201, { token: JWT.generate(user), user }, 'Account created successfully'];
  }

  static async loginUser({ body: { email, password } }) {
    const user = await models.User.unscoped().findOne({ where: { email } });
    if (await bcrypt.compare(password, user.password)) {
      delete user.dataValues.password;
      return [200, { token: JWT.generate(user.dataValues), user }, 'Login successful'];
    }
    return [403, undefined, 'Invalid login credentials'];
  }
}
