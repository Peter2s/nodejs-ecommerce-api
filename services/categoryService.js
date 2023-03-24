const mongoose = require("mongoose");
const slugify = require("slugify");
const CategoryModel = require("../models/categoryModel");

/**
 * @description get List categories
 * @route GET /api/v1/categories
 * @access public
 *
 */
module.exports.getAllCategories = async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  try {
    const categories = await CategoryModel.find().skip(skip).limit(limit);
    res.status(201).json({ page, limit, data: categories });
  } catch (error) {
    next(error);
  }
};
/**
 * @description Get Category By ID
 * @route  GET /api/v1/categories/id 
 * @access public
 
 */
module.exports.getCategoryById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const category = await CategoryModel.findById(id);
    if (category) res.status(200).json({ data: category });
  } catch (error) {
    error.status = 404;
    error.massage = ` no category for this id ${id}`;
    next(error);
  }
};
/**
 * @description create new category
 * @route POST /api/v1/categories
 * @access private
 *
 */
module.exports.createCategory = async (req, res, next) => {
  const name = req.body.name;
  try {
    const category = await CategoryModel.create({ name, slug: slugify(name) });
    res.status(201).json({ data: category });
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

/**
 *  @description update category
 *  @route PATCH /api/v1/categories/id
 *  @access private
 */
module.exports.updateCategory = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const category = await CategoryModel.findOneAndUpdate(
      { _id: id },
      { name ,slug:slugify(name)},
      { new: true }
    );
    if (category) res.status(200).json({ data: category });
  } catch (error) {
    error.status = 404;
    error.massage = ` no category for this id ${id}`;
    next(error);
  }
};
/**
 *  @description Delete Category
 *  @route DELETE /api/v1/categories/id
 *  @access private
 */
module.exports.deleteCategory = async (req, res, next) => {
  const { id } = req.params;
  try {
 const category = await CategoryModel.findByIdAndDelete(id);
    confirm.log(category);
    if (category) res.status(204).json({});
  } catch (error) {
    error.status = 404;
    error.massage = ` no category for this id ${id}`;
    next(error);
  }
};
