const express = require("express");
const { getProduct, getProductDetails } = require("../controllers/product");

const router = express.Router();
router.get("/api/products", getProduct);
router.get("/api/products/:id", getProductDetails);

module.exports = router;
