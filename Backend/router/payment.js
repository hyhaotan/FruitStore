const express = require("express");
const {payment,getPayment } = require("../controllers/payment");

const router = express.Router();
router.post("/api/payments", payment);
router.get("/api/payments", getPayment);
module.exports = router;
