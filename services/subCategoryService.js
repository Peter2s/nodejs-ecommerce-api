const SubCategoryModel = require("../models/subCategoryModel");
const factory = require("./handlerFactory");

/*
 * @route Post /api/v1/categories/:id/subCategory
 * @description middle ware to inject category id to body if exits in url param
 */
exports.setCategoryIdToBody = ({ body, params }, res, next) => {
  if (!body.category) body.category = params.categoryId;
  next();
};

exports.createFilterObject = ({ body, params }, res, next) => {
  if (params.categoryId) body.filterObject = { category: params.categoryId };
  next();
};

/*
 * @description get List sub categories
 * @route GET /api/v1/categories
 * @access public
 *
 */

exports.getSubCategories = factory.getAll(SubCategoryModel);
/*
 * @description Get sub Category By ID
 * @route  GET /api/v1/categories/id
 * @access public
 */

exports.getSubCategoryById = factory.getOne(SubCategoryModel);
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
