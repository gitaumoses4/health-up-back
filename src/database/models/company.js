
module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    naturalBusiness: {
      type: DataTypes.STRING,
      allowNull: true
    },
    registrationNumber: {
      type: DataTypes.STRING
    },
    noOfEmployees: {
      type: DataTypes.INTEGER
    },
    responsibleName: {
      type: DataTypes.STRING
    },
    receipt: {
      type: DataTypes.STRING
    },
    verified: {
      type: DataTypes.BOOLEAN
    },
    verifiedAt: {
      type: DataTypes.DATE
    },
  }, {});
  Company.associate = (models) => {
    Company.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'owner'
    });
    Company.hasMany(models.User, {
      foreignKey: 'worksFor',
      as: 'employees'
    });
  };
  return Company;
};
