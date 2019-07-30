

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('NotificationTypes', [
    {
      id: 1,
      name: 'Blood Diseases',
      alert: 'frequency',
      createdAt: '2019-07-19T09:43:54.535Z',
      updatedAt: '2019-07-19T09:43:54.535Z',
      field: 'bloodDiseases'
    },
    {
      id: 2,
      name: 'Blood Pressure',
      alert: 'frequency',
      createdAt: '2019-07-19T09:43:54.535Z',
      updatedAt: '2019-07-19T09:43:54.535Z',
      field: 'bloodPressure'
    },
    {
      id: 3,
      name: 'Diabetes',
      alert: 'frequency',
      createdAt: '2019-07-19T09:43:54.535Z',
      updatedAt: '2019-07-19T09:43:54.535Z',
      field: 'sugar'
    },
    {
      id: 4,
      name: 'General Alert',
      createdAt: '2019-07-19T09:43:54.535Z',
      alert: 'frequency',
      updatedAt: '2019-07-19T09:43:54.535Z',
    },
    {
      id: 5,
      alert: 'frequency',
      name: 'General Alert based on Date',
      createdAt: '2019-07-19T09:43:54.535Z',
      updatedAt: '2019-07-19T09:43:54.535Z',
    },
    {
      id: 6,
      name: 'Psychological Alert',
      alert: 'frequency',
      createdAt: '2019-07-19T09:43:54.535Z',
      updatedAt: '2019-07-19T09:43:54.535Z',
    },
    {
      id: 7,
      name: 'Respiratory System Disease',
      alert: 'frequency',
      createdAt: '2019-07-19T09:43:54.535Z',
      updatedAt: '2019-07-19T09:43:54.535Z',
      field: 'respiratory'
    },
    {
      id: 8,
      name: 'Visit to the dentist',
      alert: 'frequency',
      createdAt: new Date(),
      updatedAt: new Date(),
      field: 'dentist'
    },
    {
      id: 9,
      name: 'Visit to the ophthalmologist',
      createdAt: new Date(),
      updatedAt: new Date(),
      alert: 'range',
      field: 'ophthalmologist'
    },
    {
      id: 10,
      name: 'Visit to the ear doctor',
      createdAt: new Date(),
      updatedAt: new Date(),
      alert: 'range',
      field: 'earDoctor'
    },
    {
      id: 11,
      name: 'Blood Analysis',
      createdAt: new Date(),
      updatedAt: new Date(),
      alert: 'range',
      field: 'bloodAnalysis'
    }
  ]),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('NotificationTypes', null, {})
};
