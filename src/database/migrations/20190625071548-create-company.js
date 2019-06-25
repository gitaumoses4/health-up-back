
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Companies', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    naturalBusiness: {
      type: Sequelize.STRING,
      allowNull: true
    },
    registrationNumber: {
      type: Sequelize.STRING,
      allowNull: false
    },
    noOfEmployees: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    responsibleName: {
      type: Sequelize.STRING,
      allowNull: true
    },
    receipt: {
      type: Sequelize.STRING,
      allowNull: true
    },
    verified: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    verifiedAt: {
      type: Sequelize.DATE,
      allowNull: true
    },
    userId: {
      type: Sequelize.INTEGER,
      onDelete: 'cascade',
      allowNull: false,
      references: {
        model: 'Users',
        as: 'owner'
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Companies')
};
