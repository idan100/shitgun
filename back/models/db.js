
const dotenv = require("dotenv");
const { Sequelize, DataTypes, where, Op } = require("sequelize");
const ClassModel = require("../models/Class");
const PersonModel = require("../models/Person");
const ScheduleModel = require("../models/Schedule");

class DBModel {

    connection;

    constructor() {
        try {
            this.connection = new Sequelize(
                `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGSERVER}:${process.env.PGPORT}/${process.env.PGDBNAME}`
            );

            ClassModel(this.connection);
            PersonModel(this.connection);
            ScheduleModel(this.connection);

            // ClassModel(sequelize);
        } catch (error) {
            console.error("Unable to create connection:", error);
        }
    };
}
const db = new DBModel();

module.exports =  db ;
