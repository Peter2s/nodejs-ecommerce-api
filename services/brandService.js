const BrandModel = require("../models/brandModel ");
const factory = require("./handlerFactory");

/*
 * @description get List brands
 * @route GET /api/v1/brands
 * @access public
 *
 */
module.exports.getBrands = factory.getAll(BrandModel);
/*
 * @description Get Brand By ID
 * @route  GET /api/v1/brands/id
 * @access public
 */
module.exports.getBrand = factory.getOne(BrandModel);
/*
 * @description create new category
 * @route POST /api/v1/categories
 * @access private
 *
 */
module.exports.createBrand = factory.createOne(BrandModel);
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
