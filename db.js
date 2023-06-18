const dotenv = require("dotenv");
const { Sequelize } = require('sequelize');

dotenv.config();

const sequelize = new Sequelize(`postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGSERVER}:${process.env.PGPORT}/${process.env.PGDBNAME}`)

const tesDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    //sequelize.close()
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

tesDB();

