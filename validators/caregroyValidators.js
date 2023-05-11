const { check } = require("express-validator");
const validatorMiddleware = require("../middlewares/validatorMiddleware");

const idValidator = [
  check("id").notEmpty().isMongoId().withMessage("id must be mongodb ID"),
];

module.exports.getCategoryValidator = [idValidator, validatorMiddleware];

module.exports.createCategoryValidator = [
  check("name")
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage("Category name must be 3 or  more chartres ")
    .isLength({ max: 32 })
    .withMessage("Category name must be less than 32  chartres"),
  validatorMiddleware,
];

module.exports.updateCategoryValidator = [
  idValidator,
  check("name")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Category name must be 3 or  more chartres ")
    .isLength({ max: 32 })
    .withMessage("Category name must be less than 32  chartres"),
  validatorMiddleware,
];
module.exports.deleteCategoryValidator = [idValidator, validatorMiddleware];
