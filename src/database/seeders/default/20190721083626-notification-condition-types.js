

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
    },
    {
      id: 9,
      notificationTypeId: 8,
      notificationConditionId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 10,
      notificationTypeId: 8,
      notificationConditionId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 11,
      notificationTypeId: 9,
      notificationConditionId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 12,
      notificationTypeId: 9,
      notificationConditionId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 13,
      notificationTypeId: 10,
      notificationConditionId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 14,
      notificationTypeId: 10,
      notificationConditionId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 15,
      notificationTypeId: 11,
      notificationConditionId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 16,
      notificationTypeId: 11,
      notificationConditionId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ]),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete(
    'NotificationTypeConditions',
    null, {}
  )
};
