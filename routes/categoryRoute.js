const express = require("express");

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
} = require("../services/categoryService");
const subCategoryRoute = require("./subCategoryRoute");

router
  .route("/")
  .get(getAllCategories)
  .post(createCategoryValidator, createCategory);

router
  .route("/:id")
  .get(getCategoryValidator, getCategoryById)
  .patch(updateCategoryValidator, updateCategory)
  .delete(deleteCategoryValidator, deleteCategory);

router.use("/:categoryId/subcategories", subCategoryRoute);

module.exports = router;
