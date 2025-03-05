const express = require("express");
const {getAllArticle, postArticle } = require("../controllers/article");

const router = express.Router();

router.get("/api/articles", getAllArticle);
router.post("/api/articles", postArticle);
module.exports = router;
