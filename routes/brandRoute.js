const express = require("express");

const router = express.Router();
const {
  getBrandValidator,
  createBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} = require("../validators/brandValidators");

const {
  createBrand,
  getBrands,
  getBrand,
  updateBrand,
  deleteBrand,
} = require("../services/brandService");

router
  .route("/")
  .get(getBrands)
  .post(createBrandValidator, createBrand);

router
  .route("/:id")
  .get(getBrandValidator, getBrand)
  .patch(updateBrandValidator, updateBrand)
  .delete(deleteBrandValidator, deleteBrand);


module.exports = router;
