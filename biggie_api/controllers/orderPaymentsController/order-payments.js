const OrderPayment = require("../../models/Payment/order-payments");

module.exports = {
  createOrderPayment: async (req, res) => {
    try {
      const { order_id, method_id, amount } = req.body;
      const orderPayment = await OrderPayment.create({
        order_id,
        method_id,
        amount,
      });
      if (orderPayment) {
        res.status(201).json({
          message: "order payment created succefully",
        });
      } else {
        res.status(400).json({
          message: "Invalid data",
        });
      }
      return req;
    } catch (error) {
      res.status(401).json({
        message: error.message,
      });
    }
  },
};
