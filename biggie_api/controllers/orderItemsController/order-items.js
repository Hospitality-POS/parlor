const OrderItem = require("../../models/Order/order-items");

module.exports = {
  createOrderItems: async (req, res) => {
    try {
      const orderItem = await OrderItem.create({
        order_id,
        product_id,
        category_id,
        quantity,
      });
      if (orderItem) {
        res.status(201).json({
          message: "order item created succefully",
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
