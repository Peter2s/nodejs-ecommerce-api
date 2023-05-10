const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const CategoryModel = require("../models/categoryModel");
const ApiError = require("../utils/ApiError");
const productModel = require("../models/productModel");
const ApiFeatures = require("../utils/ApiFeatures");
const factory = require("./handlerFactory");
const BrandModel = require("../models/brandModel ");

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
module.exports.getCategoryById = factory.getOne(CategoryModel);
/*
 * @description create new category
 * @route POST /api/v1/categories
 * @access private
 *
 */
module.exports.createCategory = factory.createOne(CategoryModel);
/*
 *  @description update category
 *  @route PATCH /api/v1/categories/id
 *  @access private
 */
module.exports.updateCategory = factory.updateOne(CategoryModel);

/*
 *  @description Delete Category
 *  @route DELETE /api/v1/categories/id
 *  @access private
 */
module.exports.deleteCategory = factory.deleteOne(CategoryModel);
