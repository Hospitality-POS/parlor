const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "Please provide a name"],
    },
    username: {
      type: String,
      required: [true, "Please provide a name"],
      unique: true
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    idNumber: {
      type: Number,
      unique: true,
      require: [true, "Please provide your National ID"],
    },
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
    phone: {
      type: Number,
      require: [true, "Please provide your Phone number"],
    },
    pin: {
      type: String,
      unique: true,
      required: true,
      min: [4, "PIN must be at least 4 digits"],
    },
    hashedPin: {
      type: String
    },
    status: {
      type: String,
      required: true,
      enum: ['Active', 'Disabled', 'Suspended'],
      default: 'Active'
    },
    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "role-type",
    },
  },
  {
    timestamps: true,
  }
);


const User = mongoose.model('User', userSchema);

module.exports = User