const express = require("express");
const {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  register,
  login,
} = require("../controllers/userControllers");
const router = express.Router();

router.get("/", getUsers);
router.post("/", addUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/register", register);
router.post("/login", login);

module.exports = router;
