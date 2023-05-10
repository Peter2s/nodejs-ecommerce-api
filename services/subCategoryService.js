const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const SubCategoryModel = require("../models/subCategoryModel");
const ApiError = require("../utils/ApiError");
const ApiFeatures = require("../utils/ApiFeatures");
const factory = require("./handlerFactory");

/*
 * @description get List sub categories
 * @route GET /api/v1/categories
 * @access public
 *
 */
exports.getSubCategories = asyncHandler(async (req, res, next) => {
  //get sub categories by category id
  let filter = {};
  if (req.params.categoryId) filter = { category: req.params.categoryId };

  /** BUILD query*/
  const documentsCount = await SubCategoryModel.countDocuments();
  const apiFeatures = new ApiFeatures(req.query, SubCategoryModel.find(filter));
  apiFeatures
    .paginate(documentsCount)
    //.populate({ path: "category", select: "name" })
    .filter()
    .sort()
    .limitFields()
    .search();

  const { mongooseQuery, paginationResult } = apiFeatures;
  /** execute query  */
  const subCategories = await mongooseQuery;

  res.status(201).json({
    result: subCategories.length,
    paginationResult,
    data: subCategories,
  });
});
/*
 * @description Get sub Category By ID
 * @route  GET /api/v1/categories/id
 * @access public
 */
exports.getSubCategoryById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await SubCategoryModel.findById(id).populate({
    path: "category",
    select: "name",
  });
  if (!subCategory)
    return next(new ApiError(` no subCategory for this id ${id}`, 404));

  res.status(200).json({ data: subCategory });
});
/* middle ware to inject category id to body if exits in url param */
exports.setCategoryIdToBody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};
/*
 * @description create new sub category
 * @route POST /api/v1/categories
 * @access private
 */
exports.createSubCategory = factory.createOne(SubCategoryModel);
/*
 *  @description update sub subCategory
 *  @route PATCH /api/v1/categories/id
 *  @access private
 */
module.exports.updateSubCategory = factory.updateOne(SubCategoryModel);

/*
 *  @description Delete sub Category
 *  @route DELETE /api/v1/categories/id
 *  @access private
 */
module.exports.deleteSubCategory = factory.deleteOne(SubCategoryModel);
