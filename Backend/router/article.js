const express = require("express");
const {
  getAllArticle,
  postArticle,
  deleteArticle,
} = require("../controllers/article");

const router = express.Router();

router.get("/api/articles", getAllArticle);
router.post("/api/articles", postArticle);
router.delete("/api/articles/:id", deleteArticle);
module.exports = router;
