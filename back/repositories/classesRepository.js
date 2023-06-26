// const ClassModel = require("../models/Class");

const getAllClasses = async (sequelize) => {
  try {
    const classes = await sequelize.models.Class.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    return classes;
  } catch (error) {
    console.error("Unable to fetch classes from the database:", error);
    throw error;
  }
};

module.exports = {
  getAllClasses,
};
