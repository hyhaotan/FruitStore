const express = require("express");
const {
  getProduct,
  getProductDetails,
  createProduct,
  deleteProduct,
  updateProduct,
  findProducts,
  getTypeProducts,
} = require("../controllers/product");

const router = express.Router();
router.get("/api/products", getProduct);
router.get("/api/products/:id", getProductDetails);
router.post("/api/products", createProduct);
router.put("/api/products/:id", updateProduct);
router.delete("/api/products/:id", deleteProduct);
router.get("/api/products", findProducts);
router.get("/api/products", getTypeProducts);

module.exports = router;
