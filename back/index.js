const express = require("express");
const PORT = 3001;
var cors = require('cors')
const app = express();
var corsOptions = {
  origin: 'http://localhost:3000',
}
var bodyParser = require('body-parser')
app.use(cors(corsOptions))
const classesRoutes = require("./controllers/classesController");
const authRoutes = require("./controllers/authController");
const personsRoutes = require("./controllers/personsController");
const schedulesRoutes = require("./controllers/schedulesController");
// app.use(bodyParser.urlencoded({ extended: true}))
app.use(express.json());
app.use("/classes", classesRoutes);
app.use("/auth", authRoutes);
// const classesService = require("./services/classesService");
// const db = require('./models/db');
// classesService.createAllClasses(db.connection);


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
