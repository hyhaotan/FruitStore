import { memo, useState, useEffect } from "react";
import axios from "axios";
import "./style.scss"; // Import file style cho trang profile
import Breadcrumb from "../theme/breadcrumb";

const ProfilePage = () => {
  // Lấy thông tin user từ localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [profile, setProfile] = useState({
    username: storedUser?.username || "",
    email: storedUser?.email || "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // State quản lý chế độ chỉnh sửa cho từng trường
  const [editing, setEditing] = useState({
    username: false,
    email: false,
    password: false,
  });

  // Hàm chuyển đổi trạng thái chỉnh sửa của từng trường
  const toggleEdit = (field) => {
    setEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  // Hàm xử lý thay đổi dữ liệu
  const handleChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  // Hàm gọi API cập nhật cho từng field
  const handleSave = async (field) => {
    if (!storedUser || !storedUser._id) {
      setError("Không tìm thấy thông tin người dùng");
      return;
    }

    try {
      let response;
      // Gọi API dựa theo field cần cập nhật
      if (field === "username") {
        response = await axios.put(
          `http://localhost:5000/api/users/editUsername/${storedUser._id}`,
          { username: profile.username }
        );
      } else if (field === "email") {
        response = await axios.put(
          `http://localhost:5000/api/users/editEmail/${storedUser._id}`,
          { email: profile.email }
        );
      } else if (field === "password") {
        response = await axios.put(
          `http://localhost:5000/api/users/editPassword/${storedUser._id}`,
          { password: profile.password }
        );
      }
      // Cập nhật lại localStorage với thông tin mới
      const updatedUser = response.data.user;
      localStorage.setItem("user", JSON.stringify(updatedUser));
      // Nếu cập nhật mật khẩu, xóa trường password sau khi lưu
      if (field === "password") {
        setProfile((prev) => ({ ...prev, password: "" }));
      } else {
        // Cập nhật state profile với dữ liệu mới từ server
        setProfile((prev) => ({
          ...prev,
          username: updatedUser.username,
          email: updatedUser.email,
        }));
      }
    } catch (err) {
      console.error(`Lỗi cập nhật ${field}:`, err);
      setError(
        `Cập nhật ${field} thất bại: ${
          err.response?.data?.message || err.message
        }`
      );
    } finally {
      // Tắt chế độ chỉnh sửa sau khi cập nhật
      toggleEdit(field);
    }
  };

  // Khi component mount, fetch profile mới nhất từ server (nếu cần)
  useEffect(() => {
    if (storedUser && storedUser.id) {
      const fetchProfile = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            `http://localhost:5000/api/users/profile/${storedUser._id}`
          );
          setProfile({
            username: response.data.user.username,
            email: response.data.user.email,
            password: "",
          });
        } catch (err) {
          console.error("Error fetching profile:", err);
          setError("Không thể tải thông tin người dùng");
        } finally {
          setLoading(false);
        }
      };

      fetchProfile();
    }
  }, [storedUser]);

  if (loading) return <div className="profile-page container">Đang tải...</div>;
  if (error) return <div className="profile-page container">{error}</div>;

  return (
    <>
      <Breadcrumb name="Mã giảm giá" />
      <div className="profile-page container">
        <h1>Thông tin cá nhân</h1>
        <div className="profile-item">
          <label>Tên người dùng</label>
          {editing.username ? (
            <input
              type="text"
              value={profile.username}
              onChange={(e) => handleChange("username", e.target.value)}
            />
          ) : (
            <p>{profile.username}</p>
          )}
          <button
            onClick={() =>
              editing.username ? handleSave("username") : toggleEdit("username")
            }
          >
            {editing.username ? "Lưu" : "Chỉnh sửa"}
          </button>
        </div>
        <div className="profile-item">
          <label>Email</label>
          {editing.email ? (
            <input
              type="email"
              value={profile.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          ) : (
            <p>{profile.email}</p>
          )}
          <button
            onClick={() =>
              editing.email ? handleSave("email") : toggleEdit("email")
            }
          >
            {editing.email ? "Lưu" : "Chỉnh sửa"}
          </button>
        </div>
        <div className="profile-item">
          <label>Mật khẩu</label>
          {editing.password ? (
            <input
              type="password"
              value={profile.password}
              onChange={(e) => handleChange("password", e.target.value)}
            />
          ) : (
            <p>********</p>
          )}
          <button
            onClick={() =>
              editing.password ? handleSave("password") : toggleEdit("password")
            }
          >
            {editing.password ? "Lưu" : "Chỉnh sửa"}
          </button>
        </div>
      </div>
    </>
  );
};

export default memo(ProfilePage);
