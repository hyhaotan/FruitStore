import { memo, useState } from "react";
import {
  AiOutlineLogout,
  AiOutlineProduct,
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineDashboard,
  AiOutlineOrderedList,
} from "react-icons/ai";
import { FaNewspaper, FaTicketAlt, FaUsers } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTER } from "utils/router";
import "./style.scss";

const SidebarAd = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    {
      path: ROUTER.ADMIN.DASHBOARD,
      label: "Bảng điều khiển",
      icon: <AiOutlineDashboard />,
    },
    {
      path: ROUTER.ADMIN.ORDERS,
      label: "Đặt hàng",
      icon: <AiOutlineOrderedList />,
    },
    {
      path: ROUTER.ADMIN.PRODUCTS,
      label: "Sản phẩm",
      icon: <AiOutlineProduct />,
    },
    {
      path: ROUTER.ADMIN.ARTICLES,
      label: "Bài viết",
      icon: <FaTicketAlt />,
    },
    {
      path: ROUTER.ADMIN.NEWS,
      label: "Tin tức",
      icon: <FaNewspaper />,
    },
    {
      path: ROUTER.ADMIN.ACCOUNT,
      label: "Tài khoản",
      icon: <FaUsers />,
    },
    {
      path: ROUTER.ADMIN.COUPON,
      label: "Mã giảm giá",
      icon: <FaTicketAlt />,
    },
    {
      path: ROUTER.ADMIN.LOGOUT,
      label: "Đăng xuất",
      icon: <AiOutlineLogout />,
    },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleNavItemClick = (path) => {
    navigate(path);
    // Trên mobile, sau khi nhấn vào mục điều hướng sẽ đóng sidebar
    if (window.innerWidth <= 768) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Header dành cho mobile */}
      <div className="mobile-header">
        <button className="hamburger-btn" onClick={toggleSidebar}>
          {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>
        <h2>Admin Dashboard</h2>
      </div>

      <aside className={`admin-sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <div className="logo">
            <h2>Admin Dashboard</h2>
          </div>
          <div className="profile">
            <img src="/path/to/avatar.jpg" alt="Admin Avatar" />
            <span>Admin Name</span>
          </div>
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <div
              key={item.path}
              className={`nav-item ${
                location.pathname.includes(item.path) ? "active" : ""
              }`}
              onClick={() => handleNavItemClick(item.path)}
            >
              <div className="icon">{item.icon}</div>
              <span className="label">{item.label}</span>
            </div>
          ))}
        </nav>
      </aside>

      {/* Overlay xuất hiện trên mobile khi sidebar mở */}
      {isOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </>
  );
};

export default memo(SidebarAd);
