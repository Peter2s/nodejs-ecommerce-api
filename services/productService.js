const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const productModel = require("../models/productModel");
const ApiError = require("../utils/ApiError");
const ApiFeatures = require("../utils/ApiFeatures");
const factory = require("./handlerFactory");

/*
 * @description get List products
 * @route GET /api/v1/products
 * @access public
 */
module.exports.getProducts = asyncHandler(async (req, res, next) => {
  /** BUILD query*/
  const documentsCount = await productModel.countDocuments();
  const apiFeatures = new ApiFeatures(req.query, productModel.find());
  apiFeatures.paginate(documentsCount).filter().sort().limitFields().search();
  //.populate({ path: "category", select: "name" });

  const { mongooseQuery, paginationResult } = apiFeatures;
  /** execute query  */
  const products = await mongooseQuery;
  res
    .status(200)
    .json({ result: products.length, paginationResult, data: products });
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

module.exports.updateProduct = factory.updateOne(productModel);

/*
 *  @description Delete products
 *  @route DELETE /api/v1/products/id
 *  @access private
 */
module.exports.deleteProduct = factory.deleteOne(productModel);
