const CategoryModel = require("../models/categoryModel");
const factory = require("./handlerFactory");

/*
 * @description get List categories
 * @route GET /api/v1/categories
 * @access public
 *
 */
module.exports.getAllCategories = factory.getAll(CategoryModel);
/*
 * @description Get Category By ID
 * @route  GET /api/v1/categories/id
 * @access public
 */
module.exports.getCategoryById = factory.getOne(CategoryModel);
/*
 * @description create new category
 * @route POST /api/v1/categories
 * @access private
 *
 */
module.exports.createCategory = factory.createOne(CategoryModel);
/*
 *  @description update category
 *  @route PATCH /api/v1/categories/id
 *  @access private
 */
module.exports.updateCategory = factory.updateOne(CategoryModel);

/*
 *  @description Delete Category
 *  @route DELETE /api/v1/categories/id
 *  @access private
 */
module.exports.deleteCategory = factory.deleteOne(CategoryModel);
