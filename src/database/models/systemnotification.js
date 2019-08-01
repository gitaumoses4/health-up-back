
module.exports = (sequelize, DataTypes) => {
  const SystemNotification = sequelize.define('SystemNotification', {
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    configuration: {
      type: DataTypes.JSON,
    }
  }, {});
  SystemNotification.associate = function (models) {
    SystemNotification.belongsTo(models.NotificationType, {
      foreignKey: 'notificationTypeId',
      as: 'notificationType'
    });

    SystemNotification.belongsTo(models.NotificationCondition, {
      foreignKey: 'notificationConditionId',
      as: 'condition'
    });
  };
  return SystemNotification;
};
