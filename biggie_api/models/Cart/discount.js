const mongoose = require("mongoose");

const discountSchema = new mongoose.Schema({
    cart_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart"
    },
    amount: {
        type: Number,
        required: true
    },
    order_no: {
        type: String,
        unique: true,
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
}, {
    timestamps: true
})


const Discount = mongoose.model("discount", discountSchema)

module.exports = Discount