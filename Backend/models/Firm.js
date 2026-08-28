const mongoose = require("mongoose");
const Product = require("./Product");

const firmSchema = new mongoose.Schema({
  firmName: {
    type: String,
    required: true,
    unique: true,
  },
  area: {
    type: String,
    required: true,
  },
  category: {
    type: [
      {
        type: String,
        enum: ["veg", "Non-veg"],
      },
    ],
  },
  region: {
    type: [
      {
        type: String,
        enum: ["South-Indian", "North-Indian", "Bakery", "Chinese"],
      },
    ],
  },
  offer: {
    type: String,
  },
  image: {
    type: String,
  },
  vendor: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
    },
  ],
  Product: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});
module.exports = mongoose.model("Firm", firmSchema);
