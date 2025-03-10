const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Tiêu đề không được để trống"],
  },
  content: {
    type: String,
    required: [true, "Nội dung không được để trống"],
  },
  image: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("News", NewsSchema);
