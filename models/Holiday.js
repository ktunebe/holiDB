const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Holiday extends Model {}

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
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "holiday",
  }
);

module.exports = Holiday;
