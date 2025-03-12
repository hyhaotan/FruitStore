import { memo } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import {
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineLinkedin,
  AiOutlineTwitter,
} from "react-icons/ai";
import { ROUTER } from "utils/router";
const footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
            <div className="footer_about">
              <h1 className="footer_about_logo">Fruit Shop</h1>
              <ul>
                <li>Địa chỉ: 123/ Trịnh Đình Thảo</li>
                <li>Phone: 123456789</li>
                <li>Email: fruitshop@gmail.com</li>
              </ul>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <div className="footer_widget">
              <h6>Cửa hàng</h6>
              <ul>
                <li>
                  <Link to={ROUTER.USER.CONTACT}>Liên hệ</Link>
                </li>
                <li>
                  <Link to="">Thông tin về chúng tôi</Link>
                </li>
                <li>
                  <Link to={ROUTER.USER.PRODUCTS}>Sản phẩm kinh doanh</Link>
                </li>
              </ul>
              <ul>
                <li>
                  <Link to="">thông tin tài khoản</Link>
                </li>
                <li>
                  <Link to={ROUTER.USER.SHOPPING_CART}>Giỏ hàng</Link>
                </li>
                <li>
                  <Link to="">Danh sách ưu thích</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12">
            <div className="footer_widget">
              <h6>Khuyến mãi & ưu đãi</h6>
              <p>Đăng ký thông tin tại đây</p>
              <form action="#">
                <div className="input-group">
                  <input type="text" placeholder="Nhập email" />
                  <button type="submit" className="button-submit">
                    Đăng ký
                  </button>
                </div>
                <div className="footer_widget_social">
                  <div>
                    <AiOutlineFacebook />
                  </div>
                  <div>
                    <AiOutlineInstagram />
                  </div>
                  <div>
                    <AiOutlineLinkedin />
                  </div>
                  <div>
                    <AiOutlineTwitter />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default memo(footer);
