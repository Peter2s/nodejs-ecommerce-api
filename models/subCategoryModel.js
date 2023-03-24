const mongoose = require("mongoose");

const subCategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true,'sub category must have name'],
    trim: true,
    unique: [true, "Category name must be unique"],
    minLength: [2, "Category name must be 2 or  more chartres "],
    maxLength: [32, "Category name must be less than 32  chartres "],
  },
  slug: {
    type: String,
    lowercase: true,
  },
  category:{
    type:mongoose.Types.ObjectId,
    ref:'category',
    required: [true,'sub category must belong to category'],
  }
},{timestamps:true});
const SubCategoryModel = mongoose.model("subCategory", subCategorySchema);
module.exports = SubCategoryModel;

