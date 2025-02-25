const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  infomation_detail: { type: String },
  description: { type: String },
});

module.exports = mongoose.model("Product", productSchema);
