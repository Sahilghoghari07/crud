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
