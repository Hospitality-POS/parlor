const mongoose = require("mongoose");

const orderItemsSchema = new mongoose.Schema(
  {
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "order",
    },
    product_id: {
      ref: "Products",
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    served_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    category_id: {
      ref: "Category",
      type: mongoose.Schema.Types.ObjectId
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const OrderItems = mongoose.model("order_items", orderItemsSchema);

module.exports = OrderItems;