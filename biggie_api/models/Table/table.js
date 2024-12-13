const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  isOccupied: {
    type: Boolean,
    default: false,
  },
  locatedAt: {
     type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart",
  },
});

const Table = mongoose.model("Table", tableSchema);

module.exports = Table;