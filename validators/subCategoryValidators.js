const { check } = require("express-validator");
const validatorMiddleware = require("../middlewares/validatorMiddleware");

const idValidator = [
  check("id").isMongoId().withMessage("id must be mongodb ID"),
];

module.exports.getSubCategoryValidator = [idValidator, validatorMiddleware];

module.exports.createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage("sub Category name must be 3 or  more chartres ")
    .isLength({ max: 32 })
    .withMessage("sub Category name must be less than 32  chartres"),
  check("category").isMongoId().withMessage("invalid category ID"),
  validatorMiddleware,
];

module.exports.updateSubCategoryValidator = [
  idValidator,
  check("category").optional().isMongoId().withMessage("category is invalid format"),
  validatorMiddleware,
];
module.exports.deleteSubCategoryValidator = [idValidator, validatorMiddleware];
