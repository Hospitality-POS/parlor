const Payment_Method = require("../../models/Payment/payment-method");

module.exports = {
  // Create a new payment method
  createPaymentMethod: async (req, res) => {
    try {
      const paymentMethod = await Payment_Method.create(req.body);
      res.status(201).json(paymentMethod);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  // Get all payment methods
  getAllPaymentMethods: async (req, res) => {
    try {
      const { name } = req.query;
      const query = {};

      if (name) query.name = new RegExp(name, "i");

      const paymentMethods = await Payment_Method.find(query);
      res.json(paymentMethods);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  // Get a specific payment method by ID
  getPaymentMethodById: async (req, res) => {
    try {
      const paymentMethod = await Payment_Method.findById(req.params.id);
      if (!paymentMethod) {
        return res.status(404).json({ error: "Payment method not found" });
      }
      res.json(paymentMethod);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  // Update an existing payment method by ID
  updatePaymentMethod: async (req, res) => {
    try {
      const paymentMethod = await Payment_Method.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!paymentMethod) {
        return res.status(404).json({ error: "Payment method not found" });
      }
      res.json(paymentMethod);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  // Delete a payment method by ID
  deletePaymentMethod: async (req, res) => {
    try {
      const paymentMethod = await Payment_Method.findByIdAndDelete(
        req.params.id
      );
      if (!paymentMethod) {
        return res.status(404).json({ error: "Payment method not found" });
      }
      res.json({ message: "Payment method deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
