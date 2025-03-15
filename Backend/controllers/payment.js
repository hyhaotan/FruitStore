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
    const { cartItems, paymentMethod, customer, discount = 0 } = req.body;

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

    // Tính toán finalTotal trên server
    const finalTotal = totalAmount - discount;
    if (finalTotal <= 0) {
      return res.status(400).json({
        success: false,
        message: "Tổng thanh toán sau giảm giá không hợp lệ (âm hoặc bằng 0)",
      });
    }

    // Tạo đối tượng Payment mới với dữ liệu được chuẩn hóa
    const newPayment = new Payment({
      cartItems,
      totalAmount,
      discount,
      finalTotal,
      paymentMethod,
      sendStatus: "Đang xử lí",
      orderStatus: "Chưa nhận",
      customer: {
        name: customer.name,
        email: customer.email,
        phonenumber: Number(customer.phone), // Ép kiểu sang Number
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
    if (payment.orderStatus === "Đã nhận") {
      return res.status(400).json({
        success: false,
        message: "Đơn hàng đã được xác nhận",
      });
    }

    if (payment.orderStatus !== "Chưa nhận") {
      return res.status(400).json({
        success: false,
        message: `Không thể xác nhận đơn hàng với trạng thái '${payment.orderStatus}'`,
      });
    }

    // Cập nhật trạng thái đơn hàng thành "Đã nhận"
    payment.orderStatus = "Đã nhận";
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

const editSendOrder = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const { sendStatus } = req.body;

    const payment = await Payment.findByIdAndUpdate(
      paymentId,
      { sendStatus },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy đơn hàng",
      });
    }

    return res.json({
      success: true,
      message: "Cập nhật trạng thái gửi đơn thành công",
      data: payment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { paymentId } = req.params;

    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy đơn hàng",
      });
    }

    await Payment.findByIdAndDelete(paymentId);

    res.json({
      success: true,
      message: "Đã xóa đơn hàng",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getPayment,
  payment,
  confirmOrder,
  editSendOrder,
  deleteOrder,
};
