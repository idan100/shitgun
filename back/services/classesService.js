const classesRepository = require("../repositories/classesRepository");

const getAllClasses = async (sequelize, classNumber) => {
  try {
    return classesRepository.getAllClasses(sequelize, classNumber);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllClasses,
};
