const mongoose = require("mongoose");

const voidSchema = new mongoose.Schema(
    {
        table_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Table",
        },
        cart_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Cart"
        },
        created_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        order_no: {
            type: String
        },
    },
    {
        timestamps: true,
    }
);



const Void = mongoose.model("Void", voidSchema);

module.exports = Void;
