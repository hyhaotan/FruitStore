import { memo, useState } from "react";
import axios from "axios";
import "./style.scss";
import { FaTicketAlt } from "react-icons/fa";

const Coupon = ({ onApplyDiscount }) => {
  const [code, setCode] = useState("");
  const [couponList, setCouponList] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Khi bấm nút "Xem mã giảm giá", load danh sách coupon từ API
  const handleShowCoupons = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/coupons");
      setCouponList(response.data);
      setShowModal(true);
    } catch (error) {
      console.error("Lỗi tải danh sách coupon:", error);
    }
  };

  // Khi chọn coupon từ modal
  const handleSelectCoupon = (selectedCode, isExpired, isActive) => {
    // Nếu coupon đã hết hạn hoặc không active thì không cho chọn
    if (isExpired) {
      alert("Mã giảm giá đã hết hạn");
      return;
    }
    if (!isActive) {
      alert("Mã giảm giá không hoạt động");
      return;
    }
    setCode(selectedCode);
    setShowModal(false);
  };

  // Khi bấm nút "Áp dụng"
  const handleApply = () => {
    if (onApplyDiscount) {
      onApplyDiscount(code);
    }
  };

  // Đóng modal khi click bên ngoài hoặc nút đóng
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="coupon-input">
        <input
          type="text"
          placeholder="Nhập mã giảm giá"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button className="view-btn" onClick={handleShowCoupons}>
          <FaTicketAlt />
        </button>
        <button className="apply-btn" onClick={handleApply}>
          Áp dụng
        </button>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Mã giảm giá</h2>
              <button className="close-btn" onClick={handleCloseModal}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              {couponList.length > 0 ? (
                couponList.map((coupon) => {
                  const now = new Date();
                  const isExpired =
                    coupon.expirationDate &&
                    new Date(coupon.expirationDate) < now;
                  const expirationDate = coupon.expirationDate
                    ? new Date(coupon.expirationDate).toLocaleDateString(
                        "vi-VN"
                      )
                    : "Không xác định";
                  const isActive = coupon.active; // true nếu coupon đang hoạt động
                  const isSelected = coupon.code === code;
                  return (
                    <div
                      key={coupon._id}
                      className={`coupon-item ${isSelected ? "active" : ""}`}
                    >
                      <div>
                        <strong>{coupon.code}</strong> -{" "}
                        {coupon.discountPercentage}%
                        <br />
                        <span className="coupon-status">
                          Trạng thái:{" "}
                          {isActive ? "Đang hoạt động" : "Không hoạt động"}
                        </span>
                        <br />
                        <span className="expiration-date">
                          Hết hạn: {expirationDate}
                        </span>
                      </div>
                      {!isActive ? (
                        <button className="select-btn disabled" disabled>
                          Không hoạt động
                        </button>
                      ) : isExpired ? (
                        <button className="select-btn disabled" disabled>
                          Hết hạn
                        </button>
                      ) : isSelected ? (
                        <button className="select-btn active" disabled>
                          Đã chọn
                        </button>
                      ) : (
                        <button
                          className="select-btn"
                          onClick={() =>
                            handleSelectCoupon(coupon.code, isExpired, isActive)
                          }
                        >
                          Chọn
                        </button>
                      )}
                    </div>
                  );
                })
              ) : (
                <p>Không có coupon nào.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default memo(Coupon);
