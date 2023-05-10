const productModel = require("../models/productModel");
const factory = require("./handlerFactory");

/*
 * @description get List products
 * @route GET /api/v1/products
 * @access public
 */
module.exports.getProducts = factory.getAll(productModel);

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
