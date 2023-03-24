const express = require("express");
const router = express.Router();

const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../services/categoryService");

router.route("/api/v1/categories")
  .get(getAllCategories)
  .post(createCategory);

router
  .route("/api/v1/categories/:id")
  .get(getCategoryById)
  .patch(updateCategory)
  .delete(deleteCategory);

module.exports = router;
