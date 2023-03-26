const { check } = require("express-validator");
const validatorMiddleware = require("../middlewares/validatorMiddleware");

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
    .isLength({ max: 32 })
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
  check("color").isArray().withMessage("color must be array of colors"),
  check("imageCover")
    .notEmpty()
    .withMessage("image cover is required")
    .isString()
    .withMessage("image cover must be string"),
  check("images")
    .optional()
    .isArray()
    .withMessage("images must be array of images"),
  check("subCategory")
    .optional()
    .isMongoId()
    .withMessage("invalid Sub Category id"),
  check("brand").optional().isMongoId().withMessage("invalid brand id"),
  check("ratingAverage")
    .notEmpty()
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
