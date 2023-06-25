const dotenv = require("dotenv");
const { Sequelize, DataTypes, where, Op } = require('sequelize');

dotenv.config();

//const Person = sequelize.define('Person', {
//  id: {
//    type: DataTypes.STRING,
//    primaryKey: true
//  },
//  name: {
//    type: DataTypes.STRING,
//    allowNull: false
//  },
//  password: {
//    type: DataTypes.STRING,
//    allowNull: false
//  },
//  phone_number: {
//    type: DataTypes.STRING,
//    allowNull: false
//  },
//},
//  {
//    tableName: "person",
//    schema: "keys"
//  }
//);


const createClass = (sequelize) => {
  try {

    const Class = sequelize.define('Class', {
      class_number: {
        type: DataTypes.SMALLINT,
        primaryKey: true
      },
      has_projector: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      has_computers: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
      {
        tableName: "class",
        schema: "keys"
      }
    );
    return Class;
  } catch (error) {
    console.error('Unable to create connection:', error);
  }
}


const createConnection = () => {
  try {
    const sequelize = new Sequelize(`postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGSERVER}:${process.env.PGPORT}/${process.env.PGDBNAME}`)

    return sequelize;
  } catch (error) {
    console.error('Unable to create connection:', error);
  }
}



const selectAllPersons = async () => {
  try {
    const persons = await Person.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    });
    console.log("All persons:", JSON.stringify(persons, null, 2));

    sequelize.close()
  } catch (error) {
    console.error('Unable to select all from database:', error);
  }
}

const selectAllClasses = async (classNumber) => {
  try {
    const sequelize = createConnection();
    const Class = createClass(sequelize);
    
    const classes = await Class.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      where: {
        class_number: {
          [Op.like]: classNumber + '%'
        }
      }
    });

    sequelize.close();
    return classes;
  } catch (error) {
    console.error('Unable to select all from database:', error);
  }
}


const testDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    //await selectAll();

    sequelize.close()
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}


module.exports = {
  selectAllClasses: selectAllClasses
};


//testDB();


//const express = require('express');
//const app = express();
//
//
//app.get('/', (req, res) => {
//  res.send('Hello, world!');
//});
//
//
//
////app.use(express.static('build'));
//
//
//const port = 3000; // Or any other port number you prefer
//
//app.listen(port, () => {
//  console.log(`Server running on port ${port}`);
//});
//