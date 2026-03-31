const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    dateOfBirth: {
      type: String,
      match: /^\d{2}-\d{2}-\d{4}$/,
      validate: {
        validator: function (value) {
          const [dd, mm, yyyy] = value.split("-");
          const inputDate = new Date(`${yyyy}-${mm}-${dd}`);
          return inputDate <= new Date();
        },
        message: "Date of birth cannot be in the future!",
      },
    },
    hobby: {
      type: [String],
    },
    gender: {
      type: String,
      default: "Male",
    },
    country: {
      type: String,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    address: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
