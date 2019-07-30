const dotenv = require('dotenv');

dotenv.config();

// set this up to ensure the project cannot run until some of the environment variables
// have been fulfilled

module.exports = {
  PORT: process.env.PORT || 5000,
  DATABASE_URL: process.env.DATABASE_URL,
  TEST_DATABASE_URL: process.env.TEST_DATABASE_URL,
  DATABASE_DIALECT: 'postgres',
};
