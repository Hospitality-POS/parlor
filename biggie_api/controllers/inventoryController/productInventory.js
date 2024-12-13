const Product_Inventory = require("../../models/Inventory/product_inventory");
const Category = require("../../models/Category/category");

module.exports = {
  // Get all inventory items
  getAllInventoryItems: async (req, res) => {
    try {
      let query = {};

      if (req.query.name) {
        query.name = { $regex: new RegExp(req.query.name, "i") };
      }

      if (req.query.code) {
        const escapedCode = req.query.code.replace(
          /[-[\]{}()*+?.,\\^$|#\s]/g,
          "\\$&"
        );
        query.code = new RegExp(escapedCode, "i");
      }

      const inventoryItems = await Product_Inventory.find(query)
        .populate("subcategory_id")
        .populate("supplier_id");
      res.json(inventoryItems);
    } catch (error) {
      res.status(500).json({ error: "Internal server error", message: error.message });
    }
  },
  // Create a new inventory item
  createInventoryItem: async (req, res) => {
    try {
      const {
        name,
        quantity,
        price,
        description: desc,
        subcategory_id,
        min_viable_quantity,
        supplier_id,
      } = req.body;
      const inventoryItem = await Product_Inventory.create({
        name,
        quantity,
        price,
        desc,
        subcategory_id,
        min_viable_quantity,
        supplier_id,
      });
      res.status(201).json(inventoryItem);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  },

  // Get a specific inventory item by ID
  getInventoryItemById: async (req, res) => {
    try {
      const inventoryItem = await Product_Inventory.findById(req.params.id);
      if (!inventoryItem) {
        return res.status(404).json({ error: "Inventory item not found" });
      }
      res.json(inventoryItem);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Update a specific inventory item by ID
  updateInventoryItemById: async (req, res) => {
    try {
      const { name, quantity, price, desc, category_id, min_viable_quantity } =
        req.body;
      const updatedInventoryItem = await Product_Inventory.findByIdAndUpdate(
        req.params.id,
        { name, quantity, price, desc, category_id, min_viable_quantity },
        { new: true }
      );
      if (!updatedInventoryItem) {
        return res.status(404).json({ error: "Inventory item not found" });
      }
      res.json(updatedInventoryItem);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  },

  // Delete a specific inventory item by ID
  deleteInventoryItemById: async (req, res) => {
    try {
      const deletedInventoryItem = await Product_Inventory.findByIdAndDelete(
        req.params.id
      );
      if (!deletedInventoryItem) {
        return res.status(404).json({ error: "Inventory item not found" });
      }
      res.json(deletedInventoryItem);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
