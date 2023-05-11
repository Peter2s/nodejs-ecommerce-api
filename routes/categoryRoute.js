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

router
  .route("/")
  .get(getAllCategories)
  .post(
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
    uploadCategoryImage,
    resizeImage,
    updateCategoryValidator,
    slugifyName,
    updateCategory
  )
  .delete(deleteCategoryValidator, deleteCategory);

router.use("/:categoryId/subcategories", subCategoryRoute);

module.exports = router;
