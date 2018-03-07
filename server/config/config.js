const dotenv = require('dotenv');

dotenv.load();

module.exports = {
  "development": {
    "username": "andeladeveloper",
    "password": null,
    "database": "wechat",
    "host": "127.0.0.1",
    "port": 5432,
    "dialect": "postgres"
  },
  "test": {
    use_env_variable: 'DATABASE_TEST_URL',
    dialect: 'postgres'
  },
  "production": {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres'
  }
};
