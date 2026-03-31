const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserRegister = require("../models/userRegister");

exports.register = async (req, res) => {
  const { username, password } = req.body;

  const exist = await UserRegister.findOne({ username });
  if (exist) return res.status(400).json({ message: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);

  await UserRegister.create({ username, password: hashed });
  res
    .status(201)
    .json({ message: "User Registered Successfully", success: true });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = await UserRegister.findOne({ username });
  if (!user) return res.status(401).json({ message: "Invalid Credentials" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: "Invalid Credentials" });

  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.json({
    message: "Login Successfully",
    success: true,
    token,
    data: {
      _id: user._id,
      username: user.username,
      role: user.role,
    },
  });
};
