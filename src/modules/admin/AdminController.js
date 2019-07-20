import models from '../../database/models';
import T from '../../utils/T';
import { AMBULANCE_MAN } from '../../utils/accountTypes';
import UserController from '../users/UserController';

const include = [{
  model: models.User,
  as: 'owner'
}, {
  model: models.User,
  as: 'employees'
}];
class AdminController {
  static async listCompanies() {
    const companies = await models.Company.findAll({
      include: [{
        model: models.User,
        as: 'owner'
      }]
    });

    return [200, { companies }];
  }

  static async getCompany(req) {
    const { params: { id } } = req;

    const company = await models.Company.findByPk(id, {
      include
    });

    if (!company) {
      return [404, undefined, T.not_found];
    }
    return [200, { company }];
  }


  static async verifyCompany(req) {
    const { params: { id } } = req;
    const company = await models.Company.findByPk(id, { include });
    if (!company) {
      return [404, undefined, T.not_found];
    }

    await company.update({ verified: true, verifiedAt: new Date() });
    await company.reload();

    return [200, { company }, T.successful];
  }

  static async listAmbulances(req) {
    const ambulances = await models.User.findAll({
      where: {
        accountType: AMBULANCE_MAN
      },
    });
    return [200, { ambulances }];
  }


  static async createAmbulanceMan(req) {
    const user = await UserController.createUserAccount(req);

    await user.update({ accountType: AMBULANCE_MAN });

    return [201, { user }, T.successful];
  }
}

export default AdminController;
