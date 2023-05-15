const express = require("express");
const slugifyName = require("../middlewares/slugifyMiddleWare");

const router = express.Router();
const {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require("../validators/caregroyValidators");

const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  uploadCategoryImage,
  resizeImage,
} = require("../services/categoryService");
const subCategoryRoute = require("./subCategoryRoute");
const { authenticate, authorizedTo } = require("../services/authSerivce");

router
  .route("/")
  .get(getAllCategories)
  .post(
    authenticate,
    authorizedTo("admin", "manger"),
    uploadCategoryImage,
    resizeImage,
    createCategoryValidator,
    slugifyName,
    createCategory
  );

router
  .route("/:id")
  .get(getCategoryValidator, getCategoryById)
  .patch(
    authenticate,
    authorizedTo("admin", "manger"),
    uploadCategoryImage,
    resizeImage,
    updateCategoryValidator,
    slugifyName,
    updateCategory
  )
  .delete(
    authenticate,
    authorizedTo("admin"),
    deleteCategoryValidator,
    deleteCategory
  );

router.use("/:categoryId/subcategories", subCategoryRoute);

module.exports = router;
