
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('SystemNotifications', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    text: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    notificationTypeId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: 'cascade',
      references: {
        model: 'NotificationTypes',
        as: 'types'
      }
    },
    notificationConditionId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      onDelete: 'cascade',
      references: {
        model: 'NotificationConditions',
        as: 'condition'
      }
    },
    configuration: {
      type: Sequelize.JSON,
      allowNull: false
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('SystemNotifications');
  }
};
