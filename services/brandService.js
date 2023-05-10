const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const BrandModel = require("../models/brandModel ");
const ApiError = require("../utils/ApiError");
const ApiFeatures = require("../utils/ApiFeatures");
const factory = require("./handlerFactory");
const productModel = require("../models/productModel");

/*
 * @description get List brands
 * @route GET /api/v1/brands
 * @access public
 *
 */
module.exports.getBrands = asyncHandler(async (req, res, next) => {
  /** BUILD query*/
  const documentsCount = await BrandModel.countDocuments();
  const apiFeatures = new ApiFeatures(req.query, BrandModel.find());
  apiFeatures.paginate(documentsCount).filter().sort().limitFields().search();

  const { mongooseQuery, paginationResult } = apiFeatures;
  /** execute query  */
  const brands = await mongooseQuery;
  res
    .status(200)
    .json({ result: brands.length, paginationResult, data: brands });
});
/*
 * @description Get Brand By ID
 * @route  GET /api/v1/brands/id
 * @access public
 */
module.exports.getBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await BrandModel.findById(id);
  if (!brand) return next(new ApiError(` no brand for this id ${id}`, 404));

  res.status(200).json({ data: brand });
});
/*
 * @description create new category
 * @route POST /api/v1/categories
 * @access private
 *
 */
module.exports.createBrand = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const brand = await BrandModel.create({ name, slug: slugify(name) });
  if (!brand) return next(new ApiError(` bas request`, 400));

  res.status(201).json({ data: brand });
});
/*
 *  @description update brand
 *  @route PATCH /api/v1/brands/id
 *  @access private
 */
module.exports.updateBrand = factory.updateOne(BrandModel);

/*
 *  @description Delete Brand
 *  @route DELETE /api/v1/brands/id
 *  @access private
 */
module.exports.deleteBrand = factory.deleteOne(BrandModel);
