
module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    status: {
      type: DataTypes.STRING
    },
    text: {
      type: DataTypes.TEXT
    }
  }, {});
  Notification.associate = (models) => {
    Notification.belongsTo(models.SystemNotification, {
      foreignKey: 'systemNotificationId',
      as: 'systemNotification'
    });

    Notification.belongsTo(models.User, {
      foreignKey: 'recipientId',
      as: 'recipient'
    });
  };
  return Notification;
};
