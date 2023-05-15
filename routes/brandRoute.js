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

const { authenticate, authorizedTo } = require("../services/authSerivce");

router
  .route("/")
  .get(getBrands)
  .post(
    authenticate,
    authorizedTo("admin", "manger"),
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
    authenticate,
    authorizedTo("admin", "manger"),
    uploadCBrandImage,
    resizeImage,
    updateBrandValidator,
    slugifyName,
    updateBrand
  )
  .delete(
    authenticate,
    authorizedTo("admin"),
    deleteBrandValidator,
    deleteBrand
  );

module.exports = router;
