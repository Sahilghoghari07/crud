const User = require("../models/userModel");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({
      message: "Users fetched Successfully",
      success: true,
      data: users,
    });
  } catch (err) {
    next(err);
  }
};

exports.addUser = async (req, res, next) => {
  try {
    const { dateOfBirth } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Profile image is required!" });
    }

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Give body data!" });
    }

    const [yyyy, mm, dd] = dateOfBirth.split("-");
    const updatedDate = `${dd}-${mm}-${yyyy}`;

    const newUser = await User.create({
      ...req.body,
      avatar: req.file.path,
      dateOfBirth: updatedDate,
    });

    res.status(201).json({
      message: "User created successfully",
      success: true,
      data: newUser,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    let updatedData = { ...req.body, avatar: req.file?.path };

    if (updatedData.dateOfBirth) {
      const [yyyy, mm, dd] = updatedData.dateOfBirth.split("-");
      updatedData.dateOfBirth = `${dd}-${mm}-${yyyy}`;
    }

    const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
      returnDocument: "after",
    });
    res.status(200).json({
      message: "User updated successfully",
      success: true,
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
      message: "User deleted successfully",
      success: true,
      data: deletedUser,
    });
  } catch (err) {
    next(err);
  }
};
