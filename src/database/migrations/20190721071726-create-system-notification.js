
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
    time: {
      type: Sequelize.TIME,
      allowNull: false,
      defaultValue: '00:00'
    },
    weekDay: {
      type: Sequelize.ENUM(
        'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'
      ),
      allowNull: true,
    },
    month: {
      type: Sequelize.ENUM(
        'january', 'february', 'march', 'april', 'may', 'june',
        'july', 'august', 'september', 'october', 'november', 'december'
      ),
      allowNull: true
    },
    day: {
      type: Sequelize.INTEGER,
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
    await queryInterface.sequelize.query('DROP TYPE "enum_SystemNotifications_month"');
    await queryInterface.sequelize.query('DROP TYPE "enum_SystemNotifications_weekDay"');
  }
};
