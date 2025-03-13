const Coupon = require("../models/coupon");

const getCoupon = async (req, res) => {
  try {
    const coupons = await Coupon.find({});
    return res.status(200).json(coupons);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateActive = async (req, res) => {
  try {
    const { id } = req.params;
    const { active } = req.body;

    const updatedCoupon = await Coupon.findByIdAndUpdate(
      id,
      { active },
      { new: true }
    );

    if (!updatedCoupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    return res.status(200).json(updatedCoupon);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const applyCoupon = async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ message: "Coupon code is required" });
    }

    const coupon = await Coupon.findOne({
      code: code.toUpperCase(),
      active: true,
    });
    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found or inactive" });
    }

    if (coupon.expiresAt && coupon.expiresAt < new Date()) {
      return res.status(400).json({ message: "Coupon expired" });
    }

    return res
      .status(200)
      .json({ discountPercentage: coupon.discountPercentage });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const handleAddCoupon = async (req, res) => {
  try {
    const { code, discountPercentage, expirationDate } = req.body;

    // Kiểm tra các trường bắt buộc
    if (!code || discountPercentage === undefined) {
      return res
        .status(400)
        .json({ message: "Mã coupon và phần trăm giảm giá là bắt buộc" });
    }

    // Kiểm tra xem coupon đã tồn tại chưa (so sánh theo chữ hoa)
    const existingCoupon = await Coupon.findOne({ code: code.toUpperCase() });
    if (existingCoupon) {
      return res.status(400).json({ message: "Mã coupon đã tồn tại" });
    }

    // Tạo mới coupon, chuyển mã về chữ hoa và chuyển đổi expirationDate nếu có
    const newCoupon = await Coupon.create({
      code: code.toUpperCase(),
      discountPercentage,
      expirationDate: expirationDate ? new Date(expirationDate) : null,
    });

    return res.status(201).json(newCoupon);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    const { code, discountPercentage, expirationDate, active } = req.body;

    if (!code || discountPercentage === undefined) {
      return res
        .status(400)
        .json({ message: "Mã coupon và phần trăm giảm giá là bắt buộc" });
    }

    const updatedCoupon = await Coupon.findByIdAndUpdate(
      id,
      {
        code: code.toUpperCase(),
        discountPercentage,
        expirationDate: expirationDate ? new Date(expirationDate) : null,
        // Nếu active không truyền lên thì giữ nguyên giá trị hiện tại (nếu cần)
        active: active !== undefined ? active : true,
      },
      { new: true }
    );

    if (!updatedCoupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    return res.status(200).json(updatedCoupon);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCoupon = await Coupon.findByIdAndDelete(id);

    if (!deletedCoupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    return res.status(200).json({ message: "Coupon deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  deleteCoupon,
  applyCoupon,
  handleAddCoupon,
  getCoupon,
  updateActive,
  updateCoupon,
};
