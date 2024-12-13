const mongoose = require("mongoose");

const paymentMethodSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
})

const Payment_Method = mongoose.model("Payment_method", paymentMethodSchema)

module.exports = Payment_Method