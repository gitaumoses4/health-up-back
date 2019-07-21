
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
    time: {
      type: Sequelize.TIME,
      allowNull: false,
    },
    date: {
      type: Sequelize.DATE,
      allowNull: true
    },
    frequency: {
      type: Sequelize.ENUM('daily', 'weekly', 'monthly', 'yearly'),
      allowNull: false,
      defaultValue: 'weekly'
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
    await queryInterface.sequelize.query('DROP TYPE "enum_SystemNotifications_frequency"');
  }
};
