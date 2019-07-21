

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('NotificationConditions', [
    {
      id: 1,
      name: 'USER_HEALTHY',
      field: 'profile.healthInformation.familyHistory',
      createdAt: '2019-07-19T09:43:54.535Z',
      updatedAt: '2019-07-19T09:43:54.535Z',
    },
    {
      id: 2,
      name: 'USER_SICK',
      field: 'profile.healthInformation.currentIllness',
      createdAt: '2019-07-19T09:43:54.535Z',
      updatedAt: '2019-07-19T09:43:54.535Z',
    }
  ]),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('NotificationConditions', null, {})
};
