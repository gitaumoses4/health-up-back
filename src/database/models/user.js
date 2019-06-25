
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('User',
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
  user.associate = (models) => {
    // associations can be defined here
  };
  return user;
};
