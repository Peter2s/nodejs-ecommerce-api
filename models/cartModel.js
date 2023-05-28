const mongoose = require("mongoose");

const CartSchema = mongoose.Schema(
  {
    cartItems: [
      {
        products: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
        },
        price: Number,
        color: String,
        Size: String,
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    totalPrice: Number,
    totalPriceAfterDiscount: Number,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const CartModel = mongoose.model("Cart", CartSchema);
module.exports = CartModel;
