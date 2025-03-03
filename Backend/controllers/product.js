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

module.exports = {
  getProduct,
  getProductDetails,
  updateProduct,
  deleteProduct,
  createProduct,
};
