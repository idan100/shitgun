// classesRoutes.js
const express = require("express");
const router = express.Router();

var selectAllClasses = require("../db").selectAllClasses;
var setSchedule = require("../db").setSchedule;

router.get("/:classNumber", async (req, res) => {
  const classes = await selectAllClasses(req.params.classNumber);
  console.log(classes);
  res.json({ classes: classes });
});

router.post("/", async (req, res) => {
  const isSuccess = await setSchedule(
    req.body.classNumber,
    req.body.personId,
    req.body.startDate
  );
  res.json({ isSuccess: isSuccess });
});

// Export the router
module.exports = router;
