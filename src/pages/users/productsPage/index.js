import { memo, useState, useEffect } from "react";
import { useNavigate, generatePath, useLocation } from "react-router-dom";
import Breadcrumb from "../theme/breadcrumb";
import "./style.scss";
import { Link } from "react-router-dom";
import { categories } from "../theme/header";
import { ROUTER } from "utils/router";
import ProductCard from "component/ProductCard";
import axios from "axios";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  
  // Lấy giá trị category từ query string
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category");

  const sorts = [
    "Giá thấp đến cao",
    "Giá cao đến thấp",
    "Mới đến cũ",
    "Cũ đến mới",
    "Bán chạy nhất",
    "Giảm giá",
  ];

  // Lấy sản phẩm khi component được mount và khi category thay đổi
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Nếu có category, truyền tham số category vào API
        const response = await axios.get("http://localhost:5000/api/products", {
          params: category ? { category } : {},
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, [category]);

  // Xử lý tìm kiếm sản phẩm
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:5000/api/products", {
        params: { name: searchTerm },
      });
      const results = response.data;
      if (results.length === 0) {
        alert("Không tìm thấy sản phẩm");
      } else {
        const exactProduct = results.find(
          (item) => item.name.toLowerCase() === searchTerm.toLowerCase()
        );
        if (exactProduct) {
          navigate(generatePath(ROUTER.USER.PRODUCT, { id: exactProduct._id }));
        } else {
          alert("Không tìm thấy sản phẩm có tên chính xác");
        }
      }
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

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
                <form onSubmit={handleSearch}>
                  <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </form>
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
                      <Link to={`${ROUTER.USER.PRODUCTS}?category=${encodeURIComponent(name)}`}>
                        {name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Danh sách sản phẩm */}
          <div className="col-lg-9 col-md-12 col-sm-12 col-xs-12">
            {renderProducts()}
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(ProductsPage);
