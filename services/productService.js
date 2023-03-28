const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const productModel = require("../models/productModel");
const ApiError = require("../utils/ApiError");

/*
 * @description get List products
 * @route GET /api/v1/products
 * @access public
 */
module.exports.getProducts = asyncHandler(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const products = await productModel.find()
    .skip(skip)
    .limit(limit)
    .populate({ path: "category", select: "name" });
  res.status(201).json({ page, limit, data: products });
});
/*
 * @description Get product By ID
 * @route  GET /api/v1/products/id
 * @access public
 */
module.exports.getProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await productModel
    .findById(id)
    .populate({ path: "category", select: "name" });

  if (!product) return next(new ApiError(` no product for this id ${id}`, 404));

  res.status(200).json({ data: product });
});
/*
 * @description create new product
 * @route POST /api/v1/products
 * @access private
 *
 */
module.exports.createProduct = asyncHandler(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  const product = await productModel.create(req.body);
  if (!product) return next(new ApiError(` bas request`, 400));

  res.status(201).json({ data: product });
});
/*
 *  @description update product
 *  @route PATCH /api/v1/products/id
 *  @access private
 */
module.exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (req.body.name)
    req.body.slug = slugify(req.body.name);

  const product = await productModel.findOneAndUpdate(
    { _id: id },
    req.body,
    { new: true }
  );
  if (!product)
    return next(new ApiError(` no product for this id ${id}`, 404));

  res.status(200).json({ data: product });
});

/*
 *  @description Delete products
 *  @route DELETE /api/v1/products/id
 *  @access private
 */
module.exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await productModel.findByIdAndDelete(id);
  if (!product)
    return next(new ApiError(` no product for this id ${id}`, 404));

  res.status(204).json({});
});
