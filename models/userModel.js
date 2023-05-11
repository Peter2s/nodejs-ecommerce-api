const mongoose = require("mongoose");

const UserShcema = mongoose.schema(
  {
    name: {
      type: "string",
      trim: true,
      required: [true, " username is required"],
    },
    slug: {
      type: "string",
      trim: true,
      lowercase: true,
    },
    email: {
      type: "string",
      unique: [true, "user email inuse before"],
      lowercase: true,
      required: [true, "user email is required"],
    },
    password: {
      type: "string",
      required: [true, "user password is required"],
    },
    phone: {
      type: "string",
      unique: [true, "user phone inuse before"],
    },
    profileImage: {
      type: "string",
    },
    role: {
      type: "string",
      enum: ["user", "admin"],
      default: "user",
    },
    active: {
      type: "boolean",
      default: true,
    },
  },
  { timestamps: true }
);
const UserModel = mongoose.model("User", UserShcema);
module.exports = UserModel;
