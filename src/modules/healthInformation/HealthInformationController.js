import models from '../../database/models';

class HealthInformationController {
  static async createHealthInformation(req) {
    const { user } = req;

    const healthInformation = await models.HealthInformation.findOrCreate({
      where: { userId: user.id },
      defaults: { ...req.body, userId: user.id },
      include: [{
        model: models.User,
        as: 'user'
      }]
    });

    await healthInformation[0].reload();

    return [200, { healthInformation: healthInformation[0] }];
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
