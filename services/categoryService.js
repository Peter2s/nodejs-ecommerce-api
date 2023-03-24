const mongoose = require("mongoose");
const slugify = require("slugify");
const CategoryModel = require("../models/categoryModel");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("express-async-handler");

/**
 * @description get List categories
 * @route GET /api/v1/categories
 * @access public
 *
 */
module.exports.getAllCategories = asyncHandler(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const categories = await CategoryModel.find().skip(skip).limit(limit);
  res.status(201).json({ page, limit, data: categories });
});
/**
 * @description Get Category By ID
 * @route  GET /api/v1/categories/id
 * @access public
 */
module.exports.getCategoryById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await CategoryModel.findById(id);
  if (!category)  return next( new ApiError(` no category for this id ${id}`, 404));

  res.status(200).json({ data: category });
});
/**
 * @description create new category
 * @route POST /api/v1/categories
 * @access private
 *
 */
module.exports.createCategory = asyncHandler(async (req, res, next) => {
  const name = req.body.name;
  const category = await CategoryModel.create({ name, slug: slugify(name) });
  if (category) res.status(201).json({ data: category });
  else return new ApiError(` bas request `, 400);
});
/**
 *  @description update category
 *  @route PATCH /api/v1/categories/id
 *  @access private
 */
module.exports.updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const category = await CategoryModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );
  console.log(category);
  if (category) res.status(200).json({ data: category });
  else return new ApiError(` no category for this id ${id}`, 404);
});
/**
 *  @description Delete Category
 *  @route DELETE /api/v1/categories/id
 *  @access private
 */
module.exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const category = await CategoryModel.findByIdAndDelete(id);
    if (category) res.status(204).json({});
    else throw new ApiError(` no category for this id ${id}`, 404);
  } catch (error) {
    next(error);
  }
});
