const express = require("express");

const router = express.Router();

const {
  addProductToCart,
  getCart,
  removeProductFromCart,
  clearCart,
} = require("../services/cartSerivce");

const { authenticate, authorizedTo } = require("../services/authSerivce");

router.use(authenticate, authorizedTo("user"));
router.route("/").get(getCart).post(addProductToCart).patch().delete(clearCart);

router.route("/:id").delete(removeProductFromCart);

module.exports = router;
