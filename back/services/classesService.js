const classesRepository = require("../repositories/classesRepository");

const getAllClasses = async (sequelize, classNumber) => {
  try {
    return classesRepository.getAllClasses(sequelize, classNumber);
  } catch (error) {
    throw error;
  }
};

const createAllClasses = async (connection) => {
  const classes = [];
  //hardcoded
  for (let index = 0; index < 1000; index++) {
    classes.push({
      class_number: index,
      has_projector: false,
      has_computers: false,
      
    });
  }

  await connection.models.Class.bulkCreate(classes, { createdAt: false });

}

module.exports = {
  getAllClasses,
  createAllClasses
};
