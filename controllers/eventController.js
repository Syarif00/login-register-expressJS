const { Op } = require("sequelize");
const { Event } = require("../config/model/index");

const eventController = {
  getAllEvents: async (req, res) => {
    try {
      const events = await Event.findAll();
      res.status(201).json(events);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },

  getEventById: async (req, res) => {
    const { id } = req.params;

    try {
      const event = await Event.findByPk(id);
      if (!event) {
        res.status(404).json({ message: "Event tidak ditemukan" });
      } else {
        res
          .status(201)
          .json({ message: "Mendapatkan Event by Id", data: event });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server error" });
    }
  },

  searchEvents: async (req, res) => {
    try {
      const { search } = req.query;
      const events = await Event.findAll({
        where: {
          [Op.or]: [
            { title: { [Op.substring]: search } },
            { description: { [Op.substring]: search } },
          ],
        },
      });
      res.status(201).json(events);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },

  filterEvents: async (req, res) => {
    try {
      const { free, paid } = req.query;
      let events;

      if (free === "1" && paid === "0") {
        events = await Event.findAll({
          where: { price: 0 },
        });
      } else if (paid === "1" && free === "0") {
        events = await Event.findAll({
          where: { price: { [Op.ne]: 0 } },
        });
      } else {
        events = await Event.findAll();
      }

      res.status(201).json(events);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },

  createEvent: async (req, res) => {
    console.log(req.file);
    try {
      const newEvent = await Event.create({
        title: req.body.title,
        desc: req.body.desc,
        img: req.file.path,
        date: req.body.date,
        time: req.body.time,
        start_registration: req.body.start_registration,
        end_registration: req.body.end_registration,
        location: req.body.location,
        price: req.body.price,
        link_registration: req.body.link_registration,
      });
      res
        .status(201)
        .json({ message: "Event berhasil ditambahkan", data: newEvent });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server error" });
    }
  },

  updateEvent: async (req, res) => {
    const { id } = req.params;
    const {
      title,
      desc,
      img,
      date,
      time,
      start_registration,
      end_registration,
      location,
      price,
      link_registration,
    } = req.body;

    try {
      const event = await Event.findByPk(id);
      if (!event) {
        res.status(404).json({ message: "ID tidak ditemukan" });
      } else {
        event.title = title || event.title;
        event.desc = desc || event.desc;
        event.img = img || event.img;
        event.date = date || event.date;
        event.time = time || event.time;
        event.start_registration =
          start_registration || event.start_registration;
        event.end_registration = end_registration || event.end_registration;
        event.location = location || event.location;
        event.price = price || event.price;
        event.link_registration = link_registration || event.link_registration;
        await event.save();
        res
          .status(201)
          .json({ message: "Event berhasil diupdate", data: event });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server error" });
    }
  },

  deleteEvent: async (req, res) => {
    const { id } = req.params;

    try {
      const event = await Event.findByPk(id);
      if (!event) {
        res.status(404).json({ message: "Event tidak ditemukan" });
      } else {
        await event.destroy();
        res.status(201).json({
          message: "Event berhasil dihapus",
          id: id,
          name: event.title,
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server error" });
    }
  },
};

module.exports = eventController;
