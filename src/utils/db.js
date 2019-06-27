const generateFields = (Sequelize, fields) => fields.reduce((acc, cur) => {
  let field = {};
  if (cur.constructor !== Object) {
    field[cur] = {
      type: Sequelize.STRING,
      allowNull: true
    };
  } else {
    field = cur;
  }
  return {
    ...acc,
    ...field
  };
}, {});

module.exports = generateFields;
