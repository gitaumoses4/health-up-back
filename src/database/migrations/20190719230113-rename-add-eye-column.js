

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.renameColumn(
    'HealthInformations',
    'eyeDoctor',
    'earDoctor'
  ),

  down: (queryInterface, Sequelize) => queryInterface.renameColumn(
    'HealthInformations',
    'earDoctor',
    'eyeDoctor'
  )
};
