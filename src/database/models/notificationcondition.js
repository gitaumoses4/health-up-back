
module.exports = (sequelize, DataTypes) => {
  const NotificationCondition = sequelize.define('NotificationCondition', {
    name: DataTypes.STRING
  }, {});
  NotificationCondition.associate = (models) => {
    NotificationCondition.belongsToMany(models.NotificationType, {
      through: models.NotificationTypeConditions,
      foreignKey: 'notificationConditionId',
      as: 'notificationTypes',
    });
  };
  return NotificationCondition;
};
