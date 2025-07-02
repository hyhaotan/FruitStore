const express = require("express");
const {
  // getProduct,
  getProductDetails,
  createProduct,
  deleteProduct,
  updateProduct,
  findProducts,
  getTypeProducts,
  applyPriceProduct,
  getProducts,
} = require("../controllers/product");

const router = express.Router();
// router.get("/api/products", getProduct);
router.get("/api/products", getProducts);
router.get("/api/products/:id", getProductDetails);
router.post("/api/products", createProduct);
router.put("/api/products/:id", updateProduct);
router.delete("/api/products/:id", deleteProduct);
router.get("/api/products", findProducts);
router.get("/api/products", getTypeProducts);
router.get("/api/products", applyPriceProduct);

module.exports = router;
