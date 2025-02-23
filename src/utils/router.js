export const ADMIN_PATH = "/quan-tri";

export const ROUTER = {
    USER:{
        HOME:"/",
        PROFILE:"PROFILE",
        PRODUCTS:"/san-pham",
        PRODUCT:"/san-pham/chi-tiet/:id",
        SHOPPING_CART:"/gio-hang",
        CHECKOUT:"/thanh-toan",
    },

    ADMIN:{
        LOGIN:`${ADMIN_PATH}/dang-nhap`,
        ORDERS:`${ADMIN_PATH}/dat-hang`,
        LOGOUT:`${ADMIN_PATH}/dang-xuat`,
    }
}