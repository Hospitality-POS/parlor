const mongoose = require('mongoose');
const Category = require('./category');

const subCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  main_category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MainCategory',
  },
});

const SubCategory = mongoose.model('SubCategory', subCategorySchema);

module.exports = SubCategory;