const User = require("./User");
const Movie = require("./Movie");
const Holiday = require("./Holiday");
const HolidayMovie = require("./HolidayMovie");

/* ---------------------------------------------------------------------------- */
Movie.hasMany(HolidayMovie, {
  foreignKey: "movie_id",
  onDelete: "CASCADE",
});
HolidayMovie.belongsTo(Movie, {
  foreignKey: "movie_id",
  onDelete: "CASCADE",
});
/* ---------------------------------------------------------------------------- */
Holiday.hasMany(HolidayMovie, {
  foreignKey: "holiday_id",
  onDelete: "CASCADE",
});
HolidayMovie.belongsTo(Holiday, {
  foreignKey: "holiday_id",
  onDelete: "CASCADE",
});
/* ---------------------------------------------------------------------------- */

module.exports = { User, Movie, Holiday, HolidayMovie };
