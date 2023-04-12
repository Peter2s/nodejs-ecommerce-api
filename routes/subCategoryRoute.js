const express = require("express");

const router = express.Router({mergeParams:true});
const {
  getSubCategories,
  getSubCategoryById,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
  setCategoryIdToBody,
} = require("../services/subCategoryService");
const {
  getSubCategoryValidator,
  createSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator,
} = require("../validators/subCategoryValidators");

router
  .route("/")
  .get(getSubCategories)
  .post(setCategoryIdToBody,createSubCategoryValidator, createSubCategory);

router
  .route("/:id")
  .get(getSubCategoryValidator, getSubCategoryById)
  .patch(updateSubCategoryValidator, updateSubCategory)
  .delete(deleteSubCategoryValidator, deleteSubCategory)

module.exports = router;