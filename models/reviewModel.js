const mongoose = require("mongoose");
const ProductModel = require("./productModel");

const ReviewSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: [true, "user requires"],
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      require: [true, "product requires"],
    },
  },
  { timestamps: true }
);
ReviewSchema.pre(/^find/, function (next) {
  this.populate({ path: "user", select: "name" });
  next();
});

ReviewSchema.statics.calculateAverageAndQuantityRating = async function (
  productId
) {
  const result = await this.aggregate([
    {
      $match: { product: productId },
    },
    {
      $group: {
        _id: "product",
        averageRating: { $avg: "$rating" },
        RatingsQuantity: { $sum: 1 },
      },
    },
  ]);
  if (result.length > 0) {
    await ProductModel.findByIdAndUpdate(productId, {
      ratingAverage: result[0].averageRating,
      ratingsQuantity: result[0].RatingsQuantity,
    });
  }
  console.log("res", result);
};
ReviewSchema.post("save", async function (next) {
  await this.constructor.calculateAverageAndQuantityRating(this.product);
});

const ReviewModel = mongoose.model("Review", ReviewSchema);
module.exports = ReviewModel;
