import { memo } from "react";
import "./style.scss";

import { AiOutlineShoppingCart, AiOutlineEye } from "react-icons/ai";
import { generatePath, Link } from "react-router-dom";
import { formater } from "utils/formater";
import { ROUTER } from "utils/router";

const ProductsCard = ({ image, name, price }) => {
  return (
    <div className="featured_item pl-pr-10">
      <div
        className="featured_item_pic"
        style={{ backgroundImage: `url(${image})` }}
      >
        <ul className="featured_item_pic_hover">
          <li>
            <AiOutlineEye />
          </li>
          <li>
            <AiOutlineShoppingCart />
          </li>
        </ul>
      </div>
      <div className="featured_item_text">
        <h6>
          <Link to={generatePath(ROUTER.USER.PRODUCT, { id: 1 })}>{name}</Link>
        </h6>
        <h5>{formater(price)}</h5>
      </div>
    </div>
  );
};

export default memo(ProductsCard);
