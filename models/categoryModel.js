const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Category name required"],
    unique: [true,"Category name must be unique"],
    minLength:[3,"Category name must be 3 or  more chartres "],
    maxLength:[32,"Category name must be less than 32  chartres "]
  },
  slug:{
    type:String,
    lowercase:true
  },
  image:{
    type:String
  }
},{timestamps:true});
const CategoryModel = mongoose.model("category", categorySchema);
module.exports = CategoryModel;
