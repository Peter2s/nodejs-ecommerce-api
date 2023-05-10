const SubCategoryModel = require("../models/subCategoryModel");
const factory = require("./handlerFactory");

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
