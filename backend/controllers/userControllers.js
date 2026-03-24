const axios = require("axios");
require("dotenv").config({ quiet: true });

const JSON_API_URL = process.env.JSON_API_URL;

exports.getUsers = async (req, res) => {
  try {
    const users = await axios.get(`${JSON_API_URL}`);
    res.status(200).json({
      error: null,
      message: "Users fetched Successfully",
      data: users.data,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      message: "Internal server error",
      data: null,
    });
  }
};

exports.addUser = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Give body data!", data: null });
    }

    const newUser = await axios.post(`${JSON_API_URL}`, req.body);

    res.status(201).json({
      error: null,
      message: "User created successfully",
      data: newUser.data,
    });
  } catch (err) {
    res
      .status(500)
      .json({
        error: err.message,
        message: "Internal server error",
        data: null,
      });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedUser = await axios.put(`${JSON_API_URL}/${id}`, req.body);
    res.status(200).json({
      error: null,
      message: "User updated successfully",
      data: updatedUser.data,
    });
  } catch (err) {
    res
      .status(500)
      .json({
        error: err.message,
        message: "Internal server error",
        data: null,
      });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await axios.delete(`${JSON_API_URL}/${id}`);
    res.status(200).json({
      error: null,
      message: "User deleted successfully",
      data: deletedUser.data,
    });
  } catch (err) {
    res
      .status(500)
      .json({
        error: err.message,
        message: "Internal server error",
        data: null,
      });
  }
};
