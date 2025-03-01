const express = require("express");
const {
  payment,
  getPayment,
  confirmOrder,
  editSendOrder,
  deleteOrder,
} = require("../controllers/payment");

const router = express.Router();
router.post("/api/payments", payment);
router.get("/api/payments", getPayment);
router.put("/api/payments/:paymentId/confirm", confirmOrder);
router.put("/api/payments/:paymentId", editSendOrder);
router.delete("/api/payments/:paymentId", deleteOrder);
module.exports = router;
