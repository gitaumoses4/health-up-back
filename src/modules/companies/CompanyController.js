import models from '../../database/models';
import T from '../../utils/T';
import UserController from '../users/UserController';

const include = [{
  model: models.User,
  as: 'owner'
}];
class CompanyController {
  static async updateProfile(req) {
    const { body, user: { company: { id } } } = req;

    const company = await models.Company.findByPk(id, {
      include
    });

    await company.update({
      ...body
    });

    return [200, { company }, T.successful];
  }

  static async fetchCompany(req) {
    const { user: { company: { id } } } = req;

    const company = await models.Company.findByPk(id, { include });

    return [200, { company }, T.successful];
  }


  static async addEmployee(req) {
    const { user: { company: { id } } } = req;
    const user = await UserController.createUserAccount(req);

    await user.update({ worksFor: id });

    return [201, { user }, T.successful];
  }

  static async getEmployees(req) {
    const { user: { company: { id } } } = req;
    const users = await models.User.findAll({
      where: {
        worksFor: id
      },
      include: [{
        model: models.Profile,
        as: 'profile'
      }, {
        model: models.HealthInformation,
        as: 'healthInformation'
      }]
    });

    return [200, { users }];
  }
}

export default CompanyController;
