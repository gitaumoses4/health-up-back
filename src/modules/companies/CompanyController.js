import models from '../../database/models';
import T from '../../utils/T';

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
}

export default CompanyController;
