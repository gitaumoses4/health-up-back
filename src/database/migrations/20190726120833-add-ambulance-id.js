

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'Users', 'ambulanceId', {
      type: Sequelize.STRING,
      allowNull: true
    }
  ),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn('Users', 'ambulanceId')
};
