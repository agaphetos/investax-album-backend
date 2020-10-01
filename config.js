require('dotenv').config();

module.exports = {
  env: process.env.NODE_ENV || 'development',
  web: {
    port: process.env.PORT || 8888,
  },
  db: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    name: process.env.DB_NAME,
    options: process.env.DB_OPTIONS,
  },
};
