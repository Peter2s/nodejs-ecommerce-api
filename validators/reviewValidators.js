const { check } = require("express-validator");
const validatorMiddleware = require("../middlewares/validatorMiddleware");
const ReviewModel = require("../models/reviewModel");
const ApiError = require("../utils/ApiError");

const idValidator = [
  check("id").isMongoId().withMessage("id must be mongodb ID"),
];

module.exports.getReviewValidator = [idValidator, validatorMiddleware];

module.exports.createReviewValidator = [
  check("title").optional(),
  check("rating")
    .isFloat({ min: 1, max: 5 })
    .withMessage("rating must be between 1   and 5 "),

  check("product")
    .isMongoId()
    .withMessage("invalid review ID format")
    .custom(async (val, { req }) => {
      //check if this user already reviewed this product
      const userId = req.user._id;
      const review = await ReviewModel.findOne({
        product: val.toString(),
        user: userId,
      });

      if (review)
        return Promise.reject(
          new ApiError("you already have a review on this product", 400)
        );
      //add user id to body
      req.body.user = userId;
    }),
  //check("user").isMongoId().withMessage("invalid user ID format"),
  validatorMiddleware,
];

module.exports.updateReviewValidator = [
  check("id")
    .isMongoId()
    .withMessage("invalid review ID format")
    .custom(async (val, { req }) => {
      //check if user update his/her review
      const userId = req.user._id;
      const review = await ReviewModel.findById(val);
      if (!review)
        return Promise.reject(new ApiError("not review with this ID", 404));
      if (review.user._id.toString() !== userId.toString())
        return Promise.reject(
          new ApiError("you are not allowed to this action", 403)
        );
    }),
  validatorMiddleware,
];
module.exports.deleteReviewValidator = [
  check("id")
    .isMongoId()
    .withMessage("invalid review ID format")
    .custom(async (val, { req }) => {
      // check if role == user, check user allowed to delete his/her reviews only
      if (req.user.role === "user") {
        const userId = req.user._id;
        const review = await ReviewModel.findById(val);
        if (!review)
          return Promise.reject(new ApiError("not review with this ID", 404));
        console.log(review);
        if (review.user._id.toString() !== userId.toString())
          return Promise.reject(
            new ApiError("you are not allowed to this action", 403)
          );
      }
    }),
  validatorMiddleware,
];
