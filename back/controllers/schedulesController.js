const express = require("express");
const router = express.Router();
const { createConnection } = require("../db");
const personService = require("../services/personService");
const db = require('../models/db');

router.get("/", async (req, res) => {
  try {
    const auth = await personService.auth(
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
