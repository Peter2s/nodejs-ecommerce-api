const express = require("express");

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

router.route("/")
  .get(getProducts)
  .post(createProductValidator, createProduct);

router
  .route("/:id")
  .get(getProductValidator, getProduct)
  .patch(updateProductValidator, updateProduct)
  .delete(deleteProductValidator, deleteProduct);


module.exports = router;
