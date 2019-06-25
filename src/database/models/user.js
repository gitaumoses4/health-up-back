
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User',
    {
      name: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING,
        unique: true
      },
      accountType: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING
      }
    }, {
      paranoid: true,
      defaultScope: {
        attributes: {
          exclude: ['password']
        }
      }
    });
  User.associate = (models) => {
    User.hasOne(models.Company, {
      foreignKey: 'userId',
      as: 'company'
    });
  };
  return User;
};
