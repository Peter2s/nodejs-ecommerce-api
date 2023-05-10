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
} = require("../services/productService");

router
  .route("/")
  .get(getProducts)
  .post(createProductValidator, slugifyName, createProduct);

router
  .route("/:id")
  .get(getProductValidator, getProduct)
  .patch(updateProductValidator, slugifyName, updateProduct)
  .delete(deleteProductValidator, deleteProduct);

module.exports = router;
