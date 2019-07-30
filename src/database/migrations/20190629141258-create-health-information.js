
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('HealthInformations', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    dentist: {
      allowNull: true,
      type: Sequelize.TEXT
    },
    ophthalmologist: {
      allowNull: true,
      type: Sequelize.TEXT
    },
    eyeDoctor: {
      allowNull: true,
      type: Sequelize.TEXT
    },
    bloodAnalysis: {
      allowNull: true,
      type: Sequelize.TEXT
    },
    userId: {
      type: Sequelize.INTEGER,
      onDelete: 'cascade',
      allowNull: false,
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('HealthInformations')
};
