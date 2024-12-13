const mongoose = require("mongoose");

const orderPaymentsSchema = new mongoose.Schema({
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  served_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  method_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
},
  {
    timestamps: true,
  }
);


const OrderPayments = mongoose.model('order_payments', orderPaymentsSchema);

module.exports = OrderPayments;