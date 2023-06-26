const express = require("express");
var selectAllClasses = require('./db').selectAllClasses;
var setSchedule = require('./db').setSchedule;

const PORT = 3001

const app = express();

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.get("/getAllClasses/:classNumber", async (req, res) => {
  var classes = await selectAllClasses(req.params.classNumber);
  console.log(classes)
  res.json({ classes: classes });
});

app.post("/setClass", async (req, res) => {
  var isSuccess = await setSchedule(req.body.classNumber,req.body.personId,req.body.startDate);
  res.json({ 'isSuccess': isSuccess });
});