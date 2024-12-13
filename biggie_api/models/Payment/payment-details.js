const mongoose = require("mongoose");

const paymentDetailSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
    },

},
    {
        timestamps: true,
    }
)

const paymentDetail = mongoose.model("Payment-detail", paymentDetailSchema)

module.exports = paymentDetail