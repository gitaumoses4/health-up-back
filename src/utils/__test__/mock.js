const mockModels = {
  notification: (...overrides) => ({
    text: 'This is a blood disease notification',
    notificationTypeId: 1,
    notificationConditionId: 1,
    time: '00:00:00',
    frequency: 'daily',
    createdAt: new Date(),
    updatedAt: new Date(),
  }),
  notifications: overrides => overrides.map(mockModels.notification)
};

const notifications = {
  bloodDisease: mockModels.notifications([
    { text: 'First notification' },
    { text: 'Second notification' },
    { text: 'Third notification' }
  ])
};

export default notifications;
