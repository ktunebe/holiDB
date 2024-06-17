require('dotenv').config();
const sequelize = require("../config/connection");
const { User, Movie, Holiday, HolidayMovie } = require("../models");

const userData = require("./userData.json");
const movieData = require("./movieData.json");
const holidayData = require("./holidayData.json");
const holidayMovieData = require("./holidayMovieData.json");

// Seed database using JSON files
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
      user_id: holiday.user_id || users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const holidayMovie of holidayMovieData) {
    await HolidayMovie.create({
      ...holidayMovie,
    });
  }

  process.exit(0);
};

seedDatabase();
