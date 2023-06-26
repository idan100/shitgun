const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Class = sequelize.define(
    "Class",
    {
      class_number: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
      },
      has_projector: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      has_computers: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "class",
      schema: "keys",
    }
  );

  return Class;
};
