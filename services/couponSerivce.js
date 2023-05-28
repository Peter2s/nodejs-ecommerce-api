const factory = require("./handlerFactory");
const couponModel = require("../models/couponModel");

/*
 * @description get List coupons
 * @route GET /api/v1/coupons
 * @access private [admin - manger]
 *
 */
module.exports.getCoupons = factory.getAll(couponModel);
/*
 * @description Get coupon By ID
 * @route  GET /api/v1/coupons/:id
 * @access public
 */
module.exports.getCoupon = factory.getOne(couponModel);
/*
 * @description create new Coupon
 * @route POST /api/v1/Coupons
 * @access private
 *
 */
module.exports.createCoupon = factory.createOne(couponModel);
/*
 *  @description update Coupon
 *  @route PATCH /api/v1/coupons/:id
 *  @access private
 */
module.exports.updateCoupon = factory.updateOne(couponModel);

/*
 *  @description Delete Coupon
 *  @route DELETE /api/v1/Coupons/id
 *  @access private
 */
module.exports.deleteCoupon = factory.deleteOne(couponModel);
