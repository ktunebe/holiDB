const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

UserHoliday.init(
    {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userid: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      movieid: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      review: {
        type: DataTypes.STRING,
        allowNull: true,
      },
});

module.exports = UserHoliday