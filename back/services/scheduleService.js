const { Op } = require("sequelize");
const dayjs = require("dayjs");

const addSchedule = async (sequelize, classNumber, time) => {
  try {
    console.log(time);
    const endDate = dayjs(time).add(30, "minute").toDate();
    const classes = await sequelize.models.Schedule.create({
      username: "idan",
      class_number: classNumber,
      start_date: new Date(time),
      end_date: endDate,
    });

    return classes;
  } catch (error) {
    throw error;
  }
};

const fetchFreeSchedule = async (sequelize, classNumber, time) => {
  const hoursInDay = [];
  for (let hour = 6; hour < 24; hour++) {
    for (let halfHour = 0; halfHour < 2; halfHour++) {
      const time = hour + halfHour / 2;
      hoursInDay.push(time);
    }
  }

  try {
    const startDate = dayjs(time).startOf("day").toDate();
    const endDate = dayjs(time).endOf("day").toDate();
    var schedules = await sequelize.models.Schedule.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      where: {
        start_date: {
          [Op.gte]: startDate,
          [Op.lt]: endDate,
        },
      },
    });
  } catch (error) {
    throw error;
  }

  const occupiedStatus = [];

  for (const hour of hoursInDay) {
    let isOccupied = false;
    let person;

    for (const schedule of schedules) {
      const startHour =
        schedule.start_date.getHours() + schedule.start_date.getMinutes() / 60;
      const endHour =
        schedule.end_date.getHours() + schedule.end_date.getMinutes() / 60;

      if (hour >= startHour && hour < endHour) {
        isOccupied = true;
        person = schedule.username;
        break;
      }
    }

    occupiedStatus.push({ hour, person: person ?? "free" });
  }

  console.log(occupiedStatus);
  return occupiedStatus;
};

const fetchAllSchedule = async (sequelize) => {
  try {
    const schedules = await sequelize.models.Schedule.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    [...schedules].map((schedule) => {
      schedule.start_date = new Date(schedule.start_date).toLocaleDateString();
      schedule.end_date = new Date(schedule.end_date).toLocaleDateString();
      console.log()
      return schedule;
    });
    console.log(schedules);
    return schedules;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  fetchFreeSchedule,
  addSchedule,
  fetchAllSchedule,
};
