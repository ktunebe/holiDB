const sequelize = require("../config/connection");
const { User, Movie, Holiday, UserHolidayMovie } = require("../models");

const userData = require("./userData.json");
const movieData = require("./movieData.json");
const holidayData = require("./holidayData.json");
const userHolidayMovieData = require("./userHolidayMovieData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Movie.bulkCreate(movieData, {
    individualHooks: true,
    returning: true,
  });

  for (const holiday of holidayData) {
    await Holiday.create({
      ...holiday,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const userHolidayMovie of userHolidayMovieData) {
    await UserHolidayMovie.create({
      ...userHolidayMovie,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
