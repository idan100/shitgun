const express = require("express");
const PORT = 3001;

const app = express();

const classesRoutes = require("./controllers/classesController");

app.use("/classes", classesRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
