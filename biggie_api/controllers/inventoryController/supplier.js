const Supplier = require("../../models/Inventory/item-suppliers");

module.exports = {
  // Get all suppliers
  getAllSuppliers: async (req, res) => {
    try {
      const { name, email } = req.query;
      const query = {};

      if (name) query.name = new RegExp(name, "i");
      if (email) query.email = new RegExp(email, "i");
   
      const suppliers = await Supplier.find(query);
      res.json(suppliers);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Create a new supplier
  createSupplier: async (req, res) => {
    try {
      const { name, phone, email } = req.body;
      const supplier = await Supplier.create({ name, phone, email });
      res.status(201).json(supplier);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  },

  // Get a specific supplier by ID
  getSupplierById: async (req, res) => {
    try {
      const supplier = await Supplier.findById(req.params.id);
      if (!supplier) {
        return res.status(404).json({ error: "Supplier not found" });
      }
      res.json(supplier);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Update a specific supplier by ID
  updateSupplierById: async (req, res) => {
    try {
      const { name, phone, email } = req.body;
      const updatedSupplier = await Supplier.findByIdAndUpdate(
        req.params.id,
        { name, phone, email },
        { new: true }
      );
      if (!updatedSupplier) {
        return res.status(404).json({ error: "Supplier not found" });
      }
      res.json(updatedSupplier);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  },

  // Delete a specific supplier by ID
  deleteSupplierById: async (req, res) => {
    try {
      const deletedSupplier = await Supplier.findByIdAndDelete(req.params.id);
      if (!deletedSupplier) {
        return res.status(404).json({ error: "Supplier not found" });
      }
      res.json(deletedSupplier);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
