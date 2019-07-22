

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [
    {
      name: 'Super Administrator',
      email: 'admin@healthupsa.com',
      accountType: 'admin',
      password: '$2b$10$Uuh7roV27NEjn1EraRwqdeirZ08fvL6RaBVfmiM1F.JzNE1Cf2Eju',
      createdAt: '2019-07-19T09:43:54.535Z',
      updatedAt: '2019-07-19T09:43:54.535Z',
      deletedAt: null,
      worksFor: null,
    }
  ]),

  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('Users', null, {});
  }
};
