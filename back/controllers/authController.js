const express = require("express");
const router = express.Router();
const { createConnection } = require("../db");
const personService = require("../services/personService");
const db = require("../models/db");

router.post("/", async (req, res) => {
  try {
    const person = await personService.auth(db.connection, req.body.username);
    res.json({
      approved: person ? person.password === req.body.password : false,
      phoneNumber: person.phone_number,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
