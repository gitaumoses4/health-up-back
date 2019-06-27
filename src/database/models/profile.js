const generateFields = require('../../utils/db');

module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', generateFields(DataTypes, [
    'fullName',
    'medicalFileNumber',
    'idNumber',
    'nationality',
    {
      age: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    },
    {
      dateOfBirth: {
        type: DataTypes.DATE,
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
        type: DataTypes.BOOLEAN,
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
  ]), {});
  Profile.associate = (models) => {
    Profile.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  };
  return Profile;
};
