const News = require("../models/news");

// Lấy danh sách tin tức, sắp xếp theo ngày tạo mới nhất
const getNews = async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy chi tiết tin tức theo id
const getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ message: "Không tìm thấy bài tin tức" });
    }
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getNews,
  getNewsById,
};
