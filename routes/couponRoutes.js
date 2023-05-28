const express = require("express");

const router = express.Router();

const {
  createCoupon,
  getCoupon,
  getCoupons,
  updateCoupon,
  deleteCoupon,
} = require("../services/couponSerivce");

const { authenticate, authorizedTo } = require("../services/authSerivce");

router.use(authenticate, authorizedTo("admin", "manger"));
router.route("/").get(getCoupons).post(createCoupon);

router.route("/:id").get(getCoupon).patch(updateCoupon).delete(deleteCoupon);

module.exports = router;
