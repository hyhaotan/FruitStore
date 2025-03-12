const Article = require("../models/article");

const getAllArticle = async (req, res) => {
  try {
    const articles = await Article.find();
    return res.status(200).json({ articles });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const postArticle = async (req, res) => {
  const { image, title, name, content } = req.body;
  try {
    const article = await Article.create({ image, title, name, content });
    return res
      .status(200)
      .json({ message: "Thêm bài viết thành công", article });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllArticle, postArticle };
