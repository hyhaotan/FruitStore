const Product = require("../models/product");

const getProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProductDetails = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: "Cannot find product" });
    }
    res.json(product);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      image: req.body.image,
      price: req.body.price,
      quantity: req.body.quantity,
      status: req.body.status,
      description: req.body.description,
      type: req.body.type,
    };
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Cannot find product" });
    }
    res.json(updatedProduct);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Cannot find product" });
    }
    res.json({ message: "Product deleted" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      image: req.body.image,
      price: req.body.price,
      quantity: req.body.quantity || 0,
      status: req.body.status || "Có sẵn",
      description: req.body.description,
      type: req.body.type,
    });
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const findProducts = async (req, res) => {
  try {
    const { name } = req.query; // nhận tham số tên sản phẩm từ query string
    if (name) {
      // Tìm sản phẩm có tên khớp gần đúng và không phân biệt chữ hoa, chữ thường
      const products = await Product.find({
        name: { $regex: new RegExp(name, "i") },
      });
      if (products.length === 0) {
        return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
      }
      // Trả về danh sách sản phẩm nếu tìm thấy
      return res.status(200).json(products);
    } else {
      // Nếu không có tham số tìm kiếm thì trả về toàn bộ sản phẩm
      const products = await Product.find();
      return res.status(200).json(products);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getTypeProducts = async (req, res) => {
  try {
    const { type } = req.query;
    if (!type) {
      return res
        .status(400)
        .json({ error: "Type query parameter is required" });
    }
    // Tìm các sản phẩm có trường type khớp với giá trị được truyền vào
    const products = await Product.find({ type });
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products by type:", error);
    res.status(500).json({ error: "Error fetching products by type" });
  }
};

module.exports = {
  getProduct,
  getProductDetails,
  updateProduct,
  deleteProduct,
  createProduct,
  findProducts,
  getTypeProducts,
};
