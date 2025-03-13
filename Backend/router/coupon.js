const express = require("express");
const {
  applyCoupon,
  handleAddCoupon,
  getCoupon,
  updateActive,
  deleteCoupon,
  updateCoupon,
} = require("../controllers/coupon");

const router = express.Router();

router.post("/api/coupons/apply", applyCoupon);
router.post("/api/coupons", handleAddCoupon);
router.get("/api/coupons", getCoupon);
router.put("/api/coupons/active/:id", updateActive);
router.delete("/api/coupons/:id", deleteCoupon);
router.put("/api/coupons/:id", updateCoupon);
module.exports = router;
