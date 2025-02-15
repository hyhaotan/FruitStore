// Header.jsx
import { memo, useState } from "react";
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
    AiOutlinePhone
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { formater } from "utils/formater";
import { ROUTER } from "utils/router";

const Header = () => {
    const [isShowCategories, setCategories] = useState(true);
    const [menus] = useState([
        {
            name: "Trang chủ",
            path: ROUTER.USER.HOME,
        },
        {
            name: "Cửa hàng",
            path: ROUTER.USER.PRODUCTS,
        },
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
        {
            name: "Bài viết",
            path: ROUTER.USER.HOME,
        },
        {
            name: "Liên hệ",
            path: ROUTER.USER.HOME,
        },
    ]);

    return (
        <>
            <div className="header_top">
                <div className="container">
                    <div className="row">
                        <div className="col-6 header_top_left">
                            <ul>
                                <li>
                                    <AiOutlineMail /> hello@gmail.com
                                </li>
                                <li>
                                    Miễn phí ship đơn từ {formater(200000)}
                                </li>
                            </ul>
                        </div>
                        <div className="col-6 header_top_right">
                            <ul>
                                <li><Link to="#"><AiOutlineFacebook /></Link></li>
                                <li><Link to="#"><AiOutlineInstagram /></Link></li>
                                <li><Link to="#"><AiOutlineLinkedin /></Link></li>
                                <li><Link to="#"><AiOutlineTwitter /></Link></li>
                                <li>
                                    <Link to="/login"><AiOutlineUser /></Link>
                                    <span>Đăng nhập</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-xl-3">
                        <div className="header_logo">
                            <h1>Fruit Shop</h1>
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <nav className="header_menu">
                            <ul>
                                {
                                    menus?.map((menu, menuKey) => (
                                        <li key={menuKey} className={menuKey === 0 ? "active" : ""}>
                                            <Link to={menu?.path}>{menu?.name}</Link>
                                            {
                                                menu.child && (
                                                    <ul className="header_menu_dropdown">
                                                        {menu.child.map((childItem, childKey) => (
                                                            <li key={`${menuKey} -${childKey}`}>
                                                                <Link to={childItem.path}>{childItem.name}</Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )
                                            }
                                        </li>
                                    ))
                                }
                            </ul>
                        </nav>
                    </div>
                    <div className="col-xl-3">
                        <div className="header_cart">
                            <div className="header_cart_price">
                                <span>{formater(200000)}</span>
                            </div>
                            <ul>
                                <li>
                                    <Link to="#">
                                        <AiOutlineShoppingCart />
                                        <span>5</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row hero_categories_container">
                    <div className="col-lg-3 hero_categories">
                        <div className="hero_categories_all" onClick={() => setCategories(!isShowCategories)}>
                            <AiOutlineMenu />
                            Danh sách sản phẩm
                        </div>
                        <ul className={isShowCategories ? "" : "hidden"}>
                            <li>
                                <Link to={"#"}>Thịt tươi</Link>
                            </li>
                            <li>
                                <Link to={"#"}>Rau củ</Link>
                            </li>
                            <li>
                                <Link to={"#"}>Nước trái cây</Link>
                            </li>
                            <li>
                                <Link to={"#"}>trái cây</Link>
                            </li>
                            <li>
                                <Link to={"#"}>Hải sản</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-9 hero_search_container">
                        <div className="hero_search">
                            <div className="hero_search_form">
                                <form>
                                    <input type="text" name="" value="" placeholder="Bạn đang tìm gì?" />
                                    <button type="submit">Tìm kiếm</button>
                                </form>
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
                        <div className="hero_item">
                            <div className="hero_text">
                                <span>Trái cây tươi</span>
                                <h2>Rau quả <br />
                                    sạch 100%
                                </h2>
                                <p>Miễn phí giao hàng tận nơi</p>
                                <Link to="" className="primary-btn">Mua ngay</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default memo(Header);
