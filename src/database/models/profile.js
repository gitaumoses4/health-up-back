const generateFields = require('../../utils/db');

module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', generateFields(DataTypes, [
    'fullName',
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
    {
      personalInformation: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: {}
      }
    },
    {
      generalInformation: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: {}
      }
    },
    {
      healthInformation: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: {}
      }
    }
  ]), {});
  Profile.associate = (models) => {
    Profile.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  };
  return Profile;
};
