const express = require("express");
const router = express.Router();
const { createConnection } = require("../db");
const classesService = require("../services/classesService");
const sequelize = createConnection();

router.get("/:classNumber", async (req, res) => {
  try {
    const classes = await classesService.getAllClasses(sequelize);
    res.json(classes);
  } catch (error) {
    console.error("Error fetching classes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// const getAllClasses = async (req, res) => {
//   try {
//     const classes = await classesService.getAllClasses();
//     res.json(classes);
//   } catch (error) {
//     console.error("Error fetching classes:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

module.exports = router;
