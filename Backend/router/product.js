const express = require("express");
const router = express.Router();
const { getProduct } = require("../controllers/product");

router.get("/api/products", getProduct);

module.exports = router;
