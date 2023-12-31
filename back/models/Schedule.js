const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Schedule = sequelize.define(
    "Schedule",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      class_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "schedule",
      schema: "keys",
      timestamps: false,
    }
  );

  return Schedule;
};
