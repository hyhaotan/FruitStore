import { memo, useEffect, useState } from "react";
import "./style.scss";
import { formater } from "utils/formater";

const ORDER_STATUSES = {
  not_received: {
    key: "not_received",
    label: "Chưa nhận hàng",
  },
  received: {
    key: "received",
    label: "Đã nhận hàng",
  },
  canceled: {
    key: "canceled",
    label: "Đã hủy đơn",
  },
};

const PaymentTable = () => {
  const [payments, setPayments] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);

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

  return (
    <div className="container">
      <div className="orders">
        <h2>Quản lý thanh toán</h2>
        <div className="orders__content">
          <table className="orders__table">
            <thead>
              <tr>
                <th>Mã thanh toán</th>
                <th>Tổng tiền</th>
                <th>Phương thức</th>
                <th>Trạng thái thanh toán</th>
                <th>Trạng thái đơn hàng</th>
                <th>Khách hàng</th>
                <th>Ngày đặt</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment._id}>
                  <td>{payment._id}</td>
                  <td>{formater(payment.totalAmount)}</td>
                  <td>{payment.paymentMethod}</td>
                  <td>{payment.paymentStatus}</td>
                  <td>
                    <div className="orders__dropdown">
                      <button
                        className="orders__action-button"
                        onClick={() => setActiveDropdown(payment._id)}
                      >
                        {ORDER_STATUSES[payment.orderStatus]
                          ? ORDER_STATUSES[payment.orderStatus].label
                          : payment.orderStatus}
                        <span className="arrow">▽</span>
                      </button>
                      {activeDropdown === payment._id && (
                        <div className="orders__dropdown-menu">
                          {Object.values(ORDER_STATUSES).map((status) => (
                            <button
                              key={status.key}
                              className={
                                status.key === "canceled"
                                  ? "orders__dropdown-item orders__dropdown-item--danger"
                                  : "orders__dropdown-item"
                              }
                              onClick={() => {
                                // Thêm xử lý cập nhật trạng thái đơn hàng tại đây,
                                // ví dụ gọi API để cập nhật payment.orderStatus
                                setActiveDropdown(null);
                              }}
                            >
                              {status.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </td>
                  <td>{payment.customer?.name}</td>
                  <td>
                    {new Date(payment.createdAt).toLocaleDateString("vi-VN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default memo(PaymentTable);
