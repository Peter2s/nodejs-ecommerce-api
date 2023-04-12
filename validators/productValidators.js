const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");
const validatorMiddleware = require("../middlewares/validatorMiddleware");
const ProductModel = require("../models/productModel");
const CategoryModel = require("../models/categoryModel");
const SubCategoryModel = require("../models/subCategoryModel");


const idValidator = [
  check("id").notEmpty().isMongoId().withMessage("id must be mongodb ID"),
];

module.exports.getProductValidator = [idValidator, validatorMiddleware];

module.exports.createProductValidator = [
  check("name")
    .notEmpty()
    .withMessage("Product name required")
    .isLength({ min: 3 })
    .withMessage("Product name must be 3 or  more chartres ")
    .isLength({ max: 200 })
    .withMessage("product name must be less than 32  chartres"),
  check("description")
    .notEmpty()
    .withMessage("Product description required")
    .isLength({ min: 3 })
    .withMessage("to short Product  description")
    .isLength({ max: 2000 })
    .withMessage("to long Product  description"),
  check("price")
    .notEmpty()
    .withMessage("Product price required")
    .isFloat({ min: 0 })
    .withMessage("price must be positive number"),
  check("priceAfterDiscount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("price after discount must be  positive number")
    .custom((value, { req }) => {
      if (value < req.body.price) {
        throw new Error("price after discount must be < price");
      }
      return true;
    }),
  check("sold")
    .optional()
    .isInt({ min: 0 })
    .withMessage("price sold number must be  positive number"),
  check("quantity")
    .optional()
    .isInt({ min: 0 })
    .withMessage("price sold number must be  positive number"),
  check("color")
    .optional()
    .isArray({ min: 1 })
    .withMessage("color must be array of colors"),
  check("imageCover")
    .notEmpty()
    .withMessage("image cover is required")
    .isString()
    .withMessage("image cover must be string"),
  check("images")
    .optional()
    .isArray({ min: 1 })
    .withMessage("images must be array of images"),
  check("category")
    .notEmpty()
    .isMongoId()
    .withMessage("invalid  Category id")
    /** check if category id exists in data base */
    .custom((categoryId) =>
      CategoryModel.findById(categoryId).then((category) => {
        if (!category)
          return Promise.reject(new Error("no category for this id"));
      })
    ),
  check("subCategories")
    .optional()
    .isMongoId()
    .withMessage("invalid Sub Category id")
    /** check if ids is exists in data base */
    .custom((subCategoriesIds) =>
      SubCategoryModel.find({
        _id: { $exists: true, $in: subCategoriesIds },
      }).then((result) => {
        if (result.length < 1 || result.length > subCategoriesIds.length)
          return Promise.reject(new Error("invalid sub categories ids"));
      })
    )
    /** check if this sub category belong to this category */
    .custom(asyncHandler( async (value, { req }) => {
        const subCategoryDocs = await SubCategoryModel.find({
          category: req.body.category,
        });
      
        const subCategoriesIds = subCategoryDocs.map((val) =>
          val._id.toString()
        );
        // console.log(!value.every((v) => subCategoriesIds.includes(v)));
        // console.log(subCategoriesIds,value);
        const allValuesValid = value.every((v) => subCategoriesIds.includes(v));
        if (!allValuesValid) {
          throw new Error("this sub category not belong to this category");
        }
    })),
  check("brand").optional().isMongoId().withMessage("invalid brand id"),
  check("ratingAverage")
    .optional()
    .isInt({ min: 0, max: 5 })
    .withMessage("rating Average must be number between [1,5] "),
  check("ratingsQuantity")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("ratings quantity must be number "),

  validatorMiddleware,
];

module.exports.updateProductValidator = [idValidator, validatorMiddleware];
module.exports.deleteProductValidator = [idValidator, validatorMiddleware];
