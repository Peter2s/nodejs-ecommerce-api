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
  uploadCBrandImage,
  resizeImage,
} = require("../services/brandService");

router
  .route("/")
  .get(getBrands)
  .post(
    uploadCBrandImage,
    resizeImage,
    createBrandValidator,
    slugifyName,
    createBrand
  );

router
  .route("/:id")
  .get(getBrandValidator, getBrand)
  .patch(
    uploadCBrandImage,
    resizeImage,
    updateBrandValidator,
    slugifyName,
    updateBrand
  )
  .delete(deleteBrandValidator, deleteBrand);

module.exports = router;
