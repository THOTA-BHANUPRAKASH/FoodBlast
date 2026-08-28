const mongoose = require("mongoose");
const validator = require("validator");

const vendorSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email: " + value);
      }
    },
  },
  password: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isStrongPassword(value)) {
        throw new Error("Invalid Password");
      }
    },
  },
  firm: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Firm",
    },
  ],
});

module.exports = mongoose.model("Vendor", vendorSchema);
