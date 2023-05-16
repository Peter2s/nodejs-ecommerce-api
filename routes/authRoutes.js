const express = require("express");
const slugifyName = require("../middlewares/slugifyMiddleWare");

const router = express.Router();
const {
  singUpValidator,
  loginValidator,
  forgetPasswordValidator,
  resetPassowrdValidator,
} = require("../validators/authValidators");
const {
  forgetPassword,
  verifyPasswordRestCode,
  resetPassword,
} = require("../services/forgetPasswordService");

const { signup, login } = require("../services/authSerivce");

router.route("/singUp").post(singUpValidator, slugifyName, signup);

router.route("/login").post(loginValidator, login);
router.route("/forgetPassword").post(forgetPasswordValidator, forgetPassword);
router.route("/verifyPasswordRestCode").post(verifyPasswordRestCode);
router.route("/resetPassword").patch(resetPassowrdValidator, resetPassword);

module.exports = router;
