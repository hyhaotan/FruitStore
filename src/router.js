import { Routes, Route, useLocation } from "react-router-dom";
import Homepage from "./pages/users/homepage";
import { ADMIN_PATH, ROUTER } from "./utils/router";
import MasterLayout from "./pages/users/theme/masterLayout";
import ProfilePage from "./pages/users/profilePage";
import ProductsPage from "./pages/users/productsPage";
import ProductsDetailPage from "./pages/users/productsDetailPage";
import ShoppingCartPage from "pages/users/shoppingCartPage";
import CheckoutPage from "pages/users/checkoutPage";
import LoginAdPage from "pages/admin/loginPage";
import OrderPageAdPage from "pages/admin/orderPage";
import MasterAdLayout from "pages/admin/theme/masterAdLayout";
import LoginUserPage from "pages/users/login";
import Register from "pages/users/register";
import OrderPage from "pages/users/orderPage";
import ProductPage from "pages/admin/productPage";
import AccountPage from "pages/admin/accountPage";
import ContactPage from "pages/users/contactPage";
import ArticlePage from "pages/users/articlePage";
import ArticleAdminPage from "pages/admin/articlePage";
import NewsAdminPage from "pages/admin/newsPage";
import NewsPage from "pages/users/newsPage";
import CouponAdminPage from "pages/admin/couponPage";
import DashboardPage from "pages/admin/dashboardPage";
import StorePage from "pages/users/storePage";
import RequireAdmin from "component/Admin/requireAdmin";

const renderUserRouter = () => {
  const userRouters = [
    {
      path: ROUTER.USER.HOME,
      component: <Homepage />,
    },
    {
      path: ROUTER.USER.PROFILE,
      component: <ProfilePage />,
    },
    {
      path: ROUTER.USER.PRODUCTS,
      component: <ProductsPage />,
    },
    {
      path: ROUTER.USER.PRODUCT,
      component: <ProductsDetailPage />,
    },
    {
      path: ROUTER.USER.SHOPPING_CART,
      component: <ShoppingCartPage />,
    },
    {
      path: ROUTER.USER.CHECKOUT,
      component: <CheckoutPage />,
    },
    {
      path: ROUTER.USER.LOGIN,
      component: <LoginUserPage />,
    },
    {
      path: ROUTER.USER.REGISTER,
      component: <Register />,
    },
    {
      path: ROUTER.USER.ORDER,
      component: <OrderPage />,
    },
    {
      path: ROUTER.USER.CONTACT,
      component: <ContactPage />,
    },
    {
      path: ROUTER.USER.ARTICLE,
      component: <ArticlePage />,
    },
    {
      path: ROUTER.USER.NEWS,
      component: <NewsPage />,
    },
    {
      path: ROUTER.USER.STORE,
      component: <StorePage />,
    },
  ];

  return (
    <MasterLayout>
      <Routes>
        {userRouters.map((item, key) => (
          <Route key={key} path={item.path} element={item.component} />
        ))}
      </Routes>
    </MasterLayout>
  );
};

const renderAdminRouter = () => {
  const adminRouters = [
    {
      path: ROUTER.ADMIN.LOGIN,
      component: <LoginAdPage />,
    },
    {
      path: ROUTER.ADMIN.ORDERS,
      component: <RequireAdmin><OrderPageAdPage /></RequireAdmin>,
    },
    {
      path: ROUTER.ADMIN.PRODUCTS,
      component: <RequireAdmin><ProductPage /></RequireAdmin>,
    },
    {
      path: ROUTER.ADMIN.ACCOUNT,
      component: <RequireAdmin><AccountPage /></RequireAdmin>,
    },
    {
      path: ROUTER.ADMIN.NEWS,
      component: <RequireAdmin><NewsAdminPage /></RequireAdmin>,
    },
    {
      path: ROUTER.ADMIN.COUPON,
      component: <RequireAdmin><CouponAdminPage /></RequireAdmin>,
    },
    {
      path: ROUTER.ADMIN.ARTICLES,
      component: <RequireAdmin><ArticleAdminPage /></RequireAdmin>,
    },
    {
      path: ROUTER.ADMIN.DASHBOARD,
      component: <RequireAdmin><DashboardPage /></RequireAdmin>,
    },
  ];

  return (
    <MasterAdLayout>
      <Routes>
        {adminRouters.map((item, key) => (
          <Route key={key} path={item.path} element={item.component} />
        ))}
      </Routes>
    </MasterAdLayout>
  );
};

const RouterCustom = () => {
  const location = useLocation();
  const isAdminRouters = location.pathname.startsWith(ADMIN_PATH);
  return isAdminRouters ? renderAdminRouter() : renderUserRouter();
};

export default RouterCustom;
