
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Notifications', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    systemNotificationId: {
      type: Sequelize.INTEGER,
      onDelete: 'cascade',
      allowNull: false,
      references: {
        model: 'SystemNotifications',
        as: 'systemNotification'
      }
    },
    recipientId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: 'cascade',
      references: {
        model: 'Users',
        as: 'recipient'
      }
    },
    status: {
      type: Sequelize.ENUM('pending', 'sent', 'unread', 'read'),
      defaultValue: 'pending'
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
    await queryInterface.dropTable('Notifications');
    await queryInterface.sequelize.query('DROP TYPE "enum_Notifications_status"');
  }
};
