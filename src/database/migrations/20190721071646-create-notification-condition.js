
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('NotificationConditions', {
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
      type: Sequelize.JSON,
      allowNull: true,
      defaultValue: {}
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('NotificationConditions')
};
