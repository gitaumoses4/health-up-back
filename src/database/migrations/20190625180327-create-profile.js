const generateFields = require('../../utils/db');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(
    'Profiles', generateFields(Sequelize, [
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
      },
      'fullName',
      'idNumber',
      'nationality',
      {
        age: {
          type: Sequelize.INTEGER,
          allowNull: true
        }
      },
      {
        dateOfBirth: {
          type: Sequelize.DATE,
          allowNull: true
        }
      },
      {
        personalInformation: {
          type: Sequelize.JSON,
          allowNull: true,
          defaultValue: {}
        }
      },
      {
        healthInformation: {
          type: Sequelize.JSON,
          allowNull: true,
          defaultValue: {}
        }
      },
      {
        generalInformation: {
          type: Sequelize.JSON,
          allowNull: true,
          defaultValue: {}
        }
      },
      {
        userId: {
          type: Sequelize.INTEGER,
          onDelete: 'cascade',
          allowNull: false,
          references: {
            model: 'Users',
            as: 'user'
          }
        }
      },
      {
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
      },
      {
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      }
    ])
  ),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Profiles')
};
