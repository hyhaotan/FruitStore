import { memo, useState } from "react";
import axios from "axios";
import "./style.scss";

const Quantity = ({
  initialQuantity = 1,
  id,
  onQuantityChange,
  hasAddToCart = true,
  image,
  name,
  price,
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [isAdding, setIsAdding] = useState(false);

  // Hàm tăng số lượng
  const handleIncrement = async () => {
    const previousQuantity = quantity;
    setQuantity(previousQuantity + 1); // cập nhật UI ngay
    try {
      const response = await axios.put(
        `http://localhost:5000/api/carts/increment/${id}`
      );
      if (onQuantityChange) onQuantityChange(response.data.quantity);
    } catch (error) {
      setQuantity(previousQuantity); // khôi phục giá trị ban đầu nếu lỗi
      console.error("Error incrementing quantity on server:", error);
    }
  };

  // Hàm giảm số lượng
  const handleDecrement = async () => {
    if (quantity > 1) {
      const previousQuantity = quantity;
      setQuantity(previousQuantity - 1); // cập nhật UI ngay
      try {
        const response = await axios.put(
          `http://localhost:5000/api/carts/decrement/${id}`
        );
        if (onQuantityChange) onQuantityChange(response.data.quantity);
      } catch (error) {
        setQuantity(previousQuantity); // khôi phục nếu lỗi
        console.error("Error decrementing quantity on server:", error);
      }
    }
  };

  // Hàm cập nhật số lượng khi người dùng nhập trực tiếp
  const handleInputChange = async (e) => {
    let newQuantity = parseInt(e.target.value, 10);
    if (isNaN(newQuantity) || newQuantity < 1) {
      newQuantity = 1;
    }
    const previousQuantity = quantity;
    setQuantity(newQuantity);
    try {
      const response = await axios.put(
        `http://localhost:5000/api/carts/${id}`,
        { quantity: newQuantity }
      );
      if (onQuantityChange) onQuantityChange(response.data.quantity);
    } catch (error) {
      setQuantity(previousQuantity);
      console.error("Error updating quantity on server:", error);
    }
  };

  // Hàm xử lý thêm sản phẩm vào giỏ hàng
  const handleAddCart = async () => {
    if (isAdding) return;
    setIsAdding(true);
    try {
      const response = await axios.post("http://localhost:5000/api/carts", {
        productId: id,
        name,
        price,
        image,
        quantity,
      });
      alert("Sản phẩm đã được thêm vào giỏ hàng!");
      console.log("Cart item:", response.data);
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
      alert(
        "Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng. Vui lòng thử lại sau."
      );
    } finally {
      setIsAdding(false);
    }
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
        <button
          type="submit"
          className="button-submit"
          onClick={handleAddCart}
          disabled={isAdding}
        >
          {isAdding ? "Đang thêm..." : "Thêm giỏ hàng"}
        </button>
      )}
    </div>
  );
};

export default memo(Quantity);
