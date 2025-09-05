'use strict';

module.exports = (sequelize, DataTypes) => {
  const Attachment = sequelize.define(
    "Attachment",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING, // e.g., image, file, video
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );

  Attachment.associate = (models) => {
    Attachment.belongsTo(models.Message, { foreignKey: "messageId" });
  };

  return Attachment;
};
