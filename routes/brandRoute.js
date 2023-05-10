const express = require("express");
const slugifyName = require("../middlewares/slugifyMiddleWare");

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
  .post(createBrandValidator, slugifyName, createBrand);

router
  .route("/:id")
  .get(getBrandValidator, getBrand)
  .patch(updateBrandValidator, slugifyName, updateBrand)
  .delete(deleteBrandValidator, deleteBrand);

module.exports = router;
