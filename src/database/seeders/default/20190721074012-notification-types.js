

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('NotificationTypes', [
    {
      id: 1,
      name: 'Blood Diseases',
      alert: 'frequency',
      createdAt: '2019-07-19T09:43:54.535Z',
      updatedAt: '2019-07-19T09:43:54.535Z',
      field: 'bloodDiseases',
      configuration: JSON.stringify({
        frequency: 'weekly',
        time: '17:00',
        weekDay: 'thursday'
      }),
      single: false
    },
    {
      id: 2,
      name: 'Blood Pressure',
      alert: 'frequency',
      createdAt: '2019-07-19T09:43:54.535Z',
      updatedAt: '2019-07-19T09:43:54.535Z',
      field: 'bloodPressure',
      single: false
    },
    {
      id: 3,
      name: 'Diabetes',
      alert: 'frequency',
      createdAt: '2019-07-19T09:43:54.535Z',
      updatedAt: '2019-07-19T09:43:54.535Z',
      field: 'sugar',
      single: false
    },
    {
      id: 4,
      name: 'General Alert',
      createdAt: '2019-07-19T09:43:54.535Z',
      alert: 'frequency',
      updatedAt: '2019-07-19T09:43:54.535Z',
      single: false
    },
    {
      id: 5,
      name: 'General Alert based on Date',
      alert: 'frequency',
      createdAt: '2019-07-19T09:43:54.535Z',
      updatedAt: '2019-07-19T09:43:54.535Z',
      single: true
    },
    {
      id: 6,
      name: 'Psychological Alert',
      alert: 'frequency',
      createdAt: '2019-07-19T09:43:54.535Z',
      updatedAt: '2019-07-19T09:43:54.535Z',
      single: false
    },
    {
      id: 7,
      name: 'Respiratory System Disease',
      alert: 'frequency',
      createdAt: '2019-07-19T09:43:54.535Z',
      updatedAt: '2019-07-19T09:43:54.535Z',
      field: 'respiratory',
      single: false
    },
    {
      id: 8,
      name: 'Visit to the dentist',
      alert: 'range',
      createdAt: new Date(),
      updatedAt: new Date(),
      field: 'dentist',
      single: true
    },
    {
      id: 9,
      name: 'Visit to the ophthalmologist',
      createdAt: new Date(),
      updatedAt: new Date(),
      alert: 'range',
      single: true,
      field: 'ophthalmologist'
    },
    {
      id: 10,
      name: 'Visit to the ear doctor',
      createdAt: new Date(),
      updatedAt: new Date(),
      alert: 'range',
      single: true,
      field: 'earDoctor'
    },
    {
      id: 11,
      name: 'Blood Analysis',
      createdAt: new Date(),
      updatedAt: new Date(),
      alert: 'range',
      single: true,
      field: 'bloodAnalysis'
    },
    {
      id: 12,
      name: 'Diabetes Alerts on Ramadan',
      alert: 'frequency',
      createdAt: '2019-07-19T09:43:54.535Z',
      updatedAt: '2019-07-19T09:43:54.535Z',
      field: 'sugar',
      single: true
    },
  ]),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete(
    'NotificationTypes', null, {}
  )
};
