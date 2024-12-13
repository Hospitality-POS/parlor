const mongoose = require("mongoose");

const orderTicketsSchema = new mongoose.Schema(
  {
    group_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "group",
    },
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "order",
    },
    status: {
      type: String,
      required: true,
      enum: ["Pending", "Served"],
      default: "Pending",
      index: true
    },
  },
  {
    timestamps: true,
  }
);

const OrderTickets = mongoose.model("order_tickets", orderTicketsSchema);

module.exports = OrderTickets;
