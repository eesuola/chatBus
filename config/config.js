require("dotenv").config();
const { Sequelize } = require("sequelize");

const env = process.env.NODE_ENV || "development";

const baseConfig = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  logging: false
};

const configs = {
  development: baseConfig,
  test: {
    ...baseConfig,
    database: process.env.DB_NAME + "_test"
  },
  production: baseConfig
};

// ✅ Export both for CLI and app
module.exports = {
  ...configs,
  sequelize: new Sequelize(
    baseConfig.database,
    baseConfig.username,
    baseConfig.password,
    baseConfig
  )
};
