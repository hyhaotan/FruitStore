const express = require("express");
const { getCart, addCart, updateCartItem } = require("../controllers/cart");

const router = express.Router();
router.post("/api/carts", addCart);
router.get("/api/carts", getCart);
router.put("/carts/:id", updateCartItem);

module.exports = router;
