const factory = require("./handlerFactory");

exports.createFilterObject = ({ body, params }, res, next) => {
  if (params.productId) body.filterObject = { product: params.productId };
  next();
};
/*
 * @route Post /api/v1/products/:id/reviews
 * @description middle ware to inject product id to body if exits in url param
 */
exports.setProductIdToBody = ({ body, params }, res, next) => {
  if (params.productId) body.filterObject = { product: params.productId };
  next();
};

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
