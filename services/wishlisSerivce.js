const AsyncHandler = require("express-async-handler");
const UserModel = require("../models/userModel");

/*
 * @description get wish list for authenticated user
 * @route GET /api/v1/wishlist
 * @access private
 */
module.exports.getWishlistForAuthenticatedUser = AsyncHandler(
  async (req, res, next) => {
    const user = await UserModel.findById(req.user._id);
    res.status(200).json({
      status: "success",
      result: user.wishlist.length,
      data: user.wishlist,
    });
  }
);
/*
 * @description add product to wishlist
 * @route POST /api/v1/wishlist
 * @access private
 */
module.exports.addProductToWishlist = AsyncHandler(async (req, res, next) => {
  const user = await UserModel.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: { wishlist: req.body.productId },
    },
    { new: true }
  );
  res.status(201).json({
    status: "success",
    message: "Wishlist added successfully",
    data: user.wishlist,
  });
});
/*
 * @description remove product from wishlist
 * @route DELETE /api/v1/wishlist/:id
 * @access private
 */
module.exports.deleteProductFromWishlist = AsyncHandler(
  async (req, res, next) => {
    const user = await UserModel.findByIdAndUpdate(
      req.user._id,
      {
        $pull: { wishlist: req.params.productId },
      },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      message: "Wishlist removed successfully",
      data: user.wishlist,
    });
  }
);
