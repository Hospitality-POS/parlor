const mongoose = require("mongoose");
const SubCategory = require("./Sub-category");

const mainCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subCategories: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
  },
});

const MainCategory = mongoose.model("MainCategory", mainCategorySchema);

module.exports = MainCategory;
