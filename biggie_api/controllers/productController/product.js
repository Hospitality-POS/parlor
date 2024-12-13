const dotenv = require("dotenv").config();
const bcrypt = require("bcrypt");
const Product = require("../../models/Products/product");
const jwt = require("jsonwebtoken");
const Category = require("../../models/Category/category");
const SubCategory = require("../../models/Category/Sub-category");

module.exports = {
  // create/add a new product
  createProduct: async (req, res) => {
    try {
      const { name, quantity, category, price, desc, min_viable_quantity, addons } =
        req.body;

      const newProduct = new Product({
        name,
        quantity,
        price,
        desc,
        category,
        min_viable_quantity,
        addons
      });

      await newProduct.save();

      return res
        .status(200)
        .json({ message: "Product created successfully", product: newProduct });
    } catch (error) {
      console.error("Error creating product", error);
      return res.status(500).json({ error: "Failed to create product" });
    }
  },
  // Edit/update a product
  editProduct: async (req, res) => {
    try {
      const productId = req.params.productId;

      let productCategory = await Category.findById(
        req.body.category
      ).populate();

      const updatedProduct = {
        name: req.body.name,
        addons: req.body.addons,
        price: req.body.price,
        desc: req.body.desc,
        quantity: req.body.quantity,
        min_viable_quantity: req.body.min_viable_quantity,
        category: productCategory,
      };

      const product = await Product.findByIdAndUpdate(
        productId,
        updatedProduct,
        { new: true }
      );

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json(product);
    } catch (error) {
      console.error("Error editing product:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  //delete a product
  deleteProduct: async (req, res) => {
    try {
      const { productId } = req.params;

      const deletedProduct = await Product.findByIdAndDelete(productId);

      if (!deletedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }

      return res.status(200).json({
        message: "Product deleted successfully",
        product: deletedProduct,
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      return res.status(500).json({ error: "Failed to delete product" });
    }
  },
  // Fetch all products with pagination
  getAllProducts: async (req, res) => {
    try {
      let query = {};

      // Check if category name is provided in query parameters
      if (req.query.categoryName) {
        // Assuming your category schema has a 'name' field
        const category = await Category.findOne({
          name: req.query.categoryName,
        }).exec();
        if (category) {
          query.category = category._id;
        } else {
          // If category not found, return empty array
          return res.status(200).json({ products: [] });
        }
      }

      const products = await Product.find(query).populate("category").exec();

      return res.status(200).json({ products });
    } catch (error) {
      console.error("Error fetching products:", error);
      return res.status(500).json({ error: "Failed to fetch products" });
    }
  },

  // Fetch all products by category ID
  getProductsByCategory: async (req, res) => {
    try {
      const { categoryId } = req.params;

      const products = await Product.find({ category: categoryId });

      return res.status(200).json({ products });
    } catch (error) {
      console.error("Error fetching products:", error);
      return res.status(500).json({ error: "Failed to fetch products" });
    }
  },
  getAllProductsGroupedByCategory: async (req, res) => {
    try {
      const products = await Product.find().populate("category").populate("addons", "name").exec();
      const response = [];
      const uncategorized = {
        _id: "uncategorized",
        name: " Uncategorized",
        products: [],
      };

      for (const product of products) {
        const categoryId = product.category
          ? product.category._id.toString()
          : "uncategorized";

        const categoryIndex = response.findIndex(
          (cat) => cat._id === categoryId
        );

        if (categoryIndex === -1) {
          response.push({
            _id: categoryId,
            name:
              categoryId === "uncategorized"
                ? uncategorized.name
                : product.category.name,
            products: [
              {
                _id: product._id,
                name: product.name,
                quantity: product.quantity,
                price: product.price,
                addons: product.addons,
                desc: product.desc,
                sub_category: await SubCategory.findById(
                  product?.category?.sub_category
                ),
                category: product.category,
                min_viable_quantity: product.min_viable_quantity,
                createdAt: product.createdAt,
                updatedAt: product.updatedAt,
                code: product.code,
                __v: product.__v,
              },
            ],
          });
        } else {
          // Push product to its category or 'uncategorized'
          response[categoryIndex].products.push({
            _id: product._id,
            name: product.name,
            quantity: product.quantity,
            category: product.category,
            addons: product.addons,
            sub_category: await SubCategory.findById(
              product?.category?.sub_category
            ),
            price: product.price,
            desc: product.desc,
            min_viable_quantity: product.min_viable_quantity,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
            code: product.code,
            __v: product.__v,
          });
        }
      }

      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  deleteAllProducts: async (req, res) => {
    try {
      const deletedProducts = await Product.deleteMany({});

      if (deletedProducts.deletedCount === 0) {
        return res.status(404).json({ error: "No products found to delete" });
      }

      return res.status(200).json({
        message: "All products deleted successfully",
        deletedCount: deletedProducts.deletedCount,
      });
    } catch (error) {
      console.error("Error deleting all products:", error);
      return res.status(500).json({ error: "Failed to delete all products" });
    }
  },
};