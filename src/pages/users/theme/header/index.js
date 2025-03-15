import { memo, useEffect, useRef, useState } from "react";
import axios from "axios";
import "./style.scss";
import {
  AiOutlineShoppingCart,
  AiOutlineMail,
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineLinkedin,
  AiOutlineTwitter,
  AiOutlineUser,
  AiOutlineMenu,
  AiOutlinePhone,
  AiOutlineDownCircle,
} from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { formater } from "utils/formater";
import { ROUTER } from "utils/router";
import { BiUser } from "react-icons/bi";
import UserModal from "component/UserModal";
import SearchComponent from "component/Search";
import "../../../../component/Search/style.scss";

export const categories = [
  "Thịt tươi",
  "Rau củ",
  "Nước trái cây",
  "Trái cây",
  "Hải sản",
];

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const loginRef = useRef(null);

  const [isShowHumberger, setShowHumberger] = useState(false);
  const [isHome, setIsHome] = useState(location.pathname.length <= 1);
  const [isShowCategories, setShowCategories] = useState(isHome);
  const [menus, setMenus] = useState([
    { name: "Trang chủ", path: ROUTER.USER.HOME },
    { name: "Cửa hàng", path: ROUTER.USER.PRODUCTS },
    {
      name: "Sản phẩm",
      path: "#",
      isShowSubmenu: false,
      child: [
        { name: "Thịt", path: "#" },
        { name: "Rau củ", path: "#" },
        { name: "Thức ăn nhanh", path: "#" },
      ],
    },
    { name: "Bài viết", path: ROUTER.USER.ARTICLE },
    { name: "Liên hệ", path: ROUTER.USER.CONTACT },
  ]);

  // Lấy thông tin người dùng từ localStorage nếu có
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // State điều khiển modal hiển thị dưới phần tên đăng nhập
  const [showUserModal, setShowUserModal] = useState(false);

  // State cho giỏ hàng
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartQuantity, setCartQuantity] = useState(0);

  useEffect(() => {
    const isHome = location.pathname.length <= 1;
    setIsHome(isHome);
    setShowCategories(isHome);
  }, [location]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/carts");
      const items = res.data;
      setCartItems(items);
      const total = items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      const quantity = items.reduce((acc, item) => acc + item.quantity, 0);
      setCartTotal(total);
      setCartQuantity(quantity);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setShowUserModal(false);
    navigate(ROUTER.USER.LOGIN);
  };

  return (
    <>
      {/* Menu Hamburger (cho responsive mobile) */}
      <div
        className={`humberger_menu_overlay ${isShowHumberger ? "active" : ""}`}
        onClick={() => setShowHumberger(false)}
      />
      <div
        className={`humberger_menu_wrapper ${isShowHumberger ? "show" : ""}`}
      >
        <div className="header_logo">
          <h1>Fruit Store</h1>
        </div>
        <div className="humberger_menu_cart">
          <ul>
            <li>
              <Link to={ROUTER.USER.SHOPPING_CART}>
                <AiOutlineShoppingCart /> <span>{cartQuantity}</span>
              </Link>
            </li>
          </ul>
          <div className="header_cart_price">
            Giỏ hàng: <span>{formater(cartTotal)}</span>
          </div>
        </div>
        <div className="humberger_menu_widget">
          <div className="header_top_right_auth">
            {user ? (
              <div
                className="user_menu_container"
                onClick={() => setShowUserModal(true)}
              >
                <BiUser /> {user.username}
              </div>
            ) : (
              <Link to={ROUTER.USER.LOGIN}>
                <BiUser /> Đăng nhập
              </Link>
            )}
          </div>
        </div>
        <div className="humberger_menu_nav">
          <ul>
            {menus.map((menu, menukey) => (
              <li key={menukey}>
                <Link
                  to={menu.path}
                  onClick={() => {
                    const newMenus = [...menus];
                    if (menu.child) {
                      newMenus[menukey].isShowSubmenu =
                        !newMenus[menukey].isShowSubmenu;
                      setMenus(newMenus);
                    }
                  }}
                >
                  {menu.name}
                  {menu.child && <AiOutlineDownCircle />}
                </Link>
                {menu.child && (
                  <ul
                    className={`header_menu_dropdown ${
                      menu.isShowSubmenu ? "show_submenu" : ""
                    }`}
                  >
                    {menu.child.map((childItem, childkey) => (
                      <li key={childkey}>
                        <Link
                          to={`${
                            ROUTER.USER.PRODUCTS
                          }?category=${encodeURIComponent(childItem.name)}`}
                        >
                          {childItem.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="header_top_right_social">
          <Link to="#">
            <AiOutlineFacebook />
          </Link>
          <Link to="#">
            <AiOutlineInstagram />
          </Link>
          <Link to="#">
            <AiOutlineLinkedin />
          </Link>
          <Link to="#">
            <AiOutlineTwitter />
          </Link>
        </div>
        <div className="humberger_menu_contact">
          <ul>
            <li>
              <MdEmail /> fruitstore@gmail.com
            </li>
            <li>Miễn phí đơn từ {formater(2000000)}</li>
          </ul>
        </div>
      </div>

      {/* Header Top (desktop) */}
      <div className="header_top">
        <div className="container">
          <div className="row">
            <div className="col-6 header_top_left">
              <ul>
                <li>
                  <AiOutlineMail /> hello@gmail.com
                </li>
                <li>Miễn phí ship đơn từ {formater(200000)}</li>
              </ul>
            </div>
            <div className="col-6 header_top_right">
              <ul>
                <li>
                  <Link to="#">
                    <AiOutlineFacebook />
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    <AiOutlineInstagram />
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    <AiOutlineLinkedin />
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    <AiOutlineTwitter />
                  </Link>
                </li>
                <li
                  className="user_menu_container"
                  ref={loginRef}
                  onClick={() => {
                    if (user) {
                      setShowUserModal(!showUserModal);
                    } else {
                      navigate(ROUTER.USER.LOGIN);
                    }
                  }}
                >
                  <AiOutlineUser />
                  <span>{user ? user.username : "Đăng nhập"}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Header Main */}
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className="header_logo">
              <h1>Fruit Store</h1>
            </div>
          </div>
          <div className="col-lg-6">
            <nav className="header_menu">
              <ul>
                {menus?.map((menu, menuKey) => (
                  <li key={menuKey} className={menuKey === 0 ? "active" : ""}>
                    <Link to={menu?.path}>{menu?.name}</Link>
                    {menu.child && (
                      <ul className="header_menu_dropdown">
                        {menu.child.map((childItem, childKey) => (
                          <li key={`${menuKey}-${childKey}`}>
                            <Link
                              to={`${
                                ROUTER.USER.PRODUCTS
                              }?category=${encodeURIComponent(childItem.name)}`}
                            >
                              {childItem.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="col-lg-3">
            <div className="header_cart">
              <div className="header_cart_price">
                <span>{formater(cartTotal)}</span>
              </div>
              <ul>
                <li>
                  <Link to={ROUTER.USER.SHOPPING_CART}>
                    <AiOutlineShoppingCart />
                    <span>{cartQuantity}</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="humberger_open">
              <AiOutlineMenu onClick={() => setShowHumberger(true)} />
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section với phần tìm kiếm tích hợp SearchComponent */}
      <div className="container">
        <div className="row hero_categories_container">
          <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12 hero_categories">
            <div
              className="hero_categories_all"
              onClick={() => setShowCategories(!isShowCategories)}
            >
              <AiOutlineMenu />
              Danh sách sản phẩm
            </div>
            <ul className={isShowCategories ? "" : "hidden"}>
              {categories.map((category, key) => (
                <li key={key}>
                  <Link
                    to={`${ROUTER.USER.PRODUCTS}?category=${encodeURIComponent(
                      category
                    )}`}
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-lg-9 col-sm-12 col-xs-12 col-md-12 hero_search_container">
            <div className="hero_search">
              <div className="hero_search_form">
                {/* Thay thế form tĩnh bằng SearchComponent */}
                <SearchComponent placeholder="Bạn đang tìm gì?" />
              </div>
              <div className="hero_search_phone">
                <div className="hero_search_phone_icon">
                  <AiOutlinePhone />
                </div>
                <div className="hero_search_phone_text">
                  <p>1234.567.891</p>
                  <span>Hỗ trợ 24/7</span>
                </div>
              </div>
            </div>
            {isHome && (
              <div className="hero_item">
                <div className="hero_text">
                  <span>Trái cây tươi</span>
                  <h2>
                    Rau quả <br />
                    sạch 100%
                  </h2>
                  <p>Miễn phí giao hàng tận nơi</p>
                  <Link to="" className="primary-btn">
                    Mua ngay
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {user && showUserModal && (
        <UserModal
          targetRef={loginRef}
          onClose={() => setShowUserModal(false)}
          onLogout={handleLogout}
        />
      )}
    </>
  );
};

export default memo(Header);
