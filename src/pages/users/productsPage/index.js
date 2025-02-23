import { memo } from "react";
import Breadcrumb from "../theme/breadcrumb";
import "./style.scss"
import { Link } from "react-router-dom";
import { categories } from "../theme/header";
import { ROUTER } from "utils/router";
import feat1 from "assets/users/images/categories/cat5.jpg";
import feat2 from "assets/users/images/featured/featured2.jpg";
import feat3 from "assets/users/images/featured/featured3.jpg";
import feat4 from "assets/users/images/featured/featured4.jpg";
import feat5 from "assets/users/images/featured/featured5.jpg";
import feat6 from "assets/users/images/featured/featured6.jpg";
import feat7 from "assets/users/images/featured/featured7.jpg";
import feat8 from "assets/users/images/featured/featured8.jpg";
import { ProductCard } from "component";

const productsPage = () => {
    const sorts = [
        "Giá thấp đến cao",
        "Giá cao đến thấp",
        "Mới đến cũ",
        "Cũ đến mới",
        "Bán chạy nhất",
        "Bang giảm giá"
    ];

    const products = [
        {
            img: feat1,
            name: "Thịt bò nạt",
            price: "20000",
        },
        {
            img: feat2,
            name: "Chuối",
            price: "17500",
        },
        {
            img: feat3,
            name: "Ổi",
            price: "25000",
        },
        {
            img: feat4,
            name: "Dưa hấu",
            price: "44500",
        },
        {
            img: feat5,
            name: "Nho tím",
            price: "120000",
        },
        {
            img: feat6,
            name: "Humberger",
            price: "90000",
        },
        {
            img: feat7,
            name: "Táo Úc",
            price: "123000",
        },
        {
            img: feat8,
            name: "Nho tím",
            price: "120000",
        },
    ]
    return (
        <>
            <Breadcrumb name="Danh sách sản phẩm" />
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12">
                        <div className="sidebar">
                            <div className="sidebar_item">
                                <h2>Tìm kiếm</h2>
                                <input type="text" />
                            </div>
                            <div className="sidebar_item">
                                <h2>Mức giá</h2>
                                <div className="price-range-wrap">
                                    <div>
                                        <p>Từ:</p>
                                        <input type="number" min={0} />
                                    </div>
                                    <div>
                                        <p>Đến:</p>
                                        <input type="number" min={0} />
                                    </div>
                                </div>
                            </div>
                            <div className="sidebar_item">
                                <h2>Sắp xếp</h2>
                                <div className="tags">
                                    {sorts.map((item, key) => (
                                        <div className={`tag ${key === 0 ? "active" : ""}`} key={key}>
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="sidebar_item">
                                <h2>Thể loại khác</h2>
                                <ul>
                                    {categories.map((name, key) => (
                                        <li key={key}>
                                            <Link to={ROUTER.USER.PRODUCTS}>{name}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-9 col-md-12 col-sm-12 col-xs-12">
                        <div className="row">
                            {products.map((item, key) => (
                            <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12" key={key}>
                                <ProductCard name={item.name} img={item.img} price={item.price} />
                            </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default memo(productsPage);