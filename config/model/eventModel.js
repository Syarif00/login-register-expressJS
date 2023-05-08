const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");
const Users = require("./userModel");

const Event = sequelize.define(
  "Event",
  {
    id_event: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      }, 
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
      get() {
        const image = this.getDataValue("image");
        return "/img/" + image;
      }
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
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    link_registration: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    }
  },
  {
    freezeTableName: true,
    tableName: "Events",
    timestamps: false,
  }
);

Users.hasMany(Event)
Event.belongsTo(Users, {foreignKey: "user_id"})

module.exports = Event;
