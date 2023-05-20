const AsyncHandler = require("express-async-handler");

const factory = require("./handlerFactory");
const ReviewModel = require("../models/reviewModel");

/*
 * @description get List reviews
 * @route GET /api/v1/reviews
 * @access public
 *
 */
module.exports.getReviews = factory.getAll(ReviewModel);
/*
 * @description Get review By ID
 * @route  GET /api/v1/reviews/id
 * @access public
 */
module.exports.getReview = factory.getOne(ReviewModel);
/*
 * @description create new review
 * @route POST /api/v1/reviews
 * @access private
 *
 */
module.exports.createReview = factory.createOne(ReviewModel);
/*
 *  @description update Review
 *  @route PATCH /api/v1/reviews/id
 *  @access private
 */
module.exports.updateReview = factory.updateOne(ReviewModel);

/*
 *  @description Delete review
 *  @route DELETE /api/v1/reviews/id
 *  @access private
 */
module.exports.deleteReview = factory.deleteOne(ReviewModel);
