const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const SubCategoryModel = require("../models/subCategoryModel");
const ApiError = require("../utils/ApiError");

/*
 * @description get List sub categories
 * @route GET /api/v1/categories
 * @access public
 *
 */
exports.getSubCategories = asyncHandler(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  let filter = {};
  if(req.params.categoryId) filter  =  {"category":req.params.categoryId} ;
  const skip = (page - 1) * limit;
  const subCategories = await SubCategoryModel.find(filter)
    .skip(skip)
    .limit(limit)
    .populate({ path: "category", select: "name" });
  res.status(201).json({ page, limit, data: subCategories });
});
/*
 * @description Get sub Category By ID
 * @route  GET /api/v1/categories/id
 * @access public
 */
exports.getSubCategoryById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await SubCategoryModel.findById(id)
  .populate({ path: "category", select: "name" });
  if (!subCategory)
    return next(new ApiError(` no subCategory for this id ${id}`, 404));

  res.status(200).json({ data: subCategory });
});
/* middle ware to inject category id to body if exits in url param */
exports.setCategoryIdToBody = (req, res,next) => {
  if(!req.body.category) req.body.category = req.params.categoryId;
  next()
}
/*
 * @description create new sub category
 * @route POST /api/v1/categories
 * @access private
 */
exports.createSubCategory = asyncHandler(async (req, res, next) => {
  const { name, category } = req.body;
  const subCategory = await SubCategoryModel.create({
    name,
    category,
    slug: slugify(name),
  });
  if (!subCategory) return next(new ApiError(` bas request`, 400));

  res.status(201).json({ data: subCategory });
});
/*
 *  @description update sub subCategory
 *  @route PATCH /api/v1/categories/id
 *  @access private
 */
module.exports.updateSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;

  const subCategory = await SubCategoryModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name), category },
    { new: true }
  );
  if (!subCategory)
    return next(new ApiError(` no sub Category for this id ${id}`, 404));

  res.status(200).json({ data: subCategory });
});

/*
 *  @description Delete sub Category
 *  @route DELETE /api/v1/categories/id
 *  @access private
 */
module.exports.deleteSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await SubCategoryModel.findByIdAndDelete(id);
  if (!subCategory) return next(new ApiError(` no   for this id ${id}`, 404));

  res.status(204).json({});
});
