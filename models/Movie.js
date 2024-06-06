const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

Movie.init(
{
    id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  tmdb_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  overview: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  poster_path: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  public: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

module.exports = Movie;