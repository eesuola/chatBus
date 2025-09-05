'use strict';

module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    "Message",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      senderRole: {
        type: DataTypes.ENUM("agent", "customer"),
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );

  Message.associate = (models) => {
    Message.belongsTo(models.User, { foreignKey: "senderId", as: "sender" });
    Message.belongsTo(models.Conversation, { foreignKey: "conversationId" });
    Message.hasMany(models.MessageRead, { foreignKey: "messageId" });
    Message.hasMany(models.Attachment, { foreignKey: "messageId" });
  };

  return Message;
};
