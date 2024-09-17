import mongoose from "mongoose";

const userModel = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      minLength: [3, "Name Must be Contains at least 3 Character"],
      maxLength: [30, "Name Should not exceed more than 30 Character"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: [8, "Password Must be Contains at least 8 Character"],

      validate: {
        validator: function (v) {
          // expression to check atleast one capital letter and special characters
          return /(?=.*[A-Z])(?=.*[!@#$%^&*])/.test(v);
        },
        message:
          "Password must contain at least one Uppercase letter and one Special character",
      },
    },
    profilePhoto: {
      type: String,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userModel);
