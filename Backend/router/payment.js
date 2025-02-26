const express = require("express");
const { payment, getPayment, confirmOrder } = require("../controllers/payment");

const router = express.Router();
router.post("/api/payments", payment);
router.get("/api/payments", getPayment);
router.put("/api/payments/:paymentId/confirm", confirmOrder);

module.exports = router;
