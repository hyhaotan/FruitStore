import { memo, useState } from "react";
import axios from "axios";
import "./style.scss";

const Quantity = ({
  initialQuantity = 1,
  id, // ID của cart item, bắt buộc truyền vào để cập nhật đúng item trên server
  onQuantityChange, // Callback nếu cần thông báo cho component cha
  hasAddToCart = true,
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  // Hàm cập nhật số lượng trên server
  const updateQuantityOnServer = async (newQuantity) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/carts/${id}`,
        { quantity: newQuantity }
      );
      return response.data.quantity;
    } catch (error) {
      console.error("Error updating quantity on server:", error);
      return quantity; // Nếu có lỗi, giữ lại số lượng hiện tại
    }
  };

  // Hàm tăng số lượng
  const handleIncrement = async () => {
    const newQuantity = quantity + 1;
    const updatedQuantity = await updateQuantityOnServer(newQuantity);
    setQuantity(updatedQuantity);
    if (onQuantityChange) onQuantityChange(updatedQuantity);
  };

  // Hàm giảm số lượng (chỉ cho phép giảm khi số lượng > 1)
  const handleDecrement = async () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      const updatedQuantity = await updateQuantityOnServer(newQuantity);
      setQuantity(updatedQuantity);
      if (onQuantityChange) onQuantityChange(updatedQuantity);
    }
  };

  // Hàm xử lý khi người dùng nhập số lượng trực tiếp
  const handleInputChange = async (e) => {
    let newQuantity = parseInt(e.target.value, 10);
    if (isNaN(newQuantity) || newQuantity < 1) {
      newQuantity = 1;
    }
    const updatedQuantity = await updateQuantityOnServer(newQuantity);
    setQuantity(updatedQuantity);
    if (onQuantityChange) onQuantityChange(updatedQuantity);
  };

  return (
    <div className="quantity-container">
      <div className="quantity">
        <span className="qtybtn" onClick={handleDecrement}>
          -
        </span>
        <input type="number" value={quantity} onChange={handleInputChange} />
        <span className="qtybtn" onClick={handleIncrement}>
          +
        </span>
      </div>
      {hasAddToCart && (
        <button type="submit" className="button-submit">
          Thêm giỏ hàng
        </button>
      )}
    </div>
  );
};

export default memo(Quantity);
