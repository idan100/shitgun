const dotenv = require("dotenv");
const { Sequelize, DataTypes, where, Op } = require("sequelize");
const ClassModel = require("./models/Class");

dotenv.config();

const createPerson = (sequelize) => {
  try {
    const Person = sequelize.define(
      "Person",
      {
        id: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        phone_number: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        tableName: "person",
        schema: "keys",
      }
    );

    return Person;
  } catch (error) {
    console.error("Unable to create connection:", error);
  }
};

const createClass = (sequelize) => {
  try {
    const Class = sequelize.define(
      "Class",
      {
        class_number: {
          type: DataTypes.SMALLINT,
          primaryKey: true,
        },
        has_projector: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        has_computers: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        tableName: "class",
        schema: "keys",
      }
    );
    return Class;
  } catch (error) {
    console.error("Unable to create connection:", error);
  }
};

const createSchedule = (sequelize) => {
  try {
    const Schedule = sequelize.define(
      "Schedule",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
        },
        person_id: {
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
      }
    );
    return Schedule;
  } catch (error) {
    console.error("Unable to create connection:", error);
  }
};

const createConnection = () => {
  try {
    const sequelize = new Sequelize(
      `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGSERVER}:${process.env.PGPORT}/${process.env.PGDBNAME}`
    );

    ClassModel(sequelize);
    return sequelize;
  } catch (error) {
    console.error("Unable to create connection:", error);
  }
};

const selectAllPersons = async () => {
  try {
    const persons = await Person.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    console.log("All persons:", JSON.stringify(persons, null, 2));

    sequelize.close();
  } catch (error) {
    console.error("Unable to select all from database:", error);
  }
};

const selectAllClasses = async (classNumber) => {
  try {
    const sequelize = createConnection();
    const Class = createClass(sequelize);

    const classes = await Class.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      where: {
        class_number: {
          [Op.like]: classNumber + "%",
        },
      },
    });

    sequelize.close();
    return classes;
  } catch (error) {
    console.error("Unable to select all from database:", error);
  }
};

const setSchedule = async (classNumber, personId, startDate) => {
  try {
    const sequelize = createConnection();
    const Schedule = createSchedule(sequelize);

    var start = new Date(startDate);
    var end = start.setHours(start.getHours() + 1);

    const schedule = await Schedule.create({
      person_id: personId,
      class_number: classNumber,
      start_Date: start,
      end_date: end,
    });

    sequelize.close();
    return true;
  } catch (error) {
    console.error("Unable to select all from database:", error);
    return false;
  }
};

const testDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    //await selectAll();

    sequelize.close();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = {
  selectAllClasses: selectAllClasses,
  setSchedule: setSchedule,
  createConnection,
};
