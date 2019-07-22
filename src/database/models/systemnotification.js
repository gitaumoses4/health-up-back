
module.exports = (sequelize, DataTypes) => {
  const SystemNotification = sequelize.define('SystemNotification', {
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: '00:00'
    },
    weekDay: {
      type: DataTypes.STRING,
    },
    month: {
      type: DataTypes.STRING
    },
    day: {
      type: DataTypes.INTEGER
    },
    frequency: {
      type: DataTypes.STRING
    },
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
