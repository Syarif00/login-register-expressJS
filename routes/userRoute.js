const express = require("express");
const userController = require("../controllers/userController");
const verifyUser = require("../middleware/authUser");

const router = express.Router();

router.get("/", verifyUser, userController.getAllUsers);
router.get("/:id", verifyUser, userController.getUserById);
router.post("/", verifyUser, userController.createUser);
router.patch("/:id", verifyUser, userController.updateUser);
router.delete("/:id", verifyUser, userController.deleteUser);

module.exports = router;
