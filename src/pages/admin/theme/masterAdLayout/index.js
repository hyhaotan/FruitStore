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
  const isAccountPage = location.pathname.startsWith(ROUTER.ADMIN.ACCOUNT);
  const isNewsPage = location.pathname.startsWith(ROUTER.ADMIN.NEWS);
  const isCouponPage = location.pathname.startsWith(ROUTER.ADMIN.COUPON);
  const isDashboardPage = location.pathname.startsWith(ROUTER.ADMIN.DASHBOARD);
  const isArticlePage = location.pathname.startsWith(ROUTER.ADMIN.ARTICLES);

  return (
    <div {...props}>
      {!isLoginPage && <HeaderAd />}
      {children}
      {!isLoginPage &&
        !isOrderPage &&
        !isProductPage &&
        !isAccountPage &&
        !isNewsPage &&
        !isCouponPage &&
        !isDashboardPage &&
        !isArticlePage && <Footer />}
    </div>
  );
};

export default memo(MasterAdLayout);
