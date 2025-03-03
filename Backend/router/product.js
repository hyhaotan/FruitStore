const express = require("express");
const {
  getProduct,
  getProductDetails,
  createProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/product");

const router = express.Router();
router.get("/api/products", getProduct);
router.get("/api/products/:id", getProductDetails);
router.post("/api/products", createProduct);
router.put("/api/products/:id", updateProduct);
router.delete("/api/products/:id", deleteProduct);
module.exports = router;
