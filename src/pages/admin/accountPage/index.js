import { memo, useEffect, useState } from "react";
import "./style.scss";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const ROLES = ["user", "employee", "admin"];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    if (window.confirm("Bạn có chắc là muốn xóa tài khoản này không?")) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/users/${userId}`,
          { method: "DELETE" }
        );
        if (!response.ok) {
          throw new Error("Error deleting user");
        }
        setUsers(prev => prev.filter(user => user._id !== userId));
        alert("Xóa sản phẩm thành công");
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleRoleChange = async (userId, role) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/users/${userId}/role`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role })
        },
        alert("Cập nhật role thành công!"),
      );
      if (!res.ok) throw new Error("Failed to update role");
      const { user: updatedUser } = await res.json();
      setUsers(prev =>
        prev.map(u => (u._id === updatedUser._id ? updatedUser : u))
      );
    } catch (error) {
      console.error("Error updating role:", error);
      alert("Không thể cập nhật role");
    }
  };

  return (
    <div className="container">
      <div className="users">
        <h2>Quản lý người dùng & Phân quyền</h2>
        <div className="users__content">
          <table className="users__table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Username</th>
                <th>Role</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.email}</td>
                  <td>{user.username}</td>
                  <td>
                    <select
                      value={user.role}
                      onChange={e => handleRoleChange(user._id, e.target.value)}
                    >
                      {ROLES.map(r => (
                        <option key={r} value={r}>
                          {r.charAt(0).toUpperCase() + r.slice(1)}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="users__action">
                    <button
                      className="btn_delete"
                      onClick={() => handleDelete(user._id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default memo(UserTable);