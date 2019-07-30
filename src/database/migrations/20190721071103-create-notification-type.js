
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('NotificationTypes', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    field: {
      type: Sequelize.STRING,
      allowNull: true
    },
    alert: {
      type: Sequelize.ENUM('frequency', 'range'),
      defaultValue: 'frequency',
      allowNull: false
    },
    single: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    },
    configuration: {
      type: Sequelize.JSON,
      allowNull: true
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
    await queryInterface.dropTable('NotificationTypes');
    await queryInterface.sequelize.query('DROP TYPE "enum_NotificationTypes_alert"');
  }
};
