"use strict";
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require("../../config/config.js"); // ✅ unified config
const db = {};

const sequelize = config.sequelize; // ✅ reuse same Sequelize instance

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const required = require(path.join(__dirname, file));
    console.log("Loaded:", file, "=>", typeof required); // 👈 debug output

    if (typeof required === "function") {
      const model = required(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    } else {
      console.error("❌ Model file does not export a function:", file);
    }
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
