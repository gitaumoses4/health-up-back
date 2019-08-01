
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('PasswordResetTokens', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    token: {
      type: Sequelize.STRING
    },
    userId: {
      type: Sequelize.INTEGER,
      onDelete: 'cascade',
      references: {
        model: 'Users',
        as: 'user'
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('PasswordResetTokens')
};
