import { memo } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { ROUTER } from "utils/router";

const LoginAdPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const { message, user } = await response.json();

      if (!response.ok) {
        // Nếu server trả về lỗi (401, 500, ...)
        alert(message || "Đăng nhập thất bại");
        return;
      }

      // Kiểm tra quyền
      if (user && (user.role === "admin" || user.role === "employee")) {
        // Lưu token hoặc session nếu cần
        // localStorage.setItem('token', result.token);
        alert("đăng nhập thành công")
        navigate(ROUTER.ADMIN.ORDERS);
      } else {
        alert("Bạn không có quyền truy cập");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Đã có lỗi xảy ra trong quá trình đăng nhập");
    }
  };

  return (
    <div className="login">
      <div className="login_container">
        <h2 className="login_title">TRUY CẬP HỆ THỐNG QUẢN TRỊ</h2>
        <form className="login_form" onSubmit={handleSubmit}>
          <div className="login_form_group">
            <label htmlFor="email" className="login_label">
              Email
            </label>
            <input type="text" id="email" name="email" required />
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