
module.exports = (sequelize, DataTypes) => {
  const HealthInformation = sequelize.define('HealthInformation', {
    dentist: {
      type: DataTypes.DATE
    },
    ophthalmologist: {
      type: DataTypes.DATE
    },
    earDoctor: {
      type: DataTypes.DATE
    },
    bloodAnalysis: {
      type: DataTypes.DATE
    }
  }, {});
  HealthInformation.associate = function (models) {
    HealthInformation.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  };
  return HealthInformation;
};
