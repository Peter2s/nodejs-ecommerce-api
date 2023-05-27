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
const { authenticate, authorizedTo } = require("../services/authSerivce");
const reviewsRoute = require("./reviewRoutes");
// /products/:productId/reviews
router.use("/:productId/reviews", reviewsRoute);
router
  .route("/")
  .get(getProducts)
  .post(
    authenticate,
    authorizedTo("admin", "manger"),
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
    authenticate,
    authorizedTo("admin", "manger"),
    uploadProductImages,
    resizeImages,
    updateProductValidator,
    slugifyName,
    updateProduct
  )
  .delete(
    authenticate,
    authorizedTo("admin"),
    deleteProductValidator,
    deleteProduct
  );

module.exports = router;
