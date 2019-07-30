
module.exports = (sequelize, DataTypes) => {
  const HealthInformation = sequelize.define('HealthInformation', {
    dentist: {
      type: DataTypes.TEXT
    },
    ophthalmologist: {
      type: DataTypes.TEXT
    },
    earDoctor: {
      type: DataTypes.TEXT
    },
    bloodAnalysis: {
      type: DataTypes.TEXT
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
