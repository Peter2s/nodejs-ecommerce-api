const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const BrandModel = require("../models/brandModel ");
const ApiError = require("../utils/ApiError");

/*
 * @description get List brands
 * @route GET /api/v1/brands
 * @access public
 *
 */
module.exports.getBrands = asyncHandler(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const brands = await BrandModel.find().skip(skip).limit(limit);
  res.status(201).json({ page, limit, data: brands });
});
/*
 * @description Get Brand By ID
 * @route  GET /api/v1/brands/id
 * @access public
 */
module.exports.getBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await BrandModel.findById(id);
  if (!brand)
    return next(new ApiError(` no brand for this id ${id}`, 404));

  res.status(200).json({ data: brand });
});
/*
 * @description create new category
 * @route POST /api/v1/categories
 * @access private
 *
 */
module.exports.createBrand = asyncHandler(async (req, res, next) => {
  const {name} = req.body;
  const brand = await BrandModel.create({ name, slug: slugify(name) });
  if (!brand) return next(new ApiError(` bas request`, 400));

  res.status(201).json({ data: brand });
});
/*
 *  @description update brand
 *  @route PATCH /api/v1/brands/id
 *  @access private
 */
module.exports.updateBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const brand = await BrandModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );
  if (!brand)
    return next(new ApiError(` no brand for this id ${id}`, 404));

  res.status(200).json({ data: brand });
});

/*
 *  @description Delete Brand
 *  @route DELETE /api/v1/brands/id
 *  @access private
 */
module.exports.deleteBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await BrandModel.findByIdAndDelete(id);
  if (!brand)
    return next(new ApiError(` no brand for this id ${id}`, 404));

  res.status(204).json({});
});
