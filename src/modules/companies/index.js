import CompanyController from './CompanyController';
import CRUDController from '../../utils/CRUDController';

export default new CRUDController('Company', '/companies', CompanyController, {
  exclude: ['create']
});
