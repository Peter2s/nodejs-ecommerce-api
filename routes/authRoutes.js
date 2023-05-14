const express = require("express");
const slugifyName = require("../middlewares/slugifyMiddleWare");

const router = express.Router();
const { singupValidator } = require("../validators/authValidators");
const { signup } = require("../services/authSerivce");

router.route("/singUp").post(singupValidator, slugifyName, signup);

module.exports = router;
