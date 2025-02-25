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
  const { id } = req.params;
  const { quantity } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid cart item ID" });
    }

    const existingCartItem = await Cart.findById(id);
    if (!existingCartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    const newQuantity =
      quantity !== undefined
        ? parseInt(quantity, 10)
        : existingCartItem.quantity;

    const updatedCartItem = await Cart.findByIdAndUpdate(
      id,
      {
        quantity: newQuantity,
      },
      { new: true }
    );

    res.status(200).json(updatedCartItem);
  } catch (error) {
    console.error("Error updating cart item:", error);
    res.status(500).json({ message: "Error updating cart item", error });
  }
};

const deleteCartItem = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCartItem = await Cart.findByIdAndDelete(id);
    if (!deletedCartItem) {
      return res.status(404).send({ message: "Cart item not found" });
    }
    res.status(200).json({ message: "Cart item deleted successfully" });
  } catch (error) {
    console.error("Error deleting cart item:", error);
    res.status(500).json({ message: "Error deleting cart item", error });
  }
};

const clearCart = async (req, res) => {
  try {
    const deletedCartItems = await Cart.deleteMany({});

    if (deletedCartItems.deletedCount === 0) {
      return res.status(404).send({ message: "No items in cart to delete" });
    }

    res.status(200).json({ message: "All cart items deleted successfully" });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ message: "Error clearing cart", error });
  }
};

module.exports = {
  getCart,
  addCart,
  updateCartItem,
  deleteCartItem,
  clearCart,
};
