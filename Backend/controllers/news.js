// controllers/news.js
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

// Tạo tin tức mới
const createNews = async (req, res) => {
  try {
    const { title, content, image } = req.body;
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Tiêu đề và nội dung là bắt buộc" });
    }
    const newNews = await News.create({ title, content, image });
    res.status(201).json(newNews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cập nhật tin tức
const updateNews = async (req, res) => {
  try {
    const { title, content, image } = req.body;
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Tiêu đề và nội dung là bắt buộc" });
    }
    const newsId = req.params.id;
    const updatedNews = await News.findByIdAndUpdate(
      newsId,
      { title, content, image },
      { new: true }
    );
    if (!updatedNews) {
      return res.status(404).json({ message: "Tin tức không tồn tại" });
    }
    res.status(200).json(updatedNews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xóa tin tức
const deleteNews = async (req, res) => {
  try {
    const newsId = req.params.id;
    const deletedNews = await News.findByIdAndDelete(newsId);
    if (!deletedNews) {
      return res.status(404).json({ message: "Không tìm thấy tin tức" });
    }
    res.json({ message: "Xóa tin tức thành công" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
};
