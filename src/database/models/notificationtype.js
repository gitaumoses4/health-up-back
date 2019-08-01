
module.exports = (sequelize, DataTypes) => {
  const NotificationType = sequelize.define('NotificationType', {
    name: DataTypes.STRING,
    field: DataTypes.STRING,
    alert: DataTypes.STRING,
    single: DataTypes.BOOLEAN,
    configuration: DataTypes.JSON,
    sentNotification: DataTypes.INTEGER
  }, {});
  NotificationType.associate = (models) => {
    NotificationType.belongsToMany(models.NotificationCondition, {
      foreignKey: 'notificationTypeId',
      as: 'conditions',
      through: models.NotificationTypeConditions
    });

    NotificationType.hasMany(models.SystemNotification, {
      foreignKey: 'notificationTypeId',
      as: 'notifications',
    });
  };
  return NotificationType;
};
