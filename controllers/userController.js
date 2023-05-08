const { User } = require("../config/model/index");
const argon2 = require("argon2");

const userController = {
  // GET ALL USERS
  getAllUsers: async (req, res) => {
    try {
      const response = await User.findAll({
        attributes: ["id_user", "username", "email"],
      });
      res.status(201).json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  // GET USER BY ID
  getUserById: async (req, res) => {
    try {
      const response = await User.findOne({
        attributes: ["id_user", "username", "email"],
        where: {
          id_user: req.params.id,
        },
      });
      if (!response) {
        res.status(404).json({ message: "User tidak ditemukan" });
      } else {
        res.status(201).json(response);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },

  // CREATE USER
  createUser: async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password tidak sama" });
    }

    const hashedPassword = await argon2.hash(password);
    try {
      await User.create({
        username: username,
        email: email,
        password: hashedPassword,
      });
      res.status(201).json({ message: "Registrasi berhasil" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },

  // UPDATE USER
  updateUser: async (req, res) => {
    const user = await User.findOne({
      where: {
        id_user: req.params.id,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    const { username, email, password, confirmPassword } = req.body;

    let hashedPassword;
    if (password === "" || password === null) {
      hashedPassword = user.password;
    } else {
      hashedPassword = await argon2.hash(password);
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password tidak sama" });
    }

    try {
      await User.update(
        {
          username: username,
          email: email,
          password: hashedPassword,
        },
        {
          where: {
            id_user: req.params.id,
          },
        }
      );
      res.status(200).json({ message: "Update berhasil" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },

  // DELETE USER
  deleteUser: async (req, res) => {
    const user = await User.findOne({
      where: {
        id_user: req.params.id,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    try {
      await User.destroy({
        where: {
          id_user: req.params.id,
        },
      });
      res.status(201).json({ message: "User berhasil Dihapus" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
};

module.exports = userController;
