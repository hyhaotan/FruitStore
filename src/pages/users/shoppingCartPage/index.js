import { useEffect, useState, memo } from "react";
import Breadcrumb from "../theme/breadcrumb";
import "./style.scss";
import { formater } from "utils/formater";
import Quantity from "component/Quantity";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { ROUTER } from "utils/router";
import axios from "axios";

const ShoppingCartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

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

  // Hàm xóa sản phẩm khỏi giỏ hàng
  const handleDeleteItem = async (id) => {
    if (
      window.confirm(
        "Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng không?"
      )
    ) {
      try {
        await axios.delete(`http://localhost:5000/api/carts/${id}`);
        // Cập nhật lại state: loại bỏ sản phẩm đã xóa
        setCartItems((prevItems) =>
          prevItems.filter((item) => item._id !== id)
        );
      } catch (error) {
        console.error("Lỗi khi xóa sản phẩm khỏi giỏ hàng:", error);
      }
    }
  };

  // Cập nhật lại số lượng của một cart item khi thay đổi từ component Quantity
  const handleQuantityChange = (id, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Tính tổng đơn hàng dựa trên đơn giá và số lượng
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <>
      <Breadcrumb name="Giỏ hàng" />
      <div className="container">
        <div className="table_cart">
          <table>
            <thead>
              <tr>
                <th>Tên</th>
                <th>Đơn giá</th>
                <th>Số lượng</th>
                <th>Thành tiền</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <tr key={item._id}>
                    <td className="shopping_cart_item">
                      <img src={item.image} alt="product-pic" width="50" />
                      <h4>{item.name}</h4>
                    </td>
                    <td>{formater(item.price)}</td>
                    <td>
                      <Quantity
                        initialQuantity={item.quantity}
                        id={item._id}
                        onQuantityChange={(newQuantity) =>
                          handleQuantityChange(item._id, newQuantity)
                        }
                        hasAddToCart={false}
                      />
                    </td>
                    <td>{formater(item.price * item.quantity)}</td>
                    <td className="icon_close">
                      <AiOutlineClose
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDeleteItem(item._id)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">Giỏ hàng trống</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="row">
          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
            <div className="shopping_checkout">
              <h2>Tổng đơn:</h2>
              <ul>
                <li>
                  Số lượng: <span>{totalQuantity}</span>
                </li>
                <li>
                  Thành tiền: <span>{formater(totalPrice)}</span>
                </li>
              </ul>
              <button
                type="button"
                className="button-submit"
                onClick={() => navigate(ROUTER.USER.CHECKOUT)}
              >
                Thanh toán
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(ShoppingCartPage);
