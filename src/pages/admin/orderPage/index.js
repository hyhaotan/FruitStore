import { memo, useEffect, useState } from "react";
import "./style.scss";
import { formater } from "utils/formater";

const ORDER_STATUSES = {
  processing: {
    key: "Đang chờ xử lý",
    label: "Đang chờ xử lý",
  },
  sent: {
    key: "Đã gửi",
    label: "Đã gửi",
  },
  completed: {
    key: "Hoàn thành",
    label: "Hoàn thành",
  },
  failed: {
    key: "Thất bại",
    label: "Thất bại",
  },
};

const PaymentTable = () => {
  const [payments, setPayments] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/payments");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPayments(data);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };

    fetchPayments();

    // Đóng dropdown khi click ra ngoài
    const handleClickOutside = (event) => {
      const isDropdown = event.target.closest(".orders__dropdown");
      if (!isDropdown) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Hàm xử lý xem chi tiết đơn hàng
  const handleView = (payment) => {
    setSelectedPayment(payment);
  };

  // Hàm cập nhật trạng thái gửi đơn ngay từ dropdown
  const handleSendStatusUpdate = async (paymentId, newStatus) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/payments/${paymentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          // Lưu ý: trường key ở đây phải khớp với bên backend (sendStatus)
          body: JSON.stringify({ sendStatus: newStatus }),
        }
      );
      if (!response.ok) {
        throw new Error("Error updating send status");
      }
      const updatedPayment = await response.json();
      // Cập nhật lại danh sách payments với đơn hàng đã được cập nhật
      setPayments((prevPayments) =>
        prevPayments.map((payment) =>
          payment._id === paymentId ? updatedPayment : payment
        )
      );
      setActiveDropdown(null);
    } catch (error) {
      console.error("Error updating send status:", error);
    }
  };

  // Hàm xóa đơn hàng
  const handleDelete = async (paymentId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/payments/${paymentId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Error deleting payment");
      }
      setPayments(payments.filter((payment) => payment._id !== paymentId));
    } catch (error) {
      console.error("Error deleting payment:", error);
    }
  };

  return (
    <div className="container">
      <div className="orders">
        <h2>Quản lý đơn hàng</h2>
        <div className="orders__content">
          <table className="orders__table">
            <thead>
              <tr>
                <th>Mã sản phẩm</th>
                <th>Tổng tiền</th>
                <th>Phương thức</th>
                <th>Trạng thái gửi đơn</th>
                <th>Trạng thái đơn hàng</th>
                <th>Khách hàng</th>
                <th>Ngày đặt</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment._id}>
                  <td>{payment._id}</td>
                  <td>{formater(payment.finalTotal)}</td> {/* Sửa ở đây */}
                  <td>{payment.paymentMethod}</td>
                  {/* Các cột khác */}
                  <td>
                    <div className="orders__dropdown">
                      <button
                        className="orders__action-button"
                        onClick={() => setActiveDropdown(payment._id)}
                      >
                        {ORDER_STATUSES[payment.sendStatus]
                          ? ORDER_STATUSES[payment.sendStatus].label
                          : payment.sendStatus}
                        <span className="arrow">▽</span>
                      </button>
                      {activeDropdown === payment._id && (
                        <div className="orders__dropdown-menu">
                          {Object.values(ORDER_STATUSES).map((status) => (
                            <button
                              key={status.key}
                              className="orders__dropdown-item"
                              onClick={() =>
                                handleSendStatusUpdate(payment._id, status.key)
                              }
                            >
                              {status.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </td>
                  <td>{payment.orderStatus}</td>
                  <td>{payment.customer?.name}</td>
                  <td>
                    {new Date(payment.createdAt).toLocaleDateString("vi-VN")}
                  </td>
                  <td>
                    <button
                      className="btn_view"
                      onClick={() => handleView(payment)}
                    >
                      Xem
                    </button>
                    <button
                      className="btn_delete"
                      onClick={() => handleDelete(payment._id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal hiển thị danh sách sản phẩm của đơn hàng */}
      {selectedPayment && (
        <div className="modal">
          <div className="modal__content">
            <div className="modal__content__header">
              <h3>Thông tin sản phẩm</h3>
              <button
                className="modal__content__header__close"
                onClick={() => setSelectedPayment(null)}
              >
                ×
              </button>
            </div>
            <div className="modal__content__body">
              {selectedPayment.cartItems &&
              selectedPayment.cartItems.length > 0 ? (
                <table className="modal__table">
                  <thead>
                    <tr>
                      <th>Tên sản phẩm</th>
                      <th>Số lượng</th>
                      <th>Giá</th>
                      <th>Tổng giá</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedPayment.cartItems.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{formater(item.price)}</td>
                        <td>{formater(item.totalPrice)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>Không có sản phẩm nào.</p>
              )}
            </div>
            <button
              className="modal__content__button"
              onClick={() => setSelectedPayment(null)}
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(PaymentTable);
