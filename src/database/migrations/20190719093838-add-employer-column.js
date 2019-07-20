module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Users', 'worksFor', {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: 'Companies',
      as: 'employer'
    }
  }),

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Users', 'Users_worksFor_fkey');
    await queryInterface.removeColumn('Users', 'worksFor');
  }
};
