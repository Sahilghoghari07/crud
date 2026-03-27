// const axios = require("axios");
const User = require("../models/userModel");
require("dotenv").config({ quiet: true });

const JSON_API_URL = process.env.JSON_API_URL;

exports.getUsers = async (req, res, next) => {
  try {
    // const users = await axios.get(`${JSON_API_URL}`);
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
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Give body data!", data: null });
    }

    // const newUser = await axios.post(`${JSON_API_URL}`, req.body);
    const newUser = await User.create(req.body);

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

    // const updatedUser = await axios.put(`${JSON_API_URL}/${id}`, req.body);
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

    // const deletedUser = await axios.delete(`${JSON_API_URL}/${id}`);
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
