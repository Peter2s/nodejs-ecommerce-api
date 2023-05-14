const { check } = require("express-validator");
const validatorMiddleware = require("../middlewares/validatorMiddleware");
const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");

// const idValidator = [
//   check("id").notEmpty().isMongoId().withMessage("id must be mongodb ID"),
// ];

module.exports.singupValidator = [
  check("name")
    .notEmpty()
    .isLength({ min: 2 })
    .withMessage("User name must be 3 or  more chartres ")
    .isLength({ max: 32 })
    .withMessage("User name must be less than 32  chartres"),

  check("email")
    .notEmpty()
    .withMessage("user email required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email) => {
      const user = await UserModel.findOne({ email });

      if (user) return Promise.reject(new Error("user email already exists"));

      return true;
    }),

  check("password")
    .isString()
    .withMessage("password is required")
    .trim()
    .isLength({ min: 8 })
    .withMessage("user password required and minimum length must be 8 ")
    .custom((password, { req }) => {
      if (password !== req.body.passwordConfirmation)
        throw new Error("password and password confirmation not match");
      return true;
    }),

  check("phone")
    .optional()
    .isMobilePhone(["ar-EG", "ar-SA", "en-US"])
    .withMessage("invalid phone number format only accept [EG - SA - US]"),

  validatorMiddleware,
];
