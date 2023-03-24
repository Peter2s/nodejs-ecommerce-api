const express = require("express");

const router = express.Router();
const {
  getAllSubCategories,
  getSubCategoryById,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
} = require("../services/subCategoryService");
const {
  getSubCategoryValidator,
  createSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator,
} = require("../validators/subCategoryValidators");

router
  .route("/api/v1/subCategories")
  .get(getAllSubCategories)
  .post(createSubCategoryValidator, createSubCategory);

router
  .route("/api/v1/subCategories/:id")
  .get(getSubCategoryValidator, getSubCategoryById)
  .patch(updateSubCategoryValidator, updateSubCategory)
  .delete(deleteSubCategoryValidator, deleteSubCategory)

module.exports = router;
