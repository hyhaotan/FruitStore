const express = require("express");
const { getProduct } = require("../controllers/product");

const router = express.Router();
router.get("/api/products", getProduct);

module.exports = router;
