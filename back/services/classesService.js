const classesRepository = require("../repositories/classesRepository");

const getAllClasses = async (sequelize) => {
  try {
    return classesRepository.getAllClasses(sequelize);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllClasses,
};
