const { check } = require("express-validator");
const validatorMiddleware = require("../middlewares/validatorMiddleware");
const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");

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
    .custom(async (email) => {
      const user = await UserModel.findOne({ email });
      console.log(user);
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

  check("profileImage").optional(),

  check("phone")
    .optional()
    .isMobilePhone(["ar-EG", "ar-SA", "en-US"])
    .withMessage("invalid phone number format only accept [EG - SA - US]"),

  validatorMiddleware,
];

module.exports.changePasswordValidator = [
  idValidator,

  check("currentPassword")
    .notEmpty()
    .withMessage("password is required")
    .isString()
    .trim()
    .isLength({ min: 8 })
    .withMessage("user password required and minimum length must be 8 ")
    .custom(async (password, { req }) => {
      const { id } = req.params;
      const user = await UserModel.findById(id);
      if (!user)
        return Promise.reject(new Error(`no user found with id ${id}`));
      const match = await bcrypt.compare(password, user.password);
      if (!match) return Promise.reject(new Error("invalid current password"));
      return true;
    }),
  check("password")
    .notEmpty()
    .withMessage("password is required")
    .isString()
    .trim()
    .isLength({ min: 8 })
    .withMessage("user password required and minimum length must be 8 ")
    .custom((password, { req }) => {
      if (password !== req.body.passwordConfirmation)
        return Promise.reject(
          new Error("password and password confirmation not match")
        );
      return true;
    }),
  validatorMiddleware,
];

module.exports.updateProfileValidator = [
  check("name")
    .optional()
    .isLength({ min: 2 })
    .withMessage("User name must be 3 or  more chartres ")
    .isLength({ max: 32 })
    .withMessage("User name must be less than 32  chartres"),

  check("phone")
    .optional()
    .isMobilePhone(["ar-EG", "ar-SA", "en-US"])
    .withMessage("invalid phone number format only accept [EG - SA - US]"),

  validatorMiddleware,
];

module.exports.deleteUserValidator = [idValidator, validatorMiddleware];
