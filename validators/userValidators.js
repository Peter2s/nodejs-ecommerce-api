const { check } = require("express-validator");
const validatorMiddleware = require("../middlewares/validatorMiddleware");
const UserModel = require("../models/userModel");

const idValidator = [
  check("id").notEmpty().isMongoId().withMessage("id must be mongodb ID"),
];

module.exports.getUserValidator = [idValidator, validatorMiddleware];

module.exports.createUserValidator = [
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
    .custom(async (val) => {
      const user = await UserModel.find({ email: val });
      if (user) return Promise.reject(new Error("user email already exists"));
    }),

  check("password")
    .isString()
    .withMessage("password is required")
    .trim()
    .isLength({ min: 8 })
    .withMessage("user password required and minimum length must be 6 ")
    .custom((password, { req }) => {
      if (password !== req.body.passwordConfirmation)
        throw new Error("password and password confirmation not match");
      return true;
    }),

  check("profileImage").optional(),

  check("phone")
    .optional()
    .isMobilePhone(["ar-EG", "ar-SA", "en-US"])
    .withMessage("invalid phone number format only accept [EG - SA - US]"),

  check("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage(" role must be one of the following [user - admin]"),
  validatorMiddleware,
];

module.exports.updateUserValidator = [
  idValidator,
  check("name")
    .optional()
    .isLength({ min: 2 })
    .withMessage("User name must be 3 or  more chartres ")
    .isLength({ max: 32 })
    .withMessage("User name must be less than 32  chartres"),
  validatorMiddleware,
];
module.exports.deleteUserValidator = [idValidator, validatorMiddleware];
