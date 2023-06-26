// const ClassModel = require("../models/Class");
const { Op } = require("sequelize");

const getAllClasses = async (sequelize, classNumber) => {
  try {
    const classes = await sequelize.models.Class.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      where: {
        class_number: {
          [Op.like]: classNumber + "%",
        },
      },
    });
    return classes;
  } catch (error) {
    console.error("Unable to fetch classes from the database:", error);
    throw error;
  } finally {
    if (sequelize) {
      sequelize.close();
    }
  }
};

module.exports = {
  getAllClasses,
};
