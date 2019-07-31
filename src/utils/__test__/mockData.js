const notificationType = (...overrides) => ({
  id: 1,
  name: 'Blood Diseases',
  alert: 'frequency',
  field: 'bloodDiseases',
  configuration: {
    frequency: 'weekly',
    time: '17:00',
    weekDay: 'thursday'
  },
  single: false,
  ...overrides
});

export const profile = (...overrides) => ({
  id: 1,
  fullName: 'Moses Muigai Gitau',
  idNumber: '123',
  nationality: 'Kenya',
  age: 120,
  dateOfBirth: '2019-08-01T00:00:00.000Z',
  personalInformation: {},
  generalInformation: {},
  healthInformation: {
    bloodType: 'A+',
    smoker: 'yes',
    drugsUsed: 'Drugs used',
    operations: 'yes',
    operationsHad: 'I have had operations',
    familyHistory: {
      sugar: true,
      bloodPressure: true,
      bloodDiseases: true,
      respiratory: false,
      heartDiseases: false
    },
    currentIllness: {
      sugar: true,
      bloodPressure: true,
      bloodDiseases: true,
      respiratory: false,
      heartDiseases: true
    },
    allergies: {
      food: true,
      drugs: false,
      animals: true,
      plants: true,
      others: false
    },
  },
  ...overrides
});

const healthInformation = (...overrides) => ({
  id: 1,
  dentist: null,
  ophthalmologist: '2019-07-31',
  earDoctor: null,
  bloodAnalysis: null,
  userId: 2,
  ...overrides
});

const user = (...overrides) => ({
  id: 2,
  name: 'Moses Muigai Gitau',
  email: 'gitaumoses4@gmail.com',
  accountType: 'normal_user',
  profile: profile(...(overrides.profile || {})),
  healthInformation: healthInformation(...(overrides.healthInformation || {})),
  ...overrides
});

const configuration = (...overrides) => ({
  frequency: 'weekly',
  time: '21:00',
  weekDay: 'monday',
  ...overrides
});

const notification = (...overrides) => ({
  id: 1,
  text: 'Please remember to visit the ophthalmologist',
  configuration: {
    rangeValue: '1',
    range: 'days'
  },
  notificationTypeId: 9,
  notificationConditionId: 3,
  ...overrides
});

const condition = (...overrides) => ({
  id: 3,
  name: 'USER SICK',
  field: {
    key: 'healthInformation'
  },
  ...overrides
});


export default {
  notificationType,
  profile,
  healthInformation,
  user,
  configuration,
  notification,
  condition
};
