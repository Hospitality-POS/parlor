const Category = require("../../models/Category/category");
const MainCategory = require("../../models/Category/Main-category");
const SubCategory = require("../../models/Category/Sub-category");

// Middleware function to handle errors in async/await functions
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = {
  getAllCategories: asyncHandler(async (req, res) => {
    let query = {};

    // Check if 'name' query parameter is present
    if (req.query.name) {
      query.name = { $regex: new RegExp(req.query.name, "i") };
    }

    // Check if 'subcategory' query parameter is present
    if (req.query.sub_category) {
      const subcategoryId = await SubCategory.findOne({
        name: { $regex: new RegExp(req.query.sub_category, "i") },
      });
      query.sub_category = subcategoryId;
    }

    const categories = await Category.find(query).populate(
      "sub_category",
      "name"
    );
    res.status(200).json(categories);
  }),

  createCategory: asyncHandler(async (req, res) => {
    try {
      const { name, sub_category } = req.body;
      // Populate the sub_category
      const populatedSubCategory = await SubCategory.findById(sub_category);

      // Check if sub_category exists
      if (!populatedSubCategory) {
        return res.status(400).json({ message: "Sub category not found" });
      }

      const newCategory = new Category({
        name,
        sub_category: populatedSubCategory,
      });
      await newCategory.save();
      res.status(201).json(newCategory);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }),

  updateCategory: asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const { name, sub_category } = req.body;



      const updatedCategory = await Category.findByIdAndUpdate(
        id,
        { name, sub_category },
        { new: true }
      );

      // Check if category with the provided ID exists
      if (!updatedCategory) {
        return res.status(404).json({ message: "Category not found" });
      }

      res.status(200).json(updatedCategory);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }),

  deleteCategory: asyncHandler(async (req, res) => {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    res.status(200).json({ message: "Category deleted successfully" });
  }),

  // main category controllers
  getAllMainCategories: asyncHandler(async (req, res) => {
    const mainCategories = await MainCategory.find();
    res.status(200).json(mainCategories);
  }),

  createMainCategory: asyncHandler(async (req, res) => {
    const { name } = req.body;
    const newMainCategory = new MainCategory({ name });
    await newMainCategory.save();
    res.status(201).json(newMainCategory);
  }),

  updateMainCategory: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const updatedMainCategory = await MainCategory.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    res.status(200).json(updatedMainCategory);
  }),

  deleteMainCategory: asyncHandler(async (req, res) => {
    const { id } = req.params;
    await MainCategory.findByIdAndDelete(id);
    res.status(200).json({ message: "MainCategory deleted successfully" });
  }),
  getSubCategoriesForMainCategory: asyncHandler(async (req, res) => {
    const { mainCategoryId } = req.params;
    const subCategories = await SubCategory.find({
      main_category: mainCategoryId,
    });
    res.status(200).json(subCategories);
  }),

  // sub category controllers
  getAllSubCategories: asyncHandler(async (req, res) => {
    const subCategories = await SubCategory.find().populate("main_category");
    res.status(200).json(subCategories);
  }),

  createSubCategory: asyncHandler(async (req, res) => {
    const { name, main_category } = req.body;
    const newSubCategory = new SubCategory({ name, main_category });
    await newSubCategory.save();
    res.status(201).json(newSubCategory);
  }),

  updateSubCategory: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, main_category } = req.body;
    const updatedSubCategory = await SubCategory.findByIdAndUpdate(
      id,
      { name, main_category },
      { new: true }
    );
    res.status(200).json(updatedSubCategory);
  }),

  deleteSubCategory: asyncHandler(async (req, res) => {
    const { id } = req.params;
    await SubCategory.findByIdAndDelete(id);
    res.status(200).json({ message: "SubCategory deleted successfully" });
  }),
  getCategoriesForSubCategory: asyncHandler(async (req, res) => {
    const { subCategoryId } = req.params;
    const categories = await Category.find({ sub_category: subCategoryId });
    res.status(200).json(categories);
  }),
  getCategoriesbysubcategoryid: asyncHandler(async (req, res) => {
    const { subCategoryId } = req.params;
    const categories = await Category.find({
      sub_category: subCategoryId,
    });
    res.status(200).json(categories);
  }),
};
