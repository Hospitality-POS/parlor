const express = require('express');
const { getAllCategories, createCategory, updateCategory, deleteCategory, getAllMainCategories, createMainCategory, updateMainCategory, deleteMainCategory, getAllSubCategories, createSubCategory, updateSubCategory, deleteSubCategory, getCategoriesForSubCategory, getSubCategoriesForMainCategory, getCategoriesbysubcategoryid } = require('../../controllers/categoryController/category');
const router = express.Router();


// Routes for Category
router.get('/', getAllCategories);
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

// Routes for MainCategory
router.get('/main-categories', getAllMainCategories);
router.post('/main-categories', createMainCategory);
router.put('/main-categories/:id', updateMainCategory);
router.delete('/main-categories/:id', deleteMainCategory);
router.get('/main-categories/:mainCategoryId/sub-categories',getSubCategoriesForMainCategory);

// Routes for SubCategory
router.get('/sub-categories', getAllSubCategories);
router.post('/sub-categories', createSubCategory);
router.put('/sub-categories/:id', updateSubCategory);
router.delete('/sub-categories/:id', deleteSubCategory);
router.get('/sub-categories/:subCategoryId/categories', getCategoriesForSubCategory);
router.get('/category/:subCategoryId/categorybysubcategory', getCategoriesbysubcategoryid);



module.exports = router;