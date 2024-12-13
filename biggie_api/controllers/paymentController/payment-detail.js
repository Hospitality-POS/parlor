const paymentDetail = require("../../models/Payment/payment-details");

module.exports = {
    // Create a new payment method
    createPaymentDetail: async (req, res) => {
        try {
            const paymentDetailResp = await paymentDetail.create(req.body);
            return res.status(201).json(paymentDetailResp);
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
    // Get all payment methods
    getAllPaymentDetails: async (req, res) => {
        try {
            const paymentDetails = await paymentDetail.find().lean();

            return res.json(paymentDetails);
        } catch (error) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    },
    // Get a specific payment method by ID
    getPaymentDetailById: async (req, res) => {
        try {
            const paymentDetail = await paymentDetail.findById(req.params.id);
            if (!paymentDetail) {
                return res.status(404).json({ error: "Payment Detail not found" });
            }
            res.json(paymentDetail);
        } catch (error) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    },
    // Update an existing payment method by ID
    updatePaymentDetail: async (req, res) => {
        try {
            const paymentDetail = await paymentDetail.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            if (!paymentDetail) {
                return res.status(404).json({ error: "Payment method not found" });
            }
            return res.json(paymentDetail);
        } catch (error) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    },
    // Delete a payment method by ID
    deletePaymentDetail: async (req, res) => {
        try {
            const paymentDetail = await paymentDetail.findByIdAndDelete(
                req.params.id
            );
            if (!paymentDetail) {
                return res.status(404).json({ error: "Payment Detail not found" });
            }
            return res.json({ message: "Payment detail deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
};
