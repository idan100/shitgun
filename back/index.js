const express = require("express");
const PORT = 3001;

const app = express();

const classesRoutes = require("./controllers/classesController");
const personsRoutes = require("./controllers/personsController");
const schedulesRoutes = require("./controllers/schedulesController");

app.use("/classes", classesRoutes);
// app.use("/persons", personsRoutes);
// app.use("/schedules", schedulesRoutes);

// app.post("/setClass", async (req, res) => {
//   var isSuccess = await setSchedule(
//     req.body.classNumber,
//     req.body.personId,
//     req.body.startDate
//   );
//   res.json({ isSuccess: isSuccess });
// });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
