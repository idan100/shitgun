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
    res.json({approved:auth});
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;
