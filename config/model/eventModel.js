const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const sequelize = require("../database/database");

const Event = sequelize.define(
  "Event",
  {
    id_event: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desc: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    start_registration: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    end_registration: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    link_registration: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Events",
    timestamps: false,
  }
);

module.exports = Event;
