const express = require("express");
const router = express.Router();
const { createConnection } = require("../db");
const personService = require("../services/personService");
const db = require('../models/db');

router.get("/:classNumber/:time", async (req, res) => {
    try {
        const schedule = await personService.fetchSchedule(
            db.connection,
            req.params.classNumber,
            req.params.time,
        );
        res.json({ schedule });
    } catch (error) {
        console.error("Error fetching schedule:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


module.exports = router;
