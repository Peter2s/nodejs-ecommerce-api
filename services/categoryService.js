const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const CategoryModel = require("../models/categoryModel");
const ApiError = require("../utils/ApiError");
const productModel = require("../models/productModel");
const ApiFeatures = require("../utils/ApiFeatures");

/*
 * @description get List categories
 * @route GET /api/v1/categories
 * @access public
 *
 */
module.exports.getAllCategories = asyncHandler(async (req, res, next) => {
  /** BUILD query*/
  const documentsCount = await CategoryModel.countDocuments();
  const apiFeatures = new ApiFeatures(req.query, CategoryModel.find());
  apiFeatures.paginate(documentsCount).filter().sort().limitFields().search();

  const { mongooseQuery, paginationResult } = apiFeatures;
  /** execute query  */
  const categories = await mongooseQuery;
  res
    .status(201)
    .json({ result: categories.length, paginationResult, data: categories });
});
/*
 * @description Get Category By ID
 * @route  GET /api/v1/categories/id
 * @access public
 */
module.exports.getCategoryById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await CategoryModel.findById(id);
  if (!category)
    return next(new ApiError(` no category for this id ${id}`, 404));

  res.status(200).json({ data: category });
});
/*
 * @description create new category
 * @route POST /api/v1/categories
 * @access private
 *
 */
module.exports.createCategory = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const category = await CategoryModel.create({ name, slug: slugify(name) });
  if (!category) return next(new ApiError(` bas request`, 400));

  res.status(201).json({ data: category });
});
/*
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
  if (!category)
    return next(new ApiError(` no category for this id ${id}`, 404));

  res.status(200).json({ data: category });
});

/*
 *  @description Delete Category
 *  @route DELETE /api/v1/categories/id
 *  @access private
 */
module.exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await CategoryModel.findByIdAndDelete(id);
  if (!category)
    return next(new ApiError(` no category for this id ${id}`, 404));

  res.status(204).json({});
});
