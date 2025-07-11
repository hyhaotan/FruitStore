const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 0 },
  status: {
    type: String,
    enum: ["Có sẵn", "Không có sẵn"],
    default: "Có sẵn",
  },
  infomation_detail: { type: String },
  description: { type: String },
  type: { type: String },
   expiryDate: { type: Date, required: true },
}, {
  timestamps: true
});

module.exports = mongoose.model("Product", productSchema);
