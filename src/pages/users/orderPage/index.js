import { memo, useState, useEffect } from "react";
import axios from "axios";
import Breadcrumb from "../theme/breadcrumb";
import "./style.scss"; // File style cho trang lịch sử đơn hàng

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Hàm lấy danh sách đơn hàng từ server
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/payments");
      // Nếu API trả về dạng mảng các đơn hàng
      setOrders(response.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Không thể tải lịch sử đơn hàng");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Hàm xử lý xác nhận đơn hàng đã nhận
  const handleConfirmOrder = async (orderId) => {
    try {
      await axios.put(`http://localhost:5000/api/payments/${orderId}/confirm`);
      // Cập nhật lại trạng thái đơn hàng trong state
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, orderStatus: "received" } : order
        )
      );
      alert("Xác nhận đơn hàng thành công!");
    } catch (err) {
      console.error("Error confirming order:", err);
      alert("Không thể xác nhận đơn hàng");
    }
  };

  return (
    <>
      <Breadcrumb name="Lịch sử đơn hàng" />
      <div className="order-page container">
        <h1>Lịch sử đơn hàng</h1>
        {loading ? (
          <p>Đang tải...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="order-list">
            {orders.length > 0 ? (
              orders.map((order) => (
                <div key={order._id} className="order-item">
                  <h3>Đơn hàng: {order._id}</h3>
                  <p>
                    <strong>Tổng tiền:</strong> {order.totalAmount}
                  </p>
                  <p>
                    <strong>Phương thức thanh toán:</strong>{" "}
                    {order.paymentMethod}
                  </p>
                  <p>
                    <strong>Trạng thái đơn hàng:</strong> {order.orderStatus}
                  </p>
                  <div className="order-products">
                    <h4>Sản phẩm:</h4>
                    <ul>
                      {order.cartItems.map((item, index) => (
                        <li key={index}>
                          {item.name} - {item.quantity} x {item.price} ={" "}
                          {item.totalPrice}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Nếu đơn hàng chưa được xác nhận, hiển thị nút xác nhận */}
                  {order.orderStatus === "not_received" && (
                    <button onClick={() => handleConfirmOrder(order._id)}>
                      Xác nhận đã nhận hàng
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p>Không có đơn hàng nào.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default memo(OrderPage);
