const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name required"],
      trim: true,
      unique: [true, "Product name must be unique"],
      minLength: [3, "Product name must be 3 or  more chartres "],
      maxLength: [200, "Product name must be less than 32  chartres "],
    },
    description: {
      type: String,
      required: [true, "Product description required"],
      minLength: [20, "to short Product  description"],
      maxLength: [2000, "to long Product  description"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    price: {
      type: Number,
      required: [true, "price description required"],
      min: [0, "price must be positive number"],
      max: [200000, "to long Product  price"],
    },
    priceAfterDiscount: {
      price: {
        type: Number,
        min: [0, "price after discount must be positive number"],
        max: [2000000, "to long Product  price after discount"],
      },
    },
    sold: {
      type: Number,
      min: [0, "sold must be positive number"],
      default: 0,
    },
    quantity: {
      type: Number,
      min: [0, "quantity must be positive number"],
      default: 0,
    },
    color: [String],
    imageCover: {
      type: String,
      required: true,
    },
    images: [String],
    category: {
      type: mongoose.Types.ObjectId,
      ref: "category",
      required: [true, "category required"],
    },
    subCategories: {
      type: [mongoose.Types.ObjectId],
      ref: "subCategory",
    },
    brand: {
      type: mongoose.Types.ObjectId,
      ref: "brand",
    },
    ratingAverage: {
      type: Number,
      min: [1, "rating must be between 1 - 5"],
      max: [5, "rating must be between 1 - 5"],
    },
    ratingsQuantity: {
      type: Number,
      min: 0,
      default: 0,
    },
  },
  { timestamps: true }
);
// mongoose query middleware
productSchema.pre(/^find/, function (next) {
  this.populate({ path: "category", select: "name" });
  next();
});
const ProductModel = mongoose.model("product", productSchema);
module.exports = ProductModel;
