const mongoose = require("mongoose");

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

const ReviewModel = mongoose.model("Review", ReviewSchema);
module.exports = ReviewModel;
