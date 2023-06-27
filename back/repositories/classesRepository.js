
const { Op } = require("sequelize");

const createClass = async(sequelize,classObject) => {
  try {
    
    const createdClass = await sequelize.models.Class.create(
      classObject
    );
    return createdClass;

  } catch (error) {
    console.error("Unable to fetch classes from the database:", error);
    throw error;
  } 

};


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
  } 
};

module.exports = {
  getAllClasses,
  createClass
};
