const mongoose = require("mongoose");

const AddonsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
  modifier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Modifiers",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Addons = mongoose.model("Addons", AddonsSchema);

module.exports = Addons;