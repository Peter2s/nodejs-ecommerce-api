const express = require("express");

const router = express.Router();

const { addProductToCart } = require("../services/cartSerivce");

const { authenticate, authorizedTo } = require("../services/authSerivce");

router.use(authenticate, authorizedTo("user"));
router.route("/").get().post(addProductToCart);

router.route("/:id").get().patch().delete();

module.exports = router;
