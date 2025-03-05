import { memo } from "react";
import {
  AiOutlineAccountBook,
  AiOutlineLogout,
  AiOutlineProduct,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTER } from "utils/router";
import "./style.scss";
const HeaderAd = ({ children, ...props }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const navItems = [
    {
      path: ROUTER.ADMIN.ORDERS,
      onClick: () => navigate(ROUTER.ADMIN.ORDERS),
      lable: "Đặt hàng",
      icon: <AiOutlineShoppingCart />,
    },
    {
      path: ROUTER.ADMIN.PRODUCTS,
      onClick: () => navigate(ROUTER.ADMIN.PRODUCTS),
      lable: "Sản phẩm",
      icon: <AiOutlineProduct />,
    },
    {
      path: ROUTER.ADMIN.ACCOUNT,
      onClick: () => navigate(ROUTER.ADMIN.ACCOUNT),
      lable: "Tài khoản",
      icon: <AiOutlineAccountBook />,
    },
    {
      path: ROUTER.ADMIN.LOGOUT,
      onClick: () => navigate(ROUTER.ADMIN.LOGIN),
      lable: "Đăng xuất",
      icon: <AiOutlineLogout />,
    },
  ];
  return (
    <div className="admin_header container" {...props}>
      <nav className="admin_header_nav">
        {navItems.map(({ path, onClick, lable, icon }) => (
          <div
            key={path}
            className={`admin_header_nav-item ${
              location.pathname.includes(path)
                ? "admin_header_nav-item-active"
                : ""
            }`}
            onClick={onClick}
          >
            <span className="admin_header_nav-icon">{icon}</span>
            <span>{lable}</span>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default memo(HeaderAd);
