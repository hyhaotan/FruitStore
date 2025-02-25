const express = require("express");
const {
  getCart,
  addCart,
  updateCartItem,
  deleteCartItem,
  clearCart,
} = require("../controllers/cart");

const router = express.Router();
router.post("/api/carts", addCart);
router.get("/api/carts", getCart);
router.put("/api/carts/:id", updateCartItem);
router.delete("/api/carts/:id", deleteCartItem);
router.delete("/api/carts", clearCart);
module.exports = router;
