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
      'medicalFileNumber',
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
        },
      },
      'location',
      'placeOfResidence',
      'mobileNumber',
      'emergencyNumber1',
      'emergencyNumber2',
      'bloodType',
      {
        smoker: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
        }
      },
      'drugsUsed',
      'operations',
      'familyHistory',
      'currentIllness',
      'allergies',
      'height',
      'weight',
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
