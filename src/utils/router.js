
export const ADMIN_PATH = "/quan-tri";

export const ROUTER = {
  USER: {
    HOME: "/",
    PROFILE: "PROFILE",
    PRODUCTS: "/san-pham",
    PRODUCT: "/san-pham/chi-tiet/:id",
    SHOPPING_CART: "/gio-hang",
    CHECKOUT: "/thanh-toan",
    LOGIN: "/dang-nhap",
    REGISTER: "/dang-ky",
    ORDER: "/don-hang",
    CONTACT: "/lien-he",
    ARTICLE: "/bai-viet",
    NEWS: "/news/:id",
    STORE: "/cua-hang",
  },

  ADMIN: {
    LOGIN: `${ADMIN_PATH}/dang-nhap`,
    ORDERS: `${ADMIN_PATH}/dat-hang`,
    LOGOUT: `${ADMIN_PATH}/dang-nhap`,
    PRODUCTS: `${ADMIN_PATH}/san-pham`,
    ACCOUNT: `${ADMIN_PATH}/tai-khoan`,
    NEWS: `${ADMIN_PATH}/tin-tuc`,
    COUPON: `${ADMIN_PATH}/giam-gia`,
    ARTICLES: `${ADMIN_PATH}/bai-viet`,
    DASHBOARD: `${ADMIN_PATH}/dieu-khien`,
  },
};
