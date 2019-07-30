

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('NotificationConditions', [
    {
      id: 1,
      name: 'USER HEALTHY',
      field: JSON.stringify({
        key: 'profile.healthInformation.familyHistory',
      }),
      createdAt: '2019-07-19T09:43:54.535Z',
      updatedAt: '2019-07-19T09:43:54.535Z',
    },
    {
      id: 2,
      name: 'USER SICK',
      field: JSON.stringify({
        key: 'profile.healthInformation.currentIllness',
      }),
      createdAt: '2019-07-19T09:43:54.535Z',
      updatedAt: '2019-07-19T09:43:54.535Z',
    },
    {
      id: 3,
      name: 'DATE SET',
      field: JSON.stringify({
        key: 'healthInformation',
      }),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 4,
      name: 'DOESN\'T REMEMBER',
      field: JSON.stringify({
        key: 'healthInformation',
      }),
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('NotificationConditions', null, {})
};
