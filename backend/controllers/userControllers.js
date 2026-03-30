const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const userRole = require("../models/userRole");
const jwt = require("jsonwebtoken");
require("dotenv").config({ quiet: true });

exports.register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userRole.create({
      username,
      password: hashedPassword,
    });

    res
      .status(201)
      .json({ message: "User Registered Successfully", data: newUser });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await userRole.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: "Invalid Credentials!" });
    }

    const matchedPassword = await bcrypt.compare(password, user.password);
    if (!matchedPassword) {
      return res.status(401).json({ error: "Invalid Credentials!" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res
      .status(200)
      .set("Authorization", `Bearer ${token}`)
      .json({ message: "Login Successful", token });
  } catch (err) {
    next(err);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({
      error: null,
      message: "Users fetched Successfully",
      data: users,
    });
  } catch (err) {
    next(err);
  }
};

exports.addUser = async (req, res, next) => {
  try {
    const { dateOfBirth } = req.body;

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Give body data!", data: null });
    }

    const [yyyy, mm, dd] = dateOfBirth.split("-");
    const updatedDate = `${dd}-${mm}-${yyyy}`;

    const newUser = await User.create({
      ...req.body,
      dateOfBirth: updatedDate,
    });

    res.status(201).json({
      error: null,
      message: "User created successfully",
      data: newUser,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    let updatedData = { ...req.body };

    if (updatedData.dateOfBirth) {
      const [yyyy, mm, dd] = updatedData.dateOfBirth.split("-");
      updatedData.dateOfBirth = `${dd}-${mm}-${yyyy}`;
    }

    const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
      returnDocument: "after",
    });
    res.status(200).json({
      error: null,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);
    res.status(200).json({
      error: null,
      message: "User deleted successfully",
      data: deletedUser,
    });
  } catch (err) {
    next(err);
  }
};
