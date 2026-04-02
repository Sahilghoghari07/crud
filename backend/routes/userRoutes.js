const router = require("express").Router();
const {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} = require("../controllers/userControllers");
const { authMiddleware } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");

router.get("/", authMiddleware, getUsers);
router.post("/", authMiddleware, upload.single("avatar"), addUser);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deleteUser);

module.exports = router;
