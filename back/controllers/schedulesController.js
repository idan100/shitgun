const express = require("express");
const router = express.Router();
const { createConnection } = require("../db");
const scheduleService = require("../services/scheduleService");
const db = require("../models/db");

router.get("/free/:classNumber/:time", async (req, res) => {
  try {
    const schedule = await scheduleService.fetchFreeSchedule(
      db.connection,
      req.params.classNumber,
      req.params.time
    );
    res.json({ schedule });
  } catch (error) {
    console.error("Error fetching schedule:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const schedule = await scheduleService.fetchAllSchedule(db.connection);
    res.json({ schedule });
  } catch (error) {
    console.error("Error fetching schedule:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/:classNumber/:time", async (req, res) => {
  try {
    const schedule = await scheduleService.addSchedule(
      db.connection,
      req.params.classNumber,
      req.params.time
    );
    res.json({ schedule });
  } catch (error) {
    console.error("Error fetching schedule:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/", async (req, res) => {
  try {
    const schedule = await db.connection.models.Schedule.destroy({
      truncate: true,
    });
    res.json({ schedule });
  } catch (error) {
    console.error("Error fetching schedule:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
