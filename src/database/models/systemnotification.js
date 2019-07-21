
module.exports = (sequelize, DataTypes) => {
  const SystemNotification = sequelize.define('SystemNotification', {
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true
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
  };
  return SystemNotification;
};
