const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const productModel = require("../models/productModel");
const ApiError = require("../utils/ApiError");
const ApiFeatures = require("../utils/ApiFeatures");
const factory = require("./handlerFactory");
const CategoryModel = require("../models/categoryModel");

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
module.exports.getProduct = factory.getOne(productModel);
/*
 * @description create new product
 * @route POST /api/v1/products
 * @access private
 *
 */
module.exports.createProduct = factory.createOne(productModel);
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
