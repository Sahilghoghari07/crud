const User = require("../models/userModel");
require("dotenv").config({ quiet: true });

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    const formattedUser = users.map((u) => {
      const date = new Date(u.dateOfBirth);

      const mm = ("0" + (date.getMonth() + 1)).slice(-2);
      const dd = ("0" + date.getDate()).slice(-2);

      return {
        ...u._doc,
        dateOfBirth: `${date.getFullYear()}-${mm}-${dd}`,
      };
    });

    res.status(200).json({
      error: null,
      message: "Users fetched Successfully",
      data: formattedUser,
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

    const date = new Date(dateOfBirth);

    const dd = ("0" + date.getDate()).slice(-2);
    const mm = ("0" + (date.getMonth() + 1)).slice(-2);
    FormattedDateOfBirth = `${dd}-${mm}-${date.getFullYear()}`;

    const newUser = await User.create({
      ...req.body,
      dateOfBirth: FormattedDateOfBirth,
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

    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
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
