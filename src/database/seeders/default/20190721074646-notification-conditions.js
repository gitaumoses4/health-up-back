

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('NotificationConditions', [
    {
      id: 1,
      name: 'USER HEALTHY',
      field: JSON.stringify({
        key: 'profile.healthInformation.familyHistory',
        operator: 'eq',
        value: true
      }),
      createdAt: '2019-07-19T09:43:54.535Z',
      updatedAt: '2019-07-19T09:43:54.535Z',
    },
    {
      id: 2,
      name: 'USER SICK',
      field: JSON.stringify({
        key: 'profile.healthInformation.currentIllness',
        operator: 'eq',
        value: true
      }),
      createdAt: '2019-07-19T09:43:54.535Z',
      updatedAt: '2019-07-19T09:43:54.535Z',
    },
    {
      id: 3,
      name: 'DATE SET',
      field: JSON.stringify({
        key: 'healthInformation',
        operator: 'lt',
        value: ''
      }),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 4,
      name: 'DOESN\'T REMEMBER',
      field: JSON.stringify({
        key: 'healthInformation',
        operator: 'eq',
        value: 'doesntRemember'
      }),
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('NotificationConditions', null, {})
};
