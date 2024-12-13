const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  sub_category:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory"
  },
  // product_count: {
  //   type: Number,
  // },
});


const Category = mongoose.model('Category', categorySchema);

module.exports = Category;