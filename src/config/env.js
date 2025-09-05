require("dotenv").config();
module.exports = {
  port: process.env.PORT || 4000,
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "chatBus",
  host: process.env.DB_HOST || "127.0.0.1",
  dialect: process.env.DB_DIALECT || "postgres",
  redisUrl: process.env.REDIS_URL || "redis://localhost:6379",
  jwtSecret: process.env.JWT_SECRET,
  corsOrigin: (process.env.CORS_ORIGIN || "").split(",").filter(Boolean) || true
};
