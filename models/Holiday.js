const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

Holiday.init(
    {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: true,
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
      
      module.exports = Holiday;
