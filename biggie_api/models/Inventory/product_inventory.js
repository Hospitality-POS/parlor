const mongoose = require("mongoose");

function generateRandomString(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}

const InventorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    supplier_id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier"
    },
    code: {
      type: String,
      unique: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
    },
    desc: {
      type: String,
    },
    subcategory_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    },
    min_viable_quantity: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);


InventorySchema.pre("save", async function (next) {
  if (!this.code) {
    this.code = generateUniqueCode();
  }
  next();
});

function generateUniqueCode() {
  const prefix = "PRD#";
  const randomString = generateRandomString(4);
  const code = `${prefix}${randomString}`;
  return code;
}

const Product_Inventory = mongoose.model("Product_Inventory", InventorySchema);

module.exports = Product_Inventory;
