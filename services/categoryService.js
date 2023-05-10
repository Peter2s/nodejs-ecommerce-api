const CategoryModel = require("../models/categoryModel");
const factory = require("./handlerFactory");
const multer = require("multer");
const ApiError = require("../utils/ApiError");

//multer disk storage configuration
const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/categories");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    const fileName = `category-${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}.${ext}`;
    console.log(file);
    cb(null, fileName);
  },
});

// multer file filter to allow images files only
const multerFilesFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) cb(null, true);
  else cb(new ApiError("images only allowed", 400), false);
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilesFilter,
});

// multer upload single image middleware
module.exports.uploadCategoryImage = upload.single("image");

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
