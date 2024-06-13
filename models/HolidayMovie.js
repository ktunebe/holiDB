const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const User = require("./User");
const Movie = require("./Movie");
const Holiday = require("./Holiday");

class HolidayMovie extends Model {}

HolidayMovie.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
    association_score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      default: 1
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "holiday_movie",
    indexes: [
      {
        unique: true,
        fields: ['movie_id', 'holiday_id'],
      },
    ],
  },
);

module.exports = HolidayMovie;
