const Cart = require("../models/cart");
const Product = require("../models/product");

const getCart = async (req, res) => {
  try {
    const cartItems = await Cart.find().populate("productId");
    res.status(200).json(cartItems);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const addCart = async (req, res) => {
  console.log("Request body:", req.body);
  try {
    const { productId, quantity, name, price, image } = req.body;

    // Kiểm tra xem sản phẩm có tồn tại trong Product model không
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Kiểm tra xem sản phẩm đã có trong giỏ hàng hay chưa
    let existingCartItem = await Cart.findOne({ productId });
    if (existingCartItem) {
      // Nếu đã tồn tại, cập nhật số lượng
      existingCartItem.quantity += quantity;
      const updatedItem = await existingCartItem.save();
      return res.status(200).json(updatedItem);
    }

    // Nếu sản phẩm chưa có trong giỏ, thêm mới
    const cartItem = new Cart({
      productId,
      name,
      price,
      image,
      quantity,
    });

    const savedItem = await cartItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Error adding to cart", error });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params; // Lấy id của cart item từ URL
    const { quantity } = req.body;

    // Tìm cart item theo id
    const cartItem = await Cart.findById(id);
    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    // Kiểm tra số lượng hợp lệ (>= 1)
    if (quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    // Cập nhật số lượng và lưu lại thay đổi
    cartItem.quantity = quantity;
    const updatedItem = await cartItem.save();

    res.status(200).json(updatedItem);
  } catch (error) {
    console.error("Error updating cart item:", error);
    res.status(500).json({ message: "Error updating cart item", error });
  }
};

module.exports = { getCart, addCart, updateCartItem };
