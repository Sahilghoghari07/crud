const router = require("express").Router();
const {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} = require("../controllers/userControllers");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, getUsers);
router.post("/", authMiddleware, addUser);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, isAdmin, deleteUser);

module.exports = router;
