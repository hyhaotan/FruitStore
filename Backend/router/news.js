// routes/news.js
const express = require("express");
const {
  getNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
} = require("../controllers/news");

const router = express.Router();

router.get("/api/news", getNews);
router.get("/api/news/:id", getNewsById);
router.post("/api/news", createNews);
router.put("/api/news/:id", updateNews);
router.delete("/api/news/:id", deleteNews);

module.exports = router;
