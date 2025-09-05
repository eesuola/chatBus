'use strict';

module.exports = (sequelize, DataTypes) => {
  const Participant = sequelize.define(
    "Participant",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
    },
    {
      timestamps: true,
    }
  );

  Participant.associate = (models) => {
    Participant.belongsTo(models.User, { foreignKey: "userId" });
    Participant.belongsTo(models.Conversation, { foreignKey: "conversationId" });
  };

  return Participant;
};
