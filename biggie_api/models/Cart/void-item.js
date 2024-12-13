const mongoose = require("mongoose");

const voidItemSchema = new mongoose.Schema({
    void_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart"
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    price: {
        type: Number,
        required: true
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    desc: {
        type: String
    },
    quantity: {
        type: Number,
        required: true
    },
    table_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Table"
    },
}, {
    timestamps: true
})


const Void_Item = mongoose.model("void-item", voidItemSchema)

module.exports = Void_Item