const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserShcema = mongoose.Schema(
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
      immutable: true,
      index: true,
      unique: [true, "user email inuse before"],
      lowercase: true,
      required: [true, "user email is required"],
    },
    password: {
      type: "string",
      required: [true, "user password is required"],
    },
    passwordChangedAt: Date,
    passwordRestCode: String,
    passwordRestCodeExpiration: Date,
    passwordRestCodeVerified: Boolean,

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
UserShcema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = 12;
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const UserModel = mongoose.model("User", UserShcema);
module.exports = UserModel;
