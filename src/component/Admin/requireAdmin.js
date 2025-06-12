import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { ROUTER } from 'utils/router';

const RequireAdmin = ({ children }) => {
  const location = useLocation();
  const rawToken = localStorage.getItem('token');

  // Nếu chưa có token → về trang login
  if (!rawToken) {
    return (
      <Navigate
        to={ROUTER.ADMIN.LOGIN}
        state={{ from: location }}
        replace
      />
    );
  }

  try {
    // Decode token lấy role và exp (expiry)
    const { role, exp } = jwtDecode(rawToken);
    const isExpired = Date.now() >= exp * 1000;

    // Nếu hết hạn hoặc không phải admin/employee → xoá token và redirect
    if (isExpired || !['admin', 'employee'].includes(role)) {
      localStorage.removeItem('token');
      return (
        <Navigate
          to={ROUTER.ADMIN.LOGIN}
          state={{ from: location }}
          replace
        />
      );
    }
  } catch (err) {
    // Nếu decode lỗi → cũng xoá token và redirect
    localStorage.removeItem('token');
    return (
      <Navigate
        to={ROUTER.ADMIN.LOGIN}
        state={{ from: location }}
        replace
      />
    );
  }

  // Token OK → hiển thị component con
  return children;
};

export default RequireAdmin;