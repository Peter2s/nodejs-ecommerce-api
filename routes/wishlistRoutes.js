const express = require("express");

const router = express.Router();

const {
  getWishlistForAuthenticatedUser,
  addProductToWishlist,
  deleteProductFromWishlist,
} = require("../services/wishlisSerivce");

const { authenticate, authorizedTo } = require("../services/authSerivce");

router.use(authenticate, authorizedTo("user"));
router
  .route("/")
  .get(getWishlistForAuthenticatedUser)
  .post(addProductToWishlist);

router.route("/:id").delete(deleteProductFromWishlist);

module.exports = router;
