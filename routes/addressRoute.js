const express = require("express");

const router = express.Router();

const {
  getAuthenticatedUserAddresses,
  addAddress,
  deleteAddress,
} = require("../services/addressSerivce");

const { authenticate, authorizedTo } = require("../services/authSerivce");

router.use(authenticate, authorizedTo("user"));
router.route("/").get(getAuthenticatedUserAddresses).post(addAddress);

router.route("/:id").delete(deleteAddress);

module.exports = router;
