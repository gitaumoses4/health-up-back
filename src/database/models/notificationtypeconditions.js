
module.exports = (sequelize, DataTypes) => {
  const NotificationTypeConditions = sequelize.define('NotificationTypeConditions', {
  }, {});
  NotificationTypeConditions.associate = function (models) {
    NotificationTypeConditions.belongsTo(models.NotificationCondition, {
      foreignKey: 'notificationConditionId',
      as: 'notificationCondition'
    });
    NotificationTypeConditions.belongsTo(models.NotificationType, {
      foreignKey: 'notificationTypeId',
      as: 'notificationType'
    });
  };
  return NotificationTypeConditions;
};
