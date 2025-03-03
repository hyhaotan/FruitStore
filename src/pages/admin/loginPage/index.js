// LoginAdPage.jsx
import { memo } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { ROUTER } from "utils/router";

const LoginAdPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Lấy dữ liệu từ form
    const formData = new FormData(e.target);
    const email = formData.get("username"); // input username chứa email
    const password = formData.get("password");

    try {
      const response = await fetch("http://localhost:5000/api/admins/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();
      if (response.ok) {
        alert(result.message || "Đăng nhập thành công");
        navigate(ROUTER.ADMIN.ORDERS);
      } else {
        alert(result.message || "Đăng nhập thất bại");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="login">
      <div className="login_container">
        <h2 className="login_title">TRUY CẬP HỆ THỐNG QUẢN TRỊ</h2>
        <form className="login_form" onSubmit={handleSubmit}>
          <div className="login_form_group">
            <label htmlFor="username" className="login_label">
              Tên đăng nhập
            </label>
            <input type="text" id="username" name="username" required />
          </div>
          <div className="login_form_group">
            <label htmlFor="password" className="login_label">
              Mật khẩu
            </label>
            <input type="password" id="password" name="password" required />
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
