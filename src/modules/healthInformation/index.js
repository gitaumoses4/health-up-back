import CRUDController from '../../utils/CRUDController';

export default new CRUDController('HealthInformation', '/healthInformation', {
  create: {
    fields: '*',
    preCreate: () => ({ userId: 1 })
  }
}, {});
