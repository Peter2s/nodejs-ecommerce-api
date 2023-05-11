const sharp = require("sharp");
const factory = require("./handlerFactory");
const AsyncHandler = require("express-async-handler");
const { uploadSingleImage } = require("../middlewares/uploadImages");
const CategoryModel = require("../models/categoryModel");
// upload category image
module.exports.uploadCategoryImage = uploadSingleImage("image");
// image processing middle to resize image size
module.exports.resizeImage = AsyncHandler(async ({ body, file }, res, next) => {
  const fileName = `category-${Date.now()}-${Math.round(
    Math.random() * 1e9
  )}.jpg`;
  await sharp(file.buffer)
    .resize(800, 800)
    .toFormat("jpeg")
    .jpeg({ quality: 80 })
    .toFile(`uploads/categories/${fileName}`);
  //save the image path into database
  body.image = fileName;
  next();
});

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
