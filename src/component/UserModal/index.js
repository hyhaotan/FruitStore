// UserModal.jsx
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { ROUTER } from "utils/router";
import "./style.scss";

const UserModal = ({ targetRef, onClose, onLogout }) => {
  const [styles, setStyles] = useState({});

  useEffect(() => {
    if (targetRef.current) {
      const rect = targetRef.current.getBoundingClientRect();
      setStyles({
        position: "absolute",
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        zIndex: 1000,
      });
    }
  }, [targetRef]);

  return ReactDOM.createPortal(
    <div className="user_modal_portal" style={styles}>
      <div className="user_modal_dropdown">
        <button className="close_modal" onClick={onClose}>
          X
        </button>
        <ul>
          <li>
            <Link to={ROUTER.USER.PROFILE} onClick={onClose}>
              Thông tin cá nhân
            </Link>
          </li>
          <li>
            <Link to={ROUTER.USER.ORDER} onClick={onClose}>
              Lịch sử đơn hàng
            </Link>
          </li>
          <li onClick={onLogout}>Đăng xuất</li>
        </ul>
      </div>
    </div>,
    document.body
  );
};

export default UserModal;
