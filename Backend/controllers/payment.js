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

const confirmOrder = async (req, res) => {
  try {
    const { paymentId } = req.params; // Lấy id đơn hàng từ URL

    // Tìm đơn hàng theo id
    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy đơn hàng",
      });
    }

    // Kiểm tra trạng thái hiện tại của đơn hàng
    if (payment.orderStatus === "received") {
      return res.status(400).json({
        success: false,
        message: "Đơn hàng đã được xác nhận",
      });
    }

    if (payment.orderStatus !== "not_received") {
      return res.status(400).json({
        success: false,
        message: `Không thể xác nhận đơn hàng với trạng thái '${payment.orderStatus}'`,
      });
    }

    // Cập nhật trạng thái đơn hàng thành "received"
    payment.orderStatus = "received";
    const updatedPayment = await payment.save();

    res.json({
      success: true,
      message: "Đơn hàng đã được xác nhận là đã nhận hàng",
      payment: updatedPayment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { getPayment, payment, confirmOrder };
