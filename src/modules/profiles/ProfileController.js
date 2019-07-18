import _ from 'lodash';
import models from '../../database/models';

class ProfileController {
  static async updateProfile(req) {
    const { user } = req;

    const include = [{ model: models.User, as: 'user' }];

    let profile = await models.Profile.findOne({ where: { userId: user.id } });
    let data = req.body;

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
