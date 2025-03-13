import { memo, useEffect, useState } from "react";
import "./style.scss";

const CouponAdminPage = () => {
  const [couponList, setCouponList] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [message, setMessage] = useState({ type: "", content: "" });
  const [formData, setFormData] = useState({
    code: "",
    discountPercentage: "",
    expirationDate: "",
    _id: null,
  });

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/coupons");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCouponList(data);
      } catch (error) {
        console.error("Error fetching coupons:", error);
        setMessage({
          type: "error",
          content: "Không thể tải danh sách mã giảm giá",
        });
      }
    };

    fetchCoupons();
  }, []);

  const handleDelete = async (couponId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/coupons/${couponId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Error deleting coupon");
      }
      setCouponList(couponList.filter((item) => item._id !== couponId));
      setMessage({ type: "success", content: "Xóa mã giảm giá thành công" });
    } catch (error) {
      console.error("Error deleting coupon:", error);
      setMessage({ type: "error", content: "Có lỗi khi xóa mã giảm giá" });
    }
  };

  // Hàm chuyển đổi active qua toggle switch, sử dụng endpoint /api/coupons/active/:id
  const handleToggleActive = async (coupon) => {
    const newActive = !coupon.active;
    const payload = { active: newActive };

    try {
      const response = await fetch(
        `http://localhost:5000/api/coupons/active/${coupon._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (!response.ok) {
        throw new Error("Error toggling coupon active status");
      }
      const updatedCoupon = await response.json();
      const updatedList = couponList.map((item) =>
        item._id === updatedCoupon._id ? updatedCoupon : item
      );
      setCouponList(updatedList);
      setMessage({
        type: "success",
        content: "Cập nhật trạng thái thành công",
      });
    } catch (error) {
      console.error("Error toggling coupon active status:", error);
      setMessage({
        type: "error",
        content: "Có lỗi khi cập nhật trạng thái coupon",
      });
    }
  };

  // Xử lý thêm coupon (mặc định active: true)
  const handleAddCoupon = async (e) => {
    e.preventDefault();

    if (!formData.code || !formData.discountPercentage) {
      setMessage({
        type: "error",
        content: "Mã coupon và phần trăm giảm giá không được để trống",
      });
      return;
    }

    const payload = {
      code: formData.code.toUpperCase(),
      discountPercentage: parseFloat(formData.discountPercentage),
      expirationDate: formData.expirationDate || null,
      active: true,
    };

    try {
      const response = await fetch("http://localhost:5000/api/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("Error creating coupon");
      }
      const newCoupon = await response.json();
      setCouponList([...couponList, newCoupon]);
      setIsAddModalOpen(false);
      setFormData({
        code: "",
        discountPercentage: "",
        expirationDate: "",
        _id: null,
      });
      setMessage({ type: "success", content: "Thêm mã giảm giá thành công" });
    } catch (error) {
      console.error("Error adding coupon:", error);
      setMessage({ type: "error", content: "Có lỗi khi thêm mã giảm giá" });
    }
  };

  const openEditModal = (coupon) => {
    setFormData({
      code: coupon.code,
      discountPercentage: coupon.discountPercentage,
      expirationDate: coupon.expirationDate
        ? coupon.expirationDate.split("T")[0]
        : "",
      _id: coupon._id,
    });
    setIsEditModalOpen(true);
  };

  const handleUpdateCoupon = async (e) => {
    e.preventDefault();

    if (!formData.code || !formData.discountPercentage) {
      setMessage({
        type: "error",
        content: "Mã coupon và phần trăm giảm giá không được để trống",
      });
      return;
    }

    const payload = {
      code: formData.code.toUpperCase(),
      discountPercentage: parseFloat(formData.discountPercentage),
      expirationDate: formData.expirationDate || null,
    };

    try {
      const response = await fetch(
        `http://localhost:5000/api/coupons/${formData._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (!response.ok) {
        throw new Error("Error updating coupon");
      }
      const updatedCoupon = await response.json();
      const updatedList = couponList.map((item) =>
        item._id === updatedCoupon._id ? updatedCoupon : item
      );
      setCouponList(updatedList);
      setIsEditModalOpen(false);
      setFormData({
        code: "",
        discountPercentage: "",
        expirationDate: "",
        _id: null,
      });
      setMessage({
        type: "success",
        content: "Cập nhật mã giảm giá thành công",
      });
    } catch (error) {
      console.error("Error updating coupon:", error);
      setMessage({ type: "error", content: "Có lỗi khi cập nhật mã giảm giá" });
    }
  };

  return (
    <div className="container">
      <div className="coupon">
        <h2>Quản lý Mã giảm giá</h2>
        {message.content && (
          <div className={`message ${message.type}`}>{message.content}</div>
        )}
        <div className="coupon__actions">
          <button
            className="btn btn--primary"
            onClick={() => {
              setIsAddModalOpen(true);
              setMessage({ type: "", content: "" });
            }}
          >
            Thêm Mã giảm giá
          </button>
        </div>
        <table className="coupon__table">
          <thead>
            <tr>
              <th>Mã</th>
              <th>Phần trăm giảm giá</th>
              <th>Ngày hết hạn</th>
              <th>Ngày tạo</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {couponList.map((item) => (
              <tr key={item._id}>
                <td>{item.code}</td>
                <td>{item.discountPercentage}%</td>
                <td>
                  {item.expirationDate
                    ? new Date(item.expirationDate).toLocaleDateString("vi-VN")
                    : "Không hạn"}
                </td>
                <td>{new Date(item.createdAt).toLocaleDateString("vi-VN")}</td>
                <td>
                  {/* Toggle switch */}
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={item.active}
                      onChange={() => handleToggleActive(item)}
                    />
                    <span className="slider round"></span>
                  </label>
                </td>
                <td>
                  <button className="btn" onClick={() => openEditModal(item)}>
                    Cập nhật
                  </button>
                  <button
                    className="btn btn--danger"
                    onClick={() => handleDelete(item._id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isAddModalOpen && (
        <div className="modal">
          <div className="modal__content">
            <div className="modal__content__header">
              <h3>Thêm Mã giảm giá</h3>
              <button
                className="modal__content__header__close"
                onClick={() => setIsAddModalOpen(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleAddCoupon} className="modal__content__body">
              <label>
                Mã:
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) =>
                    setFormData({ ...formData, code: e.target.value })
                  }
                  required
                />
              </label>
              <label>
                Phần trăm giảm giá:
                <input
                  type="number"
                  value={formData.discountPercentage}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      discountPercentage: e.target.value,
                    })
                  }
                  required
                />
              </label>
              <label>
                Ngày hết hạn:
                <input
                  type="date"
                  value={formData.expirationDate}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      expirationDate: e.target.value,
                    })
                  }
                />
              </label>
              <button type="submit" className="btn btn--primary">
                Thêm
              </button>
            </form>
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div className="modal">
          <div className="modal__content">
            <div className="modal__content__header">
              <h3>Cập nhật Mã giảm giá</h3>
              <button
                className="modal__content__header__close"
                onClick={() => setIsEditModalOpen(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleUpdateCoupon} className="modal__content__body">
              <label>
                Mã:
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) =>
                    setFormData({ ...formData, code: e.target.value })
                  }
                  required
                />
              </label>
              <label>
                Phần trăm giảm giá:
                <input
                  type="number"
                  value={formData.discountPercentage}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      discountPercentage: e.target.value,
                    })
                  }
                  required
                />
              </label>
              <label>
                Ngày hết hạn:
                <input
                  type="date"
                  value={formData.expirationDate}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      expirationDate: e.target.value,
                    })
                  }
                />
              </label>
              <button type="submit" className="btn btn--primary">
                Cập nhật
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(CouponAdminPage);
