const AsyncHandler = require("express-async-handler");
const ProductModel = require("../models/productModel");
const CartModel = require("../models/cartModel");

/*
 * @description add product to cart
 * @route POST /api/v1/categories
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
  await cart.save();
});
