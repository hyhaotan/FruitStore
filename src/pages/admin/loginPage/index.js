import { memo } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { ROUTER } from "utils/router";

const LoginAdPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(ROUTER.ADMIN.ORDERS);
  };
  return (
    <div className="login">
      <div className="login_container">
        <h2 className="login_title">TRUY CẬP HỆ THỐNG QUẢN TRỊ</h2>
        <form className="login_form" onSubmit={handleSubmit}>
          <div className="login_form_group">
            <label htmlFor="username" className="login_lable">
              Tên đăng nhập
            </label>
            <input type="text" id="username" name="username" required></input>
          </div>
          <div className="login_form_group">
            <label htmlFor="password" className="login_lable">
              Mật khẩu
            </label>
            <input
              type="password"
              id="username"
              name="password"
              required
            ></input>
          </div>
          <button type="submit" className="login_button">
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
};

export default memo(LoginAdPage);
