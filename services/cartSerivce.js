const AsyncHandler = require("express-async-handler");
const ProductModel = require("../models/productModel");
const CartModel = require("../models/cartModel");
const ApiError = require("../utils/ApiError");

const CalclateCartTotalPrice = (cart) => {
  let cartTotalPrice = 0;

  cart.cartItems.forEach(
    // eslint-disable-next-line no-return-assign
    (item) => (cartTotalPrice += item.price * item.quantity)
  );

  return cartTotalPrice;
};
/*
 * @description get cart for authenticated  user
 * @route GET /api/v1/cart
 * @access private
 *
 */
module.exports.getCart = AsyncHandler(async (req, res, next) => {
  const cart = await CartModel.findOne({
    user: req.user._id,
  });
  if (!cart) next(new ApiError("there is not cart ", 404));

  res
    .status(200)
    .json({ status: "success", cartItems: cart.cartItems.length, data: cart });
});

/*
 * @description add product to cart
 * @route POST /api/v1/cart
 * @access private
 *
 */
module.exports.addProductToCart = AsyncHandler(async (req, res) => {
  const { productId, quantity, color } = req.body;
  const product = await ProductModel.findById(productId);
  let cart = await CartModel.findOne({ user: req.user._id });
  if (!cart) {
    cart = await CartModel.create({
      user: req.user._id,
      cartItems: {
        product: productId,
        quantity,
        color,
        price: product.price,
      },
    });
  } else {
    // if product exists already update quantity
    const productIndex = cart.cartItems.findIndex(
      (item) => item.product.toString() === productId && item.color === color
    );
    if (productIndex > -1) {
      const cartItem = cart.cartItems[productIndex];
      cartItem.quantity += 1;
      cart.cartItems[productIndex] = cartItem;
    } else {
      // push new product to cart
      cart.cartItems.push({
        product: productId,
        quantity,
        color,
        price: product.price,
      });
    }
  }
  cart.totalPrice = CalclateCartTotalPrice(cart);
  await cart.save();
});
/*
 * @description remove product from cart
 * @route DELETE /api/v1/cart
 * @access private[user]
 */
module.exports.removeProductFromCart = AsyncHandler(async (req, res, next) => {
  const { itemId } = req.body;
  const cart = await CartModel.findOneAndUpdate(
    { user: req.user._id },
    {
      $pull: {
        cartItems: {
          _id: itemId,
        },
      },
    },
    { new: true }
  );
  cart.totalPrice = CalclateCartTotalPrice(cart);
  cart.save();
  res.status(200).json({
    status: "success",
    message: "product successfully removed",
    data: cart,
  });
});

/*
 * @description clear cart for authenticated user
 * @route DELETE /api/v1/cart
 * @access private[user]
 */

module.exports.clearCart = AsyncHandler(async (req, res) => {
  await CartModel.findOneAndDelete({ user: req.user._id });
  res
    .status(200)
    .json({ status: "success", message: "cart cleared successfully" });
});
