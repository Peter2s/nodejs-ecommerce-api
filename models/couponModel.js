const mongoose = require("mongoose");

const CouponSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "coupon name required"],
      unique: [true, "coupon name must be unique"],
      minLength: [2, "coupon name must be 3 or  more chartres "],
      maxLength: [32, "coupon name must be less than 32  chartres "],
    },
    expire: {
      type: Date,
      required: [true, "coupon expire required"],
    },
    discount: {
      type: Number,
      required: [true, "discount value  required"],
    },
  },
  { timestamps: true }
);

const CouponModel = mongoose.model("Coupon", CouponSchema);
module.exports = CouponModel;
