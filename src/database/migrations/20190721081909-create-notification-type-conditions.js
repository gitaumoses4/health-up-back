
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('NotificationTypeConditions', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    notificationTypeId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: 'cascade',
      references: {
        model: 'NotificationTypes',
        as: 'notificationType'
      }
    },
    notificationConditionId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: 'cascade',
      references: {
        model: 'NotificationConditions',
        as: 'notificationConditions'
      }
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('NotificationTypeConditions')
};
