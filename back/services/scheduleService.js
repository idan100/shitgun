const classesRepository = require("../repositories/classesRepository");

const fetchSchedule = async (sequelize, classNumber, time) => {
  try {
    const classes = await sequelize.models.Schedule.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      where: {
        class_number: classNumber,
        start_date: time
      },
    });
    return classes;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  fetchSchedule,

};
