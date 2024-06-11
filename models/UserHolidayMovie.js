const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const User = require("./User");
const Movie = require("./Movie");
const Holiday = require("./Holiday");

class UserHolidayMovie extends Model {}

UserHolidayMovie.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // unique: false,
      // constraints: false,
      references: {
        model: User,
        key: "id",
      },
    },
    movie_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // unique: false,
      // constraints: false,
      references: {
        model: Movie,
        key: "id",
      },
    },
    holiday_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // unique: false,
      // constraints: false,
      references: {
        model: Holiday,
        key: "id",
      },
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user_holiday_movie",
  }
);

module.exports = UserHolidayMovie;
