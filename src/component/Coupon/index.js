// Coupon.jsx
import { memo, useState } from "react";
import "./style.scss";

const Coupon = ({ onApplyDiscount }) => {
  const [code, setCode] = useState("");

  const handleApply = () => {
    if (onApplyDiscount) {
      onApplyDiscount(code);
    }
  };

  return (
    <div className="shopping_continue">
      <h3>Mã giảm giá</h3>
      <div className="shopping_discount">
        <input
          placeholder="Nhập mã giảm giá"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button type="button" className="button-submit" onClick={handleApply}>
          Áp dụng
        </button>
      </div>
    </div>
  );
};

export default memo(Coupon);
