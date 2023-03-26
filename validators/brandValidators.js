const { check } = require("express-validator");
const validatorMiddleware = require("../middlewares/validatorMiddleware");

const idValidator = [
  check("id").notEmpty().isMongoId().withMessage("id must be mongodb ID"),
];

module.exports.getBrandValidator = [idValidator, validatorMiddleware];

module.exports.createBrandValidator = [
  check("name")
    .notEmpty()
    .isLength({ min: 2 })
    .withMessage("Brand name must be 3 or  more chartres ")
    .isLength({ max: 32 })
    .withMessage("Brand name must be less than 32  chartres"),
  validatorMiddleware,
];

module.exports.updateBrandValidator = [idValidator, validatorMiddleware];
module.exports.deleteBrandValidator = [idValidator, validatorMiddleware];
