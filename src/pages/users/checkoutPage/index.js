import { memo, useState, useEffect } from "react";
import Breadcrumb from "../theme/breadcrumb";
import "./style.scss";
import { formater } from "utils/formater";
import axios from "axios";

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  // Các state lưu thông tin khách hàng
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Tiền mặc");
  const [loading, setLoading] = useState(false);
  const [paymentResponse, setPaymentResponse] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/carts");
        setCartItems(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy giỏ hàng:", error);
      }
    };

    fetchCart();
  }, []);

  // Tính tổng đơn hàng dựa trên đơn giá và số lượng
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Hàm xử lý thanh toán
  const handlePaymentSubmit = async () => {
    if (!customerName || !address || !phone || !email) {
      alert("Vui lòng nhập đầy đủ thông tin khách hàng.");
      return;
    }

    // Kiểm tra giỏ hàng
    if (cartItems.length === 0) {
      alert("Giỏ hàng trống!");
      return;
    }
    const payload = {
      cartItems,
      paymentMethod,
      customer: {
        name: customerName,
        address,
        phone,
        email,
        note: note || "",
      },
    };

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/payments",
        payload
      );
      setPaymentResponse(response.data);
      alert("Thanh toán thành công!");
      window.location.reload();

      // Gọi API để xóa toàn bộ sản phẩm trong giỏ hàng trên server
      await axios.delete("http://localhost:5000/api/carts");

      // Cập nhật lại state giỏ hàng thành mảng rỗng
      setCartItems([]);
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("Thanh toán thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Breadcrumb name="Thanh toán" />
      <div className="container">
        <div className="row">
          {/* Phần nhập thông tin khách hàng */}
          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
            <div className="checkout_input">
              <label>
                Họ và tên: <span className="required">*</span>
              </label>
              <input
                type="text"
                placeholder="Nhập họ và tên"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>
            <div className="checkout_input">
              <label>
                Địa chỉ: <span className="required">*</span>
              </label>
              <input
                type="text"
                placeholder="Nhập địa chỉ"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="checkout_input_group">
              <div className="checkout_input">
                <label>
                  Điện thoại: <span className="required">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Nhập số điện thoại"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="checkout_input">
                <label>
                  Email: <span className="required">*</span>
                </label>
                <input
                  type="email"
                  placeholder="Nhập email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="checkout_input">
              <label>Ghi chú:</label>
              <textarea
                rows={4}
                placeholder="Nhập ghi chú"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              ></textarea>
            </div>
            {/* Phần chọn phương thức thanh toán dạng dropdown */}
            <div className="checkout_input">
              <label>
                Phương thức thanh toán: <span className="required">*</span>
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                style={{ width: "100%", padding: "8px", marginTop: "10px" }}
              >
                <option value="Tiền mặc">Thanh toán tiền mặt</option>
                <option value="Thẻ tín dụng">
                  Thanh toán bằng thẻ tín dụng
                </option>
                <option value="Chuyển khoản">Chuyển khoản ngân hàng</option>
              </select>
            </div>
          </div>
          {/* Phần hiển thị đơn hàng */}
          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
            <div className="checkout_order">
              <h3>Đơn hàng</h3>
              <ul>
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <li key={item._id}>
                      <span>{item.name}</span>
                      <b>
                        {formater(item.price)} x ({item.quantity}) ={" "}
                        {formater(item.price * item.quantity)}
                      </b>
                    </li>
                  ))
                ) : (
                  <li>Không có sản phẩm nào trong giỏ hàng.</li>
                )}
                <li className="checkout_order_subtotal">
                  <h3>Tổng đơn</h3>
                  <b>{formater(totalPrice)}</b>
                </li>
              </ul>
              <button
                type="button"
                className="button-submit"
                onClick={handlePaymentSubmit}
                disabled={loading}
              >
                {loading ? "Đang xử lý..." : "Đặt hàng"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(CheckoutPage);
