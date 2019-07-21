

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('NotificationTypeConditions', [
    {
      id: 1,
      notificationTypeId: 1,
      notificationConditionId: 1,
      createdAt: '2019-07-19T09:43:54.535Z',
      updatedAt: '2019-07-19T09:43:54.535Z',
    },
    {
      id: 2,
      notificationTypeId: 1,
      notificationConditionId: 2,
      createdAt: '2019-07-19T09:43:54.535Z',
      updatedAt: '2019-07-19T09:43:54.535Z',
    },
    {
      id: 3,
      notificationTypeId: 2,
      notificationConditionId: 1,
      createdAt: '2019-07-19T09:43:54.535Z',
      updatedAt: '2019-07-19T09:43:54.535Z',
    },
    {
      id: 4,
      notificationTypeId: 2,
      notificationConditionId: 2,
      createdAt: '2019-07-19T09:43:54.535Z',
      updatedAt: '2019-07-19T09:43:54.535Z',
    },
    {
      id: 5,
      notificationTypeId: 3,
      notificationConditionId: 1,
      createdAt: '2019-07-19T09:43:54.535Z',
      updatedAt: '2019-07-19T09:43:54.535Z',
    },
    {
      id: 6,
      notificationTypeId: 3,
      notificationConditionId: 2,
      createdAt: '2019-07-19T09:43:54.535Z',
      updatedAt: '2019-07-19T09:43:54.535Z',
    },
    {
      id: 7,
      notificationTypeId: 7,
      notificationConditionId: 1,
      createdAt: '2019-07-19T09:43:54.535Z',
      updatedAt: '2019-07-19T09:43:54.535Z',
    },
    {
      id: 8,
      notificationTypeId: 7,
      notificationConditionId: 2,
      createdAt: '2019-07-19T09:43:54.535Z',
      updatedAt: '2019-07-19T09:43:54.535Z',
    }
  ]),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete(
    'NotificationTypeConditions',
    null, {}
  )
};
