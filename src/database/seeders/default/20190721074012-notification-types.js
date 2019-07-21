

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('NotificationTypes', [
    {
      id: 1,
      name: 'Blood Diseases',
      createdAt: '2019-07-19T09:43:54.535Z',
      updatedAt: '2019-07-19T09:43:54.535Z',
      field: 'bloodDiseases'
    },
    {
      id: 2,
      name: 'Blood Pressure',
      createdAt: '2019-07-19T09:43:54.535Z',
      updatedAt: '2019-07-19T09:43:54.535Z',
      field: 'bloodPressure'
    },
    {
      id: 3,
      name: 'Diabetes',
      createdAt: '2019-07-19T09:43:54.535Z',
      updatedAt: '2019-07-19T09:43:54.535Z',
      field: 'sugar'
    },
    {
      id: 4,
      name: 'General Alert',
      createdAt: '2019-07-19T09:43:54.535Z',
      updatedAt: '2019-07-19T09:43:54.535Z',
    },
    {
      id: 5,
      name: 'General Alert based on Date',
      createdAt: '2019-07-19T09:43:54.535Z',
      updatedAt: '2019-07-19T09:43:54.535Z',
    },
    {
      id: 6,
      name: 'Psychological Alert',
      createdAt: '2019-07-19T09:43:54.535Z',
      updatedAt: '2019-07-19T09:43:54.535Z',
    },
    {
      id: 7,
      name: 'Respiratory System Disease',
      createdAt: '2019-07-19T09:43:54.535Z',
      updatedAt: '2019-07-19T09:43:54.535Z',
      field: 'respiratory'
    }
  ]),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('NotificationTypes', null, {})
};
