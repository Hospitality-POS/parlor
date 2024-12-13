const express = require("express");
const { verifyToken } = require("../../middleware/Auth/authMiddleware");
const {
  createProduct,
  editProduct,
  deleteProduct,
  getAllProductsGroupedByCategory,
  getProductsByCategory,
  getAllProducts,
  deleteAllProducts,
} = require("../../controllers/productController/product");
const isAdminMiddleware = require("../../middleware/Admin/adminMiddleware");
const router = express.Router();
// Create a new product
/** 
 * @swagger
 * /products:
 * tags:
 * - name: products
 *   description: Handles all the product related operations
 * /product/products:
 *   post:
 *     tags:
 *     - products
 *     summary: Create a new product
 *     requestBody:
 *       description: Product object to be created
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: integer
 *                 description: Product ID
 *               name:
 *                 type: string
 *                 description: Product name
 *               code:
 *                 type: string
 *                 description: Product code
 *               desc:
 *                 type: string
 *                 description: Product description
 *               category:
 *                 type: string
 *                 description: Category name (categoryId) 
 *               price:
 *                 type: number
 *                 description: Product price
 *               quantity:
 *                 type: number
 *                 description: Product quantity
 *               min_viable_quantity:
 *                 type: number
 *                 description: Minimum viable quantity
 *               addons:
 *                 type: array
 *                 description: Array of addons
 *     responses:
 *       200:
 *         description: Product created successfully
 *       400:
 *         description: Bad request, unable to create product
 *       401:
 *         description: Unauthorized, Access denied to create product
 *       404:
 *         description: Not found, Category not found 
 * */
router.post("/products", createProduct);

// Edit/update a product
/** 
 * @swagger
 * /product/products/{productId}:
 *   put:
 *     tags:
 *     - products
 *     summary: Edit/update a product
 *     parameters:
 *     - in: path
 *       name: productId
 *       schema:
 *         type: integer
 *       required: true
 *       description: Product ID
 *     requestBody:
 *       description: Product object to be edited
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: integer
 *                 description: Product ID
 *               name:
 *                 type: string
 *                 description: Product name
 *               code:
 *                 type: string
 *                 description: Product code
 *               desc:
 *                 type: string
 *                 description: Product description
 *               category:
 *                 type: string
 *                 description: Category name (categoryId) 
 *               price:
 *                 type: number
 *                 description: Product price
 *               quantity:
 *                 type: number
 *                 description: Product quantity
 *               min_viable_quantity:
 *                 type: number
 *                 description: Minimum viable quantity
 *               addons:
 *                 type: array
 *                 description: Array of addons
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Bad request, unable to update product
 *       401:
 *         description: Unauthorized, Access denied to update product
 *       404:
 *         description: Not found, Product not found
 * */ 
router.put("/products/:productId", editProduct);

// Delete a product
/** 
 * @swagger
 * /product/products/{productId}:
 *   delete:
 *     tags:
 *     - products
 *     summary: Delete a product
 *     parameters:
 *     - in: path
 *       name: productId
 *       schema:
 *         type: integer
 *       required: true
 *       description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       400:
 *         description: Bad request, unable to delete product
 *       401:
 *         description: Unauthorized, Access denied to delete product
 *       404:
 *         description: Not found, Product not found
 * */
router.delete("/products/:productId", deleteProduct);

// Fetch all products by category ID
/**
 * @swagger
 * /product/products/category/{categoryId}:
 *   get:
 *     tags:
 *     - products
 *     summary: Fetch all products by category ID
 *     parameters:
 *     - in: path
 *       name: categoryId
 *       schema:
 *         type: integer
 *       required: true
 *       description: Category ID
 *     responses:
 *       200:
 *         description: All products by category ID
 *       400:
 *         description: Bad request, unable to fetch products by category ID
 *       401:
 *         description: Unauthorized, Access denied to fetch products by category ID
 *       404:
 *         description: Not found, Category not found
 * */
router.get("/products/category/:categoryId", getProductsByCategory);

/**
 * @swagger
 * /product/products/getproducts/all:
 *   get:
 *     tags:
 *     - products
 *     summary: Fetch all products
 *     responses:
 *       200:
 *         description: All products
 *       400:
 *         description: Bad request, unable to fetch all products
 *       401:
 *         description: Unauthorized, Access denied to fetch all products
 *       404:
 *         description: Not found, Products not found
 * */
router.get("/products/getproducts/all", getAllProductsGroupedByCategory);

/**
 * @swagger
 * /product/deleteAll:
 *   delete:
 *     tags:
 *     - products
 *     summary: Delete all products
 *     responses:
 *       200:
 *         description: All products deleted
 *       400:
 *         description: Bad request, unable to delete all products
 *       401:
 *         description: Unauthorized, Access denied to delete all products
 *       404:
 *         description: Not found, Products not found
 * */ 
router.delete("/deleteAll", deleteAllProducts);
// Fetch all products
/**
 * @swagger
 * /product/products:
 *   get:
 *     tags:
 *     - products
 *     summary: Fetch all products
 *     responses:
 *       200:
 *         description: All products
 *       400:
 *         description: Bad request, unable to fetch all products
 *       401:
 *         description: Unauthorized, Access denied to fetch all products
 *       404:
 *         description: Not found, Products not found
 * */ 
router.get("/products", getAllProducts);

module.exports = router;