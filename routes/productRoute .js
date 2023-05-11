const express = require("express");
const slugifyName = require("../middlewares/slugifyMiddleWare");

const router = express.Router();
const {
  getProductValidator,
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require("../validators/productValidators");

const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  uploadProductImages,
  resizeImages,
} = require("../services/productService");

router
  .route("/")
  .get(getProducts)
  .post(
    uploadProductImages,
    resizeImages,
    createProductValidator,
    slugifyName,
    createProduct
  );

router
  .route("/:id")
  .get(getProductValidator, getProduct)
  .patch(
    uploadProductImages,
    resizeImages,
    updateProductValidator,
    slugifyName,
    updateProduct
  )
  .delete(deleteProductValidator, deleteProduct);

module.exports = router;
