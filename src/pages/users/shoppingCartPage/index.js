import { memo } from "react";
import Breadcrumb from "../theme/breadcrumb";
import "./style.scss";
import { formater } from "utils/formater";
import { Quantity } from "component";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { ROUTER } from "utils/router";
const ShoppingCartPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Breadcrumb name="Giỏ hàng" />
      <div className="container">
        <div className="table_cart">
          <table>
            <thead>
              <tr>
                <th>Tên</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Thành tiền</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="shopping_cart_item">
                  <img src="https://via.placeholder.com/50" alt="product-pic" />
                  <h4>Tên sản phẩm 1</h4>
                </td>
                <td>{formater(200000)}</td>
                <td>
                  <Quantity quantity="2" hasAddToCart={false} />
                </td>
                <td>{formater(400000)}</td>
                <td className="icon_close">
                  <AiOutlineClose />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="row">
          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
            <div className="shopping_continue">
              <h3>Mã giảm giá</h3>
              <div className="shopping_discount">
                <input placeholder="Nhập mã giảm giá" />
                <button type="button" className="button-submit">
                  Áp dụng
                </button>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
            <div className="shopping_checkout">
              <h2>Tổng đơn:</h2>
              <ul>
                <li>
                  Số lượng: <span>{2}</span>
                </li>
                <li>
                  Thành tiền: <span>{formater(200000)}</span>
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
