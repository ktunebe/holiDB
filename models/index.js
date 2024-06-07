const User = require("./User");
const Movie = require("./Movie");
const Holiday = require("./Holiday");
const UserHolidayMovie = require("./UserHolidayMovie");

User.hasMany(UserHolidayMovie, { 
    foreignKey: 'user_id', 
    onDelete: 'CASCADE' });

Movie.hasMany(UserHolidayMovie, { 
    foreignKey: 'movie_id', 
    onDelete: 'CASCADE' });

Holiday.hasMany(UserHolidayMovie, { 
    foreignKey: 'holiday_id', 
    onDelete: 'CASCADE' });

UserHolidayMovie.belongsTo(User, { 
    foreignKey: 'user_id', 
    onDelete: 'CASCADE' });

UserHolidayMovie.belongsTo(Movie, { 
    foreignKey: 'movie_id', 
    onDelete: 'CASCADE' });

UserHolidayMovie.belongsTo(Holiday, { 
    foreignKey: 'holiday_id', 
    onDelete: 'CASCADE' });

module.exports = { User, Movie, Holiday, UserHolidayMovie };
