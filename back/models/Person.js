const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Person = sequelize.define(
    "Person",
    {
      username: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "person",
      schema: "keys",
      timestamps: false,
    }
  );

  return Person;
};
