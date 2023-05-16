const { check } = require("express-validator");
const validatorMiddleware = require("../middlewares/validatorMiddleware");
const UserModel = require("../models/userModel");

module.exports.singUpValidator = [
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

module.exports.loginValidator = [
  check("email")
    .notEmpty()
    .withMessage("user email required")
    .isEmail()
    .withMessage("invalid email format"),

  check("password")
    .isString()
    .withMessage("password is required")
    .trim()
    .isLength({ min: 8 })
    .withMessage("user password required and minimum length must be 8 "),
  validatorMiddleware,
];
module.exports.forgetPasswordValidator = [
  check("email")
    .notEmpty()
    .withMessage("user email required")
    .isEmail()
    .withMessage("invalid email format"),
  validatorMiddleware,
];
module.exports.resetPassowrdValidator = [
  check("email")
    .notEmpty()
    .withMessage("user email required")
    .isEmail()
    .withMessage("invalid email format"),

  check("newPassword")
    .isString()
    .withMessage("password is required")
    .trim()
    .isLength({ min: 8 })
    .withMessage("user password required and minimum length must be 8 ")
    .custom((newPassword, { req }) => {
      if (newPassword !== req.body.passwordConfirmation)
        throw new Error("password and password confirmation not match");
      return true;
    }),

  validatorMiddleware,
];
