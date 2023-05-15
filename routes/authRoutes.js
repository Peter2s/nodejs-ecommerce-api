const express = require("express");
const slugifyName = require("../middlewares/slugifyMiddleWare");

const router = express.Router();
const {
  singUpValidator,
  loginValidator,
} = require("../validators/authValidators");

const { signup, login } = require("../services/authSerivce");

router.route("/singUp").post(singUpValidator, slugifyName, signup);

router.route("/login").post(loginValidator, login);

module.exports = router;
