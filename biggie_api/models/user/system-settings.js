const mongoose = require("mongoose");

const sytemSettingsSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide the email"],
      unique: true,
      validate: {
        validator: function (value) {
          return /^\S+@\S+\.\S+$/.test(value);
        },
        message: "Invalid email format",
      },
    },
    paymentDetailId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "payment-detail",
    },
    account_no: {
      type: Number,
    },
    business_no: {
      type: Number,
    },
    till_no: {
      type: Number,
    },
    phone: {
      type: Number,
      required: [true, "Please provide your Phone number"],
    },
    name: {
      type: String,
    },
    location: {
      type: String,
    },
    social_link: {
      type: String,
    },
    kra_pin: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

const sytemSettings = mongoose.model("system-setting", sytemSettingsSchema);

module.exports = sytemSettings;