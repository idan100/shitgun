const express = require("express");
var selectAllClasses = require('./db').selectAllClasses;

const PORT = 3001

const app = express();

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.get("/getAllClasses/:classNumber", async (req, res) => {
    var classes = await selectAllClasses(parseInt(req.params.classNumber));
    console.log(classes)
    res.json({ classes: classes });
  });