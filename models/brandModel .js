const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Brand name required"],
    unique: [true,"Brand name must be unique"],
    minLength:[2,"Brand name must be 3 or  more chartres "],
    maxLength:[32,"Brand name must be less than 32  chartres "]
  },
  slug:{
    type:String,
    lowercase:true
  },
  image:{
    type:String
  }
},{timestamps:true});
const BrandModel = mongoose.model("brand", brandSchema);
module.exports = BrandModel;
