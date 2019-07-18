import models from '../../database/models';

class HealthInformationController {
  static async createHealthInformation(req) {
    const { user } = req;
    const include = [{ model: models.User, as: 'user' }];

    let healthInformation = await models.HealthInformation.findOne({
      where: { userId: user.id }, include
    });

    if (healthInformation) {
      await healthInformation.update({ ...req.body });
    } else {
      healthInformation = await models.HealthInformation.create({
        ...req.body,
        userId: user.id
      },
      { include });
    }

    await healthInformation.reload();

    return [200, { healthInformation }];
  }


  static async retrieveHealthInformation(req) {
    const { user } = req;

    const healthInformation = await models.HealthInformation.findOne({
      where: {
        userId: user.id
      },
      include: [{
        model: models.User,
        as: 'user'
      }]
    });

    return [200, { healthInformation }];
  }
}

export default HealthInformationController;
