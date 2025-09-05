'use strict';

module.exports = (sequelize, DataTypes) => {
  const MessageRead = sequelize.define(
    "MessageRead",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      readAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );

  MessageRead.associate = (models) => {
    MessageRead.belongsTo(models.Message, { foreignKey: "messageId" });
    MessageRead.belongsTo(models.User, { foreignKey: "userId" });
  };

  return MessageRead;
};
