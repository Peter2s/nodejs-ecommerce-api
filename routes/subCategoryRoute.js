const express = require("express");
const slugifyName = require("../middlewares/slugifyMiddleWare");

const router = express.Router({ mergeParams: true });
const {
  getSubCategories,
  getSubCategoryById,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
  createFilterObject,
  setCategoryIdToBody,
} = require("../services/subCategoryService");
const {
  getSubCategoryValidator,
  createSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator,
} = require("../validators/subCategoryValidators");
const { authenticate, authorizedTo } = require("../services/authSerivce");

router
  .route("/")
  .get(getSubCategories)
  .post(
    authenticate,
    authorizedTo("admin", "manger"),
    setCategoryIdToBody,
    slugifyName,
    createSubCategoryValidator,
    createSubCategory
  );

router
  .route("/:id")
  .get(getSubCategoryValidator, createFilterObject, getSubCategoryById)
  .patch(
    authenticate,
    authorizedTo("admin", "manger"),
    updateSubCategoryValidator,
    slugifyName,
    updateSubCategory
  )
  .delete(
    authenticate,
    authorizedTo("admin"),
    deleteSubCategoryValidator,
    deleteSubCategory
  );

module.exports = router;
