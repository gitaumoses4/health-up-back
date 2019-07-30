const env = require('./environment.js');

const defaultConfig = {
  databaseUrl: env.DATABASE_URL,
  use_env_variable: 'DATABASE_URL',
};

const database = {
  development: {
    ...defaultConfig,
  },
  test: {
    ...defaultConfig,
    databaseUrl: env.TEST_DATABASE_URL
  },
  staging: {
    ...defaultConfig,
  },
  production: {
    ...defaultConfig,
  },
};

module.exports = database;
