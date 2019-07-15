import models from '../../database/models';

class ProfileController {
  static async updateProfile(req) {
    const { user } = req;

    const profile = await models.Profile.findOrCreate({
      where: { userId: user.id },
      defaults: { ...req.body, userId: user.id },
      include: [{
        model: models.User,
        as: 'user'
      }]
    });

    await profile[0].reload();

    return [201, { profile: profile[0] }];
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
