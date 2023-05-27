const express = require("express");

const router = express.Router({ mergeParams: true });

const {
  getReviewValidator,
  createReviewValidator,
  updateReviewValidator,
  deleteReviewValidator,
} = require("../validators/reviewValidators");

const {
  createReview,
  getReviews,
  getReview,
  updateReview,
  deleteReview,
  createFilterObject,
  setProductIdToBody,
} = require("../services/reviewService");

const { authenticate, authorizedTo } = require("../services/authSerivce");

router
  .route("/")
  .get(getReviews)
  .post(
    authenticate,
    authorizedTo("user"),
    createReviewValidator,
    setProductIdToBody,
    createReview
  );

router
  .route("/:id")
  .get(getReviewValidator, createFilterObject, getReview)
  .patch(
    authenticate,
    authorizedTo("user"),
    updateReviewValidator,
    updateReview
  )
  .delete(
    authenticate,
    authorizedTo("admin", "manger", "user"),
    deleteReviewValidator,
    deleteReview
  );

module.exports = router;
