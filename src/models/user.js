"use strict";

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      role: {
        type: DataTypes.ENUM("agent", "admin", "customer"),
        allowNull: false,
        defaultValue: "customer",
      },
      displayName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "display_name", // maps to DB column
      },
      profile: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: {},
      },
      lastSeen: {
        type: DataTypes.DATE,
        field: "last_seen", // maps to DB column
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "users", // always lowercase plural in DB
      timestamps: true,
      underscored: true, // automatically converts createdAt -> created_at
    }
  );

  User.associate = (models) => {
    User.hasMany(models.Message, { foreignKey: "senderId" });
    User.hasMany(models.Participant, { foreignKey: "userId" });
  };

  return User;
};
