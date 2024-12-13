const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    cart_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "cart",
    },
    order_amount: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number
    },
    discount_type: {
      type: String
    },
    updated_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    served_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    table_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Table",
    },
    order_no: {
      type: String,
      unique: true,
    },
    method_ids: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment_Method"
    }]
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("order", orderSchema);

// Order.virtual('order_payments', {
//   ref: 'OrderPayment',
//   localField: '_id',
//   foreignField: 'order_id',
//   justOne: false,
//   model: 'order_payments',
//   type: 'hasMany',
// })

module.exports = Order;
