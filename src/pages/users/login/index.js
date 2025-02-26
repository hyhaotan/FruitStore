import { memo, useState } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { ROUTER } from "utils/router";

const LoginUserPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Cập nhật giá trị input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Xử lý submit form đăng nhập
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Lưu thông tin user vào localStorage
        localStorage.setItem("user", JSON.stringify(data.user));
        window.alert("Đăng nhập thành công!");
        // Điều hướng đến trang chủ (hoặc trang mong muốn)
        navigate(ROUTER.USER.HOME);
      } else {
        window.alert(data.message || "Đăng nhập thất bại!");
      }
    } catch (error) {
      window.alert("Đã có lỗi xảy ra: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Điều hướng sang trang đăng ký
  const handleRegister = () => {
    navigate(ROUTER.USER.REGISTER);
  };

  return (
    <div className="login">
      <div className="login_container">
        <h2 className="login_title">Đăng nhập</h2>
        <form className="login_form" onSubmit={handleSubmit}>
          <div className="login_form_group">
            <label htmlFor="email" className="login_lable">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="login_form_group">
            <label htmlFor="password" className="login_lable">
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="login_button" disabled={isLoading}>
            {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
          <div className="login_register">
            <p>Bạn chưa có tài khoản?</p>
            <a
              type="button"
              className="register_button"
              onClick={handleRegister}
            >
              Tạo tài khoản
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default memo(LoginUserPage);
