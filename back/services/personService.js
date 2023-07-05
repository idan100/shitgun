const classesRepository = require("../repositories/classesRepository");

const auth = async (sequelize, username) => {
  try {
    const person = await sequelize.models.Person.findOne(
      {
        where: {
          username: username,
        }
      }
    );
    
    return person;
  } catch (error) {
    throw error;
  }
};
const createUser = async (sequelize, username, password) => {
  try {
    //hardcoded
    const person = await sequelize.models.Person.create(
      {
        username: username,
        password,
        phone_number: ''
      }
    );

    return person;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  auth,
  createUser
};
