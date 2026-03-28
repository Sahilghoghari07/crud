const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
      match: /^\d{2}-\d{2}-\d{4}$/,
      max: [Date.now, "Date of birth can not be in future!"],
    },
    hobby: {
      type: [String],
      required: true,
    },
    gender: {
      type: String,
      default: "Male",
    },
    country: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
