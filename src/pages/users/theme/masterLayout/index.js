import { memo } from "react";
import Header from "../header";
import Footer from "../../../common/footer";
import { ROUTER } from "utils/router";
import { useLocation } from "react-router-dom";

const MasterLayout = ({ children, ...props }) => {
  const location = useLocation();
  const isLoginUserPage = location.pathname.startsWith(ROUTER.USER.LOGIN);
  const isRegisterUserPage = location.pathname.startsWith(ROUTER.USER.REGISTER);
  return (
    <div {...props}>
      {!isLoginUserPage && !isRegisterUserPage && <Header />}
      {children}
      {!isLoginUserPage && !isRegisterUserPage && <Footer />}
    </div>
  );
};

export default memo(MasterLayout);
