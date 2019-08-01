import _ from 'lodash';
import { Op } from 'sequelize';
import models from '../../database/models';
import T from '../../utils/T';

class ProfileController {
  static async validateIdNumber(req) {
    const { body: { idNumber }, user } = req;

    if (idNumber) {
      const where = { idNumber };
      if (user) {
        where.id = {
          [Op.ne]: user.id
        };
      }
      const userFound = await models.User.findOne({ where });

      req.checkBody('idNumber', T.id_number_exists).custom(() => userFound === null);
    }
  }

  static async updateProfile(req) {
    const { user } = req;

    const include = [{ model: models.User, as: 'user' }];

    let profile = await models.Profile.findOne({ where: { userId: user.id } });
    let data = req.body;

    if (data.idNumber) {
      await user.update({ idNumber: data.idNumber });
    }

    if (profile) {
      const { healthInformation, personalInformation, generalInformation } = profile;

      data = _.merge({}, { healthInformation, personalInformation, generalInformation }, data);
      await profile.update({
        ...data
      });
    } else {
      profile = await models.Profile.create({ ...req.body, userId: user.id }, { include });
    }

    await profile.reload();

    return [201, { profile }];
  }


  static async retrieveProfile(req) {
    const { user: { id } } = req;

    const profile = await models.Profile.findOne({
      where: { userId: id },
      include: [{
        model: models.User,
        as: 'user'
      }]
    });

    return [200, { profile }];
  }
}

export default ProfileController;
