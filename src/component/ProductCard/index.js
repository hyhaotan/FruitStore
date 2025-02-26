import { memo } from "react";
import "./style.scss";
import { AiOutlineShoppingCart, AiOutlineEye } from "react-icons/ai";
import { generatePath, Link } from "react-router-dom";
import { formater } from "utils/formater";
import { ROUTER } from "utils/router";
import axios from "axios";

const ProductCard = ({ id, image, name, price }) => {
  const handleAddCart = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/carts", {
        productId: id,
        name: name,
        price: price,
        image: image,
        quantity: 1,
      });
      alert("Sản phẩm đã được thêm vào giỏ hàng!");
      console.log("Cart item:", response.data);
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
    }
  };

  return (
    <div className="featured_item pl-pr-10">
      <div
        className="featured_item_pic"
        style={{ backgroundImage: `url(${image})` }}
      >
        <ul className="featured_item_pic_hover">
          <li>
            <Link to={id ? generatePath(ROUTER.USER.PRODUCT, { id }) : "#"}>
              <AiOutlineEye />
            </Link>
          </li>
          <li onClick={handleAddCart} style={{ cursor: "pointer" }}>
            <AiOutlineShoppingCart />
          </li>
        </ul>
      </div>
      <div className="featured_item_text">
        <h6>
          <Link to={id ? generatePath(ROUTER.USER.PRODUCT, { id }) : "#"}>
            {name}
          </Link>
        </h6>
        <h5>{formater(price)}</h5>
      </div>
    </div>
  );
};

export default memo(ProductCard);
