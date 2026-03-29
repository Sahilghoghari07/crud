const User = require("../models/userModel");
require("dotenv").config({ quiet: true });

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
