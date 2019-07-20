import T from './T';

export const NORMAL_USER = 'normal_user';
export const COMPANY = 'company';
export const ADMINISTRATOR = 'admin';
export const AMBULANCE_MAN = 'ambulance_man';

const accountTypes = {
  [NORMAL_USER]: T.normal_user,
  [COMPANY]: T.company,
  [ADMINISTRATOR]: T.admin,
  [AMBULANCE_MAN]: T.ambulance_man,
};

export const ALL = Object.keys(accountTypes);

export default accountTypes;
