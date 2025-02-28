import { memo, useState, useEffect } from "react";
import Breadcrumb from "../theme/breadcrumb";
import "./style.scss";
import { Link } from "react-router-dom";
import { categories } from "../theme/header";
import { ROUTER } from "utils/router";
import ProductCard from "component/ProductCard";
import axios from "axios";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const sorts = [
    "Giá thấp đến cao",
    "Giá cao đến thấp",
    "Mới đến cũ",
    "Cũ đến mới",
    "Bán chạy nhất",
    "Giảm giá",
  ];

  useEffect(() => {
    // Gọi API để lấy danh sách sản phẩm
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const renderProducts = () => {
    return (
      <div className="row">
        {products.map((item) => (
          <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12" key={item._id}>
            <ProductCard
              id={item._id}
              image={item.img}
              name={item.name}
              price={item.price}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <Breadcrumb name="Danh sách sản phẩm" />
      <div className="container">
        <div className="row">
          {/* Sidebar */}
          <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12">
            <div className="sidebar">
              <div className="sidebar_item">
                <h2>Tìm kiếm</h2>
                <input type="text" placeholder="Tìm kiếm sản phẩm..." />
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
                    <div
                      className={`tag ${key === 0 ? "active" : ""}`}
                      key={key}
                    >
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

          {/* Products */}
          <div className="col-lg-9 col-md-12 col-sm-12 col-xs-12">
            {renderProducts()}
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(ProductsPage);
