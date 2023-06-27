const classesRepository = require("../repositories/classesRepository");

const auth = async (sequelize, username, password) => {
  try {
    const person = await sequelize.models.Person.findOne(
      {
        where: {
          id: username,
        }
      }
    );

    return person ? (person.password === password):false;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  auth,

};
