
module.exports = (sequelize, DataTypes) => {
  const PasswordResetToken = sequelize.define('PasswordResetToken', {
    token: DataTypes.STRING
  }, {});
  PasswordResetToken.associate = (models) => {
    PasswordResetToken.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId'
    });
  };
  return PasswordResetToken;
};
