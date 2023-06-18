const dotenv = require("dotenv");
const { Sequelize, DataTypes } = require('sequelize');

dotenv.config();

const sequelize = new Sequelize(`postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGSERVER}:${process.env.PGPORT}/${process.env.PGDBNAME}`)

const Person = sequelize.define('Person', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: false
  },
},
{
    tableName:"person",
    schema:"keys"
}
);


const testDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    
    const persons = await Person.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    });
    //console.log(persons.every(person => person instanceof Person)); // true
    console.log("All persons:", JSON.stringify(persons, null, 2));
    
    sequelize.close()
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testDB();
