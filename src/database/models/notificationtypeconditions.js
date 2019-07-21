
module.exports = (sequelize, DataTypes) => {
  const NotificationTypeConditions = sequelize.define('NotificationTypeConditions', {
  }, {});
  NotificationTypeConditions.associate = function (models) {
    NotificationTypeConditions.hasOne(models.NotificationCondition, {
      foreignKey: 'notificationConditionId',
      as: 'notificationCondition'
    });
    NotificationTypeConditions.hasOne(models.NotificationType, {
      foreignKey: 'notificationTypeId',
      as: 'notificationType'
    });
  };
  return NotificationTypeConditions;
};
