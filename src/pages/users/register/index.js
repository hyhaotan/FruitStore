import { memo, useState } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { ROUTER } from "utils/router";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role:"user",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        window.alert("Đăng ký thành công!");
        navigate(ROUTER.USER.LOGIN);
      } else {
        const data = await response.json();
        window.alert(data.message || "Đăng ký thất bại!");
      }
    } catch (error) {
      window.alert("Đã có lỗi xảy ra: " + error.message);
    }
  };

  return (
    <div className="register">
      <div className="register_container">
        <h2 className="register_title">Đăng ký</h2>
        <form className="register_form" onSubmit={handleSubmit}>
          <div className="register_form_group">
            <label htmlFor="username" className="register_label">
              Tên người dùng
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="register_form_group">
            <label htmlFor="email" className="register_label">
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

          <div className="register_form_group">
            <label htmlFor="password" className="register_label">
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

          <div className="register_form_group">
            <label htmlFor="confirmPassword" className="register_label">
              Xác nhận mật khẩu
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="register_button">
            Đăng ký
          </button>
        </form>
      </div>
    </div>
  );
};

export default memo(RegisterPage);
