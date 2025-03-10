const express = require("express");
const { getNews, getNewsById } = require("../controllers/news");

const router = express.Router();

router.get("/api/news", getNews); // Lấy danh sách tin tức
router.get("/api/news/:id", getNewsById); // Lấy chi tiết 1 bài tin tức

module.exports = router;
