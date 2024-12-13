const mongoose = require("mongoose");

const ModifiersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    addons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Addons",
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Modifiers = mongoose.model("Modifiers", ModifiersSchema);

module.exports = Modifiers;
