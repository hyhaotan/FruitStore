import { memo } from "react";
import Footer from "../../../common/footer";
import { ROUTER } from "utils/router.js";
import { useLocation } from "react-router-dom";
import HeaderAd from "../header";

const MasterAdLayout = ({ children, ...props }) => {
  const location = useLocation();
  const isLoginPage = location.pathname.startsWith(ROUTER.ADMIN.LOGIN);
  const isOrderPage = location.pathname.startsWith(ROUTER.ADMIN.ORDERS);
  const isProductPage = location.pathname.startsWith(ROUTER.ADMIN.PRODUCTS);
  return (
    <div {...props}>
      {!isLoginPage && <HeaderAd />}
      {children}
      {!isLoginPage && !isOrderPage && !isProductPage && <Footer />}
    </div>
  );
};

export default memo(MasterAdLayout);
