const express = require("express");
const router = express.Router();
const { createConnection } = require("../db");
const personService = require("../services/personService");
const db = require('../models/db');

router.post("/create", async (req, res) => {
  try {
    const auth = await personService.createUser(
      db.connection,
      req.body.username,
      req.body.password,
    );
    res.json({ approved: auth });
  } catch (error) {
    console.error("Error fetching user:", error);
  }
});


router.post("/", async (req, res) => {
  try {
    const person = await db.connection.models.Person.create({
      id: 1,
      name: "addSchedule",
      password: "asd",
      phone_number: 123,
    });

    res.json({ person });
  } catch (error) {
    console.error("Error fetching schedule:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const person = await db.connection.models.Person.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    res.json({ person });
  } catch (error) {
    console.error("Error fetching schedule:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
