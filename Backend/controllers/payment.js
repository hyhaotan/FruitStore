const Payment = require("../models/payment");

const getPayment = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const payment = async (req, res) => {
  try {
    const { cartItems, paymentMethod, customer } = req.body;

    // Kiểm tra các thông tin cần thiết
    if (!cartItems || !paymentMethod || !customer || !customer.phone) {
      return res.status(400).json({
        success: false,
        message:
          "Thiếu thông tin giỏ hàng, phương thức thanh toán hoặc thông tin khách hàng (số điện thoại bắt buộc)",
      });
    }

    let totalAmount = 0;
    for (const item of cartItems) {
      if (typeof item.price !== "number" || typeof item.quantity !== "number") {
        return res.status(400).json({
          success: false,
          message: "Sản phẩm thiếu giá hoặc số lượng",
        });
      }
      item.totalPrice = item.price * item.quantity;
      totalAmount += item.totalPrice;
    }

    // Tạo đối tượng Payment mới
    const newPayment = new Payment({
      cartItems,
      totalAmount,
      paymentMethod,
      paymentStatus: "pending",
      orderStatus: "not_received",
      customer: {
        name: customer.name,
        email: customer.email,
        phonenumber: customer.phone,
        address: customer.address,
        note: customer.note || "",
      },
    });

    await newPayment.save();

    res.status(201).json({
      success: true,
      message: "Thanh toán thành công",
      payment: newPayment,
    });
  } catch (error) {
    console.error("Error in payment:", error);
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi trong quá trình thanh toán",
      error: error.message,
    });
  }
};

module.exports = { getPayment, payment };
