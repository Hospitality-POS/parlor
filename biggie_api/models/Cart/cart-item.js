const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
    cart_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart"
    },
    product_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    category:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category"
    },
    price:{
        type: Number,
        required: true
    },
    created_by:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    desc:{
        type: String
    },
    quantity:{
        type: Number,
        required: true
    },
    table_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Table"
    },
    sent:{
        type: Boolean,
        default: false
    }
},{
    timestamps: true
})


const Cart_Item = mongoose.model("cart-item", cartItemSchema)

module.exports = Cart_Item